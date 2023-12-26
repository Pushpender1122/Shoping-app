import React, { useEffect, useState } from 'react';
import Contents from '../home/content';
import Header from '../home/header';
import Cookies from 'js-cookie';
import emptywishimg from '../img/empty-wishlist.png';

const Wishlist = () => {
    const [wishlist, setWishList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = Cookies.get("UserId");
        const wishList = JSON.parse(localStorage.getItem(`WishList_${userId}`)) || [];
        setWishList(wishList);
        setLoading(false);
    }, [Cookies.get("UserId")]); // Fetch wishlist whenever UserId changes

    if (loading) {
        return null;
    }

    return (
        <>
            <Header />
            <p className='text-4xl my-6 font-medium font-serif lg:mx-40 lg:my-6 lg:text-4xl xl:text-4xl xl:my-8 xl:mx-36 2xl:text-5xl 2xl:my-10 2xl:mx-96 2xl:px-96'>
                WishList
            </p>
            {wishlist.length > 0 ? (
                <Contents productList={wishlist} />
            ) : (
                <>
                    <div className="flex justify-center items-center">
                        <img src={emptywishimg} alt="Empty Wishlist" />
                    </div>
                    <p className='text-center text-2xl'>Your WishList is empty</p>
                </>
            )}
        </>
    );
};

export default Wishlist;
