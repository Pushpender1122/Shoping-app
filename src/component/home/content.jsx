import React, { useContext, useEffect, useState } from 'react';
import './contentc.css'; // Import your component-specific CSS file if needed
import { idProvider } from '../context/data'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { SerachlistProvider } from '../context/serchContext';
import Wishlist from '../cart/wishlist';
const Feed = (props) => {
    const { id, setid } = useContext(idProvider);
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    const [storedData, setStoredData] = useState([]);
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    const baseurl = apiUrl;
    const { serachList } = useContext(SerachlistProvider);
    const [alertMessage, setAlertMessage] = useState({
        messageType: "empty",
        message: ""
    })
    const notify = () => {
        toast[alertMessage.messageType](alertMessage.message, {
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
        if (alertMessage.message !== '') {
            notify();
        }
    }, [alertMessage])
    useEffect(() => {
        fetch(`${apiUrl}productlist`).then((response) => response.json())
            .then((result) => {
                console.log(result);
                setdata(result);
                setStoredData(result);
                if (props?.productList) {
                    console.log("its run");
                    console.log(props.productList);
                    const wishlistProducts = result.filter(product => props.productList.find(item => item.id === product._id));
                    console.log(wishlistProducts.length);
                    setStoredData(wishlistProducts);
                    setdata(wishlistProducts);
                }
                else {
                    console.log("not run ");
                }
                // console.log(props)
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    useEffect(() => {
        const filteredData = storedData?.filter((value) => {
            // Check if the ProductName includes the search query (case-insensitive)
            return value.ProductName.toLowerCase().includes(serachList.toLowerCase());
        });
        setdata(filteredData)
    }, [serachList]);

    const sendData = (data) => {
        { setid(data) };
        navigate(`/product/:${data}`);
    }
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        const truncatedText = text.slice(0, maxLength).trim();
        return `${truncatedText?.substr(0, Math.min(truncatedText?.length, truncatedText.lastIndexOf(' ')))}...`;
    }
    const addToTemporaryCart = (value) => {
        const userId = Cookies.get('UserId') || null;

        try {
            let tempCart = JSON.parse(localStorage.getItem('TempCart')) || [];

            const existingItem = tempCart.find(item => item.id === value);

            if (existingItem) {
                const checkProductOutOfStock = data.find(item => item._id === existingItem.id)
                console.log(checkProductOutOfStock);
                if (checkProductOutOfStock.Stock > existingItem.numberOfItems) {
                    setAlertMessage({
                        messageType: "success",
                        message: "Added to Cart"
                    })
                    // notify();
                    existingItem.numberOfItems++;
                    console.log("Its added to cart");
                }
                else {
                    setAlertMessage({
                        messageType: "error",
                        message: "Product out of Stock"
                    })
                    // notify();
                    console.log("its error");
                }
            } else {
                const productObj = {
                    id: value,
                    numberOfItems: 1
                };
                tempCart.push(productObj);
                setAlertMessage({
                    messageType: "success",
                    message: "Added to Cart"
                })
                // notify();
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
                    existingItem.numberOfItems += item.numberOfItems;
                } else {
                    userCart.push(item);
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

    return (
        <div className="product-grid product-grid--flexbox text-center">
            <div className="product-grid__wrapper">
                {/* Product list start here */}
                {/* Single product */}
                {data?.map((value, i) => {
                    return <div className="product-grid__product-wrapper">
                        <div className="product-grid__product">
                            <div className="product-grid__img-wrapper flex justify-center">
                                <img
                                    src={`${baseurl}${value?.img}`}
                                    alt="Img"
                                    className="product-grid__img"
                                    onClick={(() => sendData(value._id))}
                                />
                            </div>
                            <span className="product-grid__title">{value?.ProductName}</span>
                            <span className="product-grid__price">₹{value?.ProductPrice}</span>
                            <div className="product-grid__extend-wrapper">
                                <div className="product-grid__extend">
                                    <p className="product-grid__description">
                                        {truncateText(value?.Description, 60)} </p>
                                    <span className="product-grid__btn product-grid__add-to-cart" onClick={() => { addToTemporaryCart(value._id) }}>
                                        <i className="fa fa-cart-arrow-down"></i> Add to cart
                                    </span>
                                    <span className="product-grid__btn product-grid__view" onClick={(() => sendData(value._id))}>
                                        <i className="fa fa-eye"></i> View more
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                {/* end Single product */}
                {/* Repeat the above structure for each product */}
            </div>
            <ToastContainer />
        </div>

    );
};

export default Feed;
