import React, { useContext, useEffect, useState } from 'react';
import './contentc.css'; // Import your component-specific CSS file if needed
import { idProvider } from '../context/data'
import { useNavigate } from 'react-router-dom'
const Feed = () => {
    const { id, setid } = useContext(idProvider);
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    const baseurl = 'http://localhost:7000/';
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
    return (
        <div className="wrapper">
            <div className="content">
                {/* content here */}
                <div className="product-grid product-grid--flexbox">
                    <div className="product-grid__wrapper">
                        {/* Product list start here */}
                        {/* Single product */}

                        {data?.map((value, i) => {
                            return <div className="product-grid__product-wrapper">
                                <div className="product-grid__product">
                                    <div className="product-grid__img-wrapper">
                                        <img
                                            src={`${baseurl}${value?.img}`}
                                            alt="Img"
                                            className="product-grid__img"
                                            onClick={(() => sendData(value._id))}
                                        />
                                    </div>
                                    <span className="product-grid__title">{value?.ProductName}</span>
                                    <span className="product-grid__price">{value?.ProductPrice}₹</span>
                                    <div className="product-grid__extend-wrapper">
                                        <div className="product-grid__extend">
                                            <p className="product-grid__description">
                                                {value?.Description}
                                            </p>
                                            <span className="product-grid__btn product-grid__add-to-cart">
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

        </div>
    );
};

export default Feed;
