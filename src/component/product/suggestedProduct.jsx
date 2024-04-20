import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const SuggestedProducts = (products) => {
    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate();
    const goesTop = (productid) => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            navigate(`/product/:${productid}`);
        }, 1000)
    }
    if (products.products.length < 1) {
        return null;
    }
    return (
        <div className=' mx-auto bg-white ' >
            <h1 className='text-2xl text-center'>Suggested Products</h1>
            <div className='flex  overflow-x-auto scroll-smooth ' style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::WebkitScrollbar': {
                    display: 'none'
                },
                "padding": "20px 35px"
            }}>
                {products.products?.map(product => (
                    <div key={product._id} className='w-60 h-80 m-4 flex flex-col items-center' style={{ flex: "0 0 250px" }}>
                        <div className="suggimgDiv w-full cursor-pointer" onClick={() => goesTop(product._id)}>
                            <img src={baseUrl + product.img} alt={product.ProductName} className='w-full h-48 object-contain mix-blend-multiply' />
                        </div>
                        <div className='p-4'>
                            <h3 className='text-lg font-semibold'>{product.ProductName.slice(0, 20)}</h3>
                            <Rating initialValue={product.Rating} readonly={true} className="not-tailwind" size={16} allowFraction={true} />
                            <p className='text-sm text-gray-600'>₹{product.ProductPrice}</p>
                            <p>{product.Description.slice(0, 40)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestedProducts;
