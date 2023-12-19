// Productde.jsx
import React, { useContext, useEffect, useState } from 'react';
import './product.css'
import Header from '../home/header';
import { useParams } from 'react-router-dom'
// import { idProvider } from '../context/data';
const Productde = () => {
    const baseurl = 'http://localhost:7000/';
    var id = useParams();
    id = id.id.replace(':', '');
    const [data, setdata] = useState([]);
    useEffect(() => {
        console.log(id);
        fetch(`http://localhost:7000/product/:?id=${id}`).then((response) => response.json())
            .then((result) => {
                console.log(result);

                // const arrayFromKeys = Object.keys(result).map(key => result[key]);
                // setdata(arrayFromKeys);
                const arr = [result];
                setdata(arr);

            }).catch((err) => {
                console.log(+ err);
            })
    }, [])
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
        <>
            <Header />
            {data.map((value, i) => {
                return <div id="product">
                    <img className="product_images" src={`${baseurl}${value?.img}`} alt="Product_img" />

                    <div className="product_details">
                        <h2>{value.ProductName}</h2>
                        <h3>₹{value.ProductPrice}</h3>

                        <div className="about">
                            <p className="ppp">Availability :<span>{value.Stock}</span></p>
                            <p className="ppp">Tags : <span>{value.Category[0].replace(/^\["|"\]$/g, '').split('","').join(',')}</span></p>
                        </div>

                        <p className="ppp">{value.Description}</p>
                        <div className="cta">
                            <div className="btn btn_primary" onClick={() => { addedToCart(value._id) }}>add to cart</div>
                            <div className="btn btn_outline_secondary">
                                <span className="material-symbols-outlined">favorite</span>add to wishlist</div>
                        </div>
                    </div>
                </div>
            })}

        </>
    );
}

export default Productde;
