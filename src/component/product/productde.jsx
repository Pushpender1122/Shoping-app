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
                                <button className='mb-4 md:mb-0 md:mr-4 bg-indigo-700 hover:bg-blue-700' onClick={() => { addedToCart(value._id) }}>Add To Cart</button>
                                <button className='mx-4 bg-indigo-700 hover:bg-blue-700'>Add To Wishlist</button>
                            </div>

                        </div>
                    </section>
                </div>
            })}

        </>
    );
}

export default Productde;
