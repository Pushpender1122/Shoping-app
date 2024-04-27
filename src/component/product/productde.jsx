// Productde.jsx
import React, { useEffect, useState } from 'react';
import './product.css'
import Header from '../home/header';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Alert from '../alerts/alert';
import Cookies from 'js-cookie';
import { Rating } from 'react-simple-star-rating'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reviews from '../review/productreview';
import SuggestedProducts from './suggestedProduct';
const Productde = () => {
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    const baseurl = apiUrl;
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        messageType: "",
        message: "empty"
    })
    const navigate = useNavigate();
    var id = useParams();
    id = id.id.replace(':', '');
    const [data, setdata] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [highlightedPoints, sethighlightedPoints] = useState([]);
    const [suggestedProductsData, setSuggestedProductsdata] = useState([]);

    const notify = () => {
        toast[alertConfig.messageType](alertConfig.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const [needUpdate, setNeedUpdate] = useState(false);
    useEffect(() => {
        // Fetch product details based on ID and set the data
        fetch(`${apiUrl}product/:?id=${id}`)
            .then((response) => response.json())
            .then((result) => {
                const arr = [result];
                setdata(arr);
                setNeedUpdate(false);
                setUserReviews(result.RatingMessage);
                sethighlightedPoints(result.HighligthPoint)
                setSuggestedProductsdata(result.SuggestedProduct)
                console.log(result);
                if (result.err) {
                    navigate('/404');
                }
                // Check if the current product is in the wishlist
                const userId = Cookies.get('UserId');
                if (userId) {
                    const wishList = JSON.parse(localStorage.getItem(`WishList_${userId}`)) || [];
                    const existingItemIndex = wishList.findIndex(item => item.id === result._id);
                    setIsInWishlist(existingItemIndex !== -1);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, needUpdate]);
    useEffect(() => {
        if (alertConfig.messageType !== '') {
            notify();
        }
    }, [alertConfig])
    // Function to add items to temporary cart when user is not logged in
    const addToTemporaryCart = (value) => {
        const userId = Cookies.get('UserId') || null;

        try {
            let tempCart = JSON.parse(localStorage.getItem('TempCart')) || [];
            const existingItem = tempCart.find(item => item.id === value);
            if (existingItem) {
                const checkProductOutOfStock = data.find(item => item._id === existingItem.id)
                console.log(checkProductOutOfStock);
                if (checkProductOutOfStock.Stock > existingItem.numberOfItems) {
                    setAlertConfig({
                        messageType: "success",
                        message: "Added to Cart"
                    })
                    existingItem.numberOfItems++;
                }
                else {
                    setAlertConfig({
                        messageType: "error",
                        message: "Product out of Stock"
                    })
                }
            } else {

                const itemCount = data.find(item => item._id === value);
                // console.log(itemCount)
                if (itemCount.Stock > 0) {
                    // console.log(value);
                    const productObj = {
                        id: value,
                        numberOfItems: 1
                    };
                    tempCart.push(productObj);
                    setAlertConfig({
                        messageType: "success",
                        message: "Added to Cart"
                    })
                }
                else {
                    setAlertConfig({
                        messageType: "error",
                        message: "Product Out of Stock"
                    })
                }
            }

            localStorage.setItem('TempCart', JSON.stringify(tempCart));
        } catch (error) {
            console.error(error);
        }
        if (userId) {
            mergeCartsAfterLogin(userId);
        }
    };
    // Function to merge temporary cart with user's cart after login
    const mergeCartsAfterLogin = (userId) => {
        try {
            const tempCart = JSON.parse(localStorage.getItem('TempCart')) || [];
            let userCart = JSON.parse(localStorage.getItem(`CartList_${userId}`)) || [];

            // Merge tempCart items into user's cart
            tempCart.forEach(item => {
                const existingItem = userCart.find(uItem => uItem.id === item.id);

                if (existingItem) {
                    const checkProductOutOfStock = data.find(item => item._id === existingItem.id)
                    if (checkProductOutOfStock.Stock > existingItem.numberOfItems) {
                        setAlertConfig({
                            messageType: "success",
                            message: "Added to Cart"
                        })
                        // notify();
                        existingItem.numberOfItems += item.numberOfItems;
                    }
                    else {
                        setAlertConfig({
                            messageType: "error",
                            message: "Product out of Stock"
                        })
                    }
                } else {
                    userCart.push(item);
                    setAlertConfig({
                        messageType: "success",
                        message: "Added to Cart"
                    })
                }
            });

            // Clear temporary cart after merging
            localStorage.removeItem('TempCart');

            // Update user's cart in localStorage
            localStorage.setItem(`CartList_${userId}`, JSON.stringify(userCart));
        } catch (error) {
            console.error(error);
        }
    };


    const addToWishlist = (value) => {
        const userId = Cookies.get('UserId');
        if (userId) {
            const wishList = JSON.parse(localStorage.getItem(`WishList_${userId}`)) || [];
            const existingItemIndex = wishList.findIndex(item => item.id === value);

            if (existingItemIndex !== -1) {
                // Remove item from wishlist
                setAlertConfig({
                    message: "Remove from whislist",
                    messageType: 'info'
                })
                wishList.splice(existingItemIndex, 1);
                setIsInWishlist(false);
                localStorage.setItem(`WishList_${userId}`, JSON.stringify(wishList));
            } else {
                // Add item to wishlist
                setAlertConfig({
                    message: "Added To whislist",
                    messageType: 'success'
                })
                const newItem = { id: value };
                wishList.push(newItem);
                setIsInWishlist(true);
                localStorage.setItem(`WishList_${userId}`, JSON.stringify(wishList));
            }
        } else {
            navigate('/user/login');
        }
    };

    return (
        <>
            <Header />
            {data.map((value, i) => { // ONLY ONE ITEM WILL BE DISPLAYED so why need loop ? 🤦‍♂️ 
                return <div className='product-page-container bg-white' key={i}>
                    <section id="product-info">
                        <div className="item-image-parent ">
                            <div className="item-image-main" >
                                {/* Main Image */}
                                <img src={`${baseurl}${value?.img}`} alt="default" />
                            </div>
                        </div>
                        <div className="item-info-parent" >
                            {/* Main Info */}
                            <div className="main-info">
                                <h4>{value.ProductName}</h4>
                                <a className="star-rating" href={'#review'}>
                                    <Rating initialValue={value.Rating} readonly={true} className="not-tailwind" size={16} allowFraction={true} />
                                </a>
                                <p>Price: <span id="price">₹{value.ProductPrice}</span></p>
                            </div>
                            {/* Choose */}
                            <div className="select-items">

                                <div className="STOCK">
                                    Stock:
                                </div>
                                <span className={`${value.Stock > 0 ? 'text-green-500' : 'text-red-500'} text-xl mx-1`}>{value.Stock > 0 ? 'InStock' : 'Out of Stock '}</span>
                                <div className='mt-2'>
                                    <h2 className="text-lg font-bold mb-4">Highlighted Points</h2>
                                    <ul className="list-disc list-inside">
                                        {highlightedPoints.length > 0 && highlightedPoints.map((point, index) => (
                                            <div className='flex'>
                                                <span className="mr-2">&#8226;</span>
                                                <li key={index} className="mb-2 flex items-center">
                                                    <p>{point}</p>
                                                </li>
                                            </div>
                                        ))}
                                    </ul>

                                </div>
                                <div className="description my-2">
                                    {/* Product description */}
                                    <p className='font-bold my-2'>Description :</p>
                                    {value.Description}
                                </div>
                            </div>
                            <div className='my-10 flex flex-col md:flex-row justify-start items-center '>
                                <button className='mb-4 md:mb-0 md:mr-4 bg-indigo-700 hover:bg-blue-700' onClick={() => { addToTemporaryCart(value._id) }}>Add To Cart</button>
                                <button className='mx-4 bg-indigo-700 hover:bg-blue-700' onClick={() => { addToWishlist(value._id) }} >{isInWishlist ? 'Remove From Wishlist' : 'Add To Wishlist'}</button>
                            </div>
                        </div>
                    </section>
                </div>
            })}
            <ToastContainer />
            <SuggestedProducts products={suggestedProductsData} />
            <Reviews userReviews={userReviews} setNeedUpdate={setNeedUpdate} />
            {/* <Reviews key={index} imgurl={review.userId.img} productRating={review.Rating} productMessage={review.message} userName={review.userId.name} /> */}
            {/* <Reviews /> */}
            {/* {showAlert && <Alert messageType={alertConfig.message} Message={alertConfig.messageType} />} */}
        </>
    );
}

export default Productde;
