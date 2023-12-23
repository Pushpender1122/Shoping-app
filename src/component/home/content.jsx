import React, { useContext, useEffect, useState } from 'react';
import './contentc.css'; // Import your component-specific CSS file if needed
import { idProvider } from '../context/data'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Feed = () => {
    const { id, setid } = useContext(idProvider);
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    const baseurl = 'http://localhost:7000/';
    const notify = () => {
        toast.success('Added to Cart', {
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
        fetch('http://localhost:7000/productlist').then((response) => response.json())
            .then((result) => {
                console.log(result);
                setdata(result);
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    const sendData = (data) => {
        { setid(data) };
        navigate(`/product/:${data}`);
    }
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        const truncatedText = text.slice(0, maxLength).trim();
        return `${truncatedText.substr(0, Math.min(truncatedText.length, truncatedText.lastIndexOf(' ')))}...`;
    }
    const addedToCart = (value) => {
        try {
            // Retrieve existing cart items from localStorage
            let CartList = JSON.parse(localStorage.getItem('CartList')) || [];
            // Check if the item is already in the cart
            const existingItem = CartList.find(item => item.id === value);
            if (existingItem) {
                // If the item exists, increment its quantity

                existingItem.numberOfItems++;
            } else {
                // If the item doesn't exist, add it to the cart
                const productobj = {
                    id: value,
                    numberOfItems: 1
                }
                CartList.push(productobj);
            }

            // Store the updated cart back into localStorage
            localStorage.setItem('CartList', JSON.stringify(CartList));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="wrapper">
            <div className="content">
                {/* content here */}
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
                                            <span className="product-grid__btn product-grid__add-to-cart" onClick={() => { addedToCart(value._id); notify() }}>
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
                </div>
            </div>
            <ToastContainer />
        </div>

    );
};

export default Feed;
