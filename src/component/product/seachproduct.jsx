import React, { useState } from 'react';
import './seachpro.css'
import Header from '../home/header';
import ProductFilter from '../helper/filterProduct';
import axios from 'axios';
import { useEffect } from 'react';
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
const Baseurl = process.env.REACT_APP_SERVER_URL
const Product = ({ imgSrc, title, subtitle, price, genre, rating, id }) => {
    const navigate = useNavigate();
    const sendData = (data) => {
        navigate(`/product/:${data}`);

    }
    return (
        // <Link to="" style={{ color: "black" }}>
        <div className="product-search1 cursor-pointer" onClick={() => { sendData(id) }}>
            <div div className="product-img" >
                <img src={imgSrc} alt="Product" style={{ maxWidth: "100%", objectFit: "contain" }} />
            </div >
            <div className="product-content">
                <h3>{title} <small>{subtitle}</small></h3>
                <Rating initialValue={rating} readonly={true} className="not-tailwind" size={16} />
                <p className="product-text price">₹{price}</p>
                <p className="product-text genre">{genre}</p>
            </div>
        </div>
        // </Link>
    )
};

const ProductList = ({ view, product }) => {
    const [rating, setRating] = useState(5);
    const handleRating = (rate) => {
        setRating(rate)
    }
    return (
        <div className=''>
            <div className={`products ${view}`}>
                {product.map((product) => {
                    return (
                        <Product
                            key={product._id}
                            imgSrc={Baseurl + product.img}
                            title={product.ProductName}
                            subtitle={product.Description.slice(0, 100).concat('...')}
                            price={product.ProductPrice}
                            rating={product.Rating}
                            id={product._id}
                        // genre={product.Category[0]}
                        />
                    )
                })}
                {/* Add more <Product /> components here for additional products */}
            </div>

        </div>
    )
};

const Tools = ({ onViewChange }) => (
    <div className="tools">
        <div className="settings">
            <button id="view" onClick={onViewChange}>Switch View</button>
        </div>
    </div>
);

const ProductPage = () => {
    const [view, setView] = useState('products-table');
    const [filters, handleFiltersChange] = useState({
        rating: '',
        category: '',
        priceRange: '50000',
    });
    const [product, setProduct] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        var getData = setTimeout(() => {
            axios.get(`http://localhost:7000/productList?rating=${filters.rating}&category=${filters.category}&price=1000-${filters.priceRange}`)
                .then((res) => {
                    setProduct(res.data);
                    setLoader(false);
                })
                .catch((err) => {
                    console.log(err)
                })
        }, 1000);
        return () => clearTimeout(getData)
    }, [filters])
    const handleViewChange = () => {
        setView(view === 'products-table' ? 'products-grid' : 'products-table');
    };
    return (
        <>
            <Header />
            <link href="https://fonts.googleapis.com/css?family=Raleway:400,600,700,800" rel='stylesheet' type='text/css' />
            <div className='flex '>
                <ProductFilter filters={filters} onFiltersChange={handleFiltersChange} />
                {loader ? <img src="/loader.gif" className='h-56 w-auto mix-blend-multiply m-auto' alt="" /> : (product.length > 0 ? <ProductList view={view} product={product} /> : <div class="text-center text-gray-500 mt-4 font-medium text-xl m-auto">No Product found 😢</div>
                )}
                {/* <Tools onViewChange={handleViewChange} /> */}
            </div>

        </>
    );
};

export default ProductPage;
