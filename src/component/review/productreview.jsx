import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import './productreview.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const Reviews = ({ userReviews, setNeedUpdate }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const params = useParams();
    const url = process.env.REACT_APP_SERVER_URL;
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const [alertConfig, setAlertConfig] = useState({
        message: '',
        type: 'success'
    }
    );
    const notify = () => toast[alertConfig.type](alertConfig.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const handleSubmit = async () => {
        if (rating < 1 || rating > 5) {
            setAlertConfig({ message: 'Rating should be between 1 and 5', type: 'error' });
            return;
        }
        if (message.length < 1) {
            setAlertConfig({ message: 'Please enter a message', type: 'error' });
            return;
        }
        setRating(0);
        setMessage('');
        let userID = Cookies.get('UserId');
        const response = await axios.post(`${url}product/review`, {
            userID,
            rating,
            message,
            productID: params.id.slice(1, params.id.length)
        }, { withCredentials: true })
        console.log(response.data);
        if (response.data.message === 'Rating and message updated successfully' || response.data.message === 'Rating and message added successfully') {
            setAlertConfig({ message: response.data.message, type: 'success' });
            setNeedUpdate(true);
        }
        else {
            setAlertConfig({ message: response.data.message, type: 'error' });
        }
        setShowPopup(false);
    };
    useEffect(() => {
        if (alertConfig.message !== '') {
            notify();
        }
    }, [alertConfig])

    return (
        <div className="reviews mt-14" id='review'>
            <div className="reviews-left">
                <h2>Reviews</h2>
                <p>We always strive to provide the best service for our customers. We would be very grateful if you leave a review on our page so that other customers can learn about our work.</p>
                <button className="add-reviews" onClick={() => setShowPopup(true)}>Submit Review</button>
            </div>
            {userReviews.map((review, index) => {
                return (
                    <div key={index} className="reviews-right">
                        <div className="reviews-right__avatar">
                            <div className="img"><img className='img' src={review.userId.img || 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg'} alt="userimg" /></div>
                        </div>
                        <div className="reviews-right__item">
                            <h3>{review.userId.name}</h3>
                            <div className="block-tour">
                                Rating :
                                <Rating
                                    allowFraction={true}
                                    readonly={true}
                                    size={16}
                                    initialValue={review.Rating}
                                    style={{ marginBottom: "2px" }}
                                />
                            </div>
                            <p >{review.message}</p>
                        </div>
                    </div>
                );
            })}

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                    <div className="bg-white p-6 rounded shadow-md">
                        <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={() => setShowPopup(false)}>&times;</span>
                        <h2 className="text-lg font-bold mb-4">Submit Review</h2>
                        <label className="block mb-2">Rating:</label>
                        <Rating
                            onClick={handleRatingChange}
                            ratingValue={rating}
                            allowFraction={true}
                            size={16}
                            style={{ marginBottom: "2px" }}
                        />
                        <label className="block mb-2">Message:</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600">Submit</button>
                        <button onClick={() => setShowPopup(false)} className="bg-red-500 text-white px-4 py-2 mt-4 ml-4 rounded hover:bg-red-600">Cancel</button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Reviews;
