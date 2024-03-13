// Productde.jsx
import React, { useEffect, useState } from 'react';
import './product.css'
import Header from '../home/header';
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../alerts/alert';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Productde = () => {
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    const baseurl = apiUrl;
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        messageType: "",
        message: 'empty'
    })
    const navigate = useNavigate();
    var id = useParams();
    id = id.id.replace(':', '');
    const [data, setdata] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
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
    useEffect(() => {
        // Fetch product details based on ID and set the data
        fetch(`${apiUrl}product/:?id=${id}`)
            .then((response) => response.json())
            .then((result) => {
                const arr = [result];
                setdata(arr);

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
    }, [id]);
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


    const handleAlerts = () => {
        setShowAlert(true)
        // You might want to use setTimeout to hide the alert after a few seconds
    };
    const addToWishlist = (value) => {
        const userId = Cookies.get('UserId');
        if (userId) {
            const wishList = JSON.parse(localStorage.getItem(`WishList_${userId}`)) || [];
            const existingItemIndex = wishList.findIndex(item => item.id === value);

            if (existingItemIndex !== -1) {
                // Remove item from wishlist
                setAlertConfig({
                    messageType: "Remove from whislist",
                    message: 'info'
                })
                wishList.splice(existingItemIndex, 1);
                setIsInWishlist(false);
                localStorage.setItem(`WishList_${userId}`, JSON.stringify(wishList));
            } else {
                // Add item to wishlist
                setAlertConfig({
                    messageType: "Added To whislist",
                    message: 'success'
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
            {data.map((value, i) => {
                return <div className='product-page-container'>
                    <section id="product-info">
                        <div className="item-image-parent">

                            <div className="item-image-main">
                                {/* Main Image */}
                                <img src={`${baseurl}${value?.img}`} alt="default" />
                            </div>
                        </div>
                        <div className="item-info-parent">
                            {/* Main Info */}
                            <div className="main-info">
                                <h4>{value.ProductName}</h4>
                                <div className="star-rating">
                                    <span>★★★★</span>★
                                </div>
                                <p>Price: <span id="price">₹{value.ProductPrice}</span></p>
                            </div>
                            {/* Choose */}
                            <div className="select-items">

                                <div className="STOCK">
                                    Stock:
                                </div>
                                <span className='text-green-500 text-xl mx-1'>InStock</span>
                                <div className="description my-2">
                                    {/* Product description */}
                                    <p className='font-bold my-2'>Description :</p>
                                    {value.Description}
                                </div>
                            </div>
                            <div className='my-10 flex flex-col md:flex-row justify-start items-center '>
                                <button className='mb-4 md:mb-0 md:mr-4 bg-indigo-700 hover:bg-blue-700' onClick={() => { addToTemporaryCart(value._id) }}>Add To Cart</button>
                                <button className='mx-4 bg-indigo-700 hover:bg-blue-700' onClick={() => { addToWishlist(value._id); handleAlerts() }} >{isInWishlist ? 'Remove From Wishlist' : 'Add To Wishlist'}</button>
                            </div>
                        </div>
                    </section>
                </div>
            })}
            <ToastContainer />
            {/* {showAlert && <Alert messageType={alertConfig.message} Message={alertConfig.messageType} />} */}
        </>
    );
}

export default Productde;
