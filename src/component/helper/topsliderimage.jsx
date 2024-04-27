import React, { useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { SerachlistProvider } from '../context/serchContext';
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000 // Change the speed (in milliseconds) as needed

};
const ImageSlider = () => {
    const { setSearchList } = useContext(SerachlistProvider);
    return (
        <div style={{ marginTop: "30px" }}>

            <Slider {...settings}>
                <div >
                    <Link to="/product/search" onClick={() => setSearchList('console')} style={{ cursor: "pointer" }}> <img src="pro1.webp" alt="Image 1" style={{ width: '100%', height: '300px', objectFit: 'cover' }} /></Link>
                </div>
                <div>
                    <Link to="/product/search" onClick={() => setSearchList('laptop')} style={{ cursor: "pointer" }}> <img src="pro2.jpg" alt="Image 2" style={{ width: '100%', height: '300px', objectFit: 'cover' }} /></Link>
                </div>
                <div>
                    <Link to="/product/search" onClick={() => setSearchList('camera')} style={{ cursor: "pointer" }}>  <img src="pro3.jpg" alt="Image 3" style={{ width: '100%', height: '300px', objectFit: 'cover' }} /></Link>
                </div>
            </Slider>
        </div>
    );
};

export default ImageSlider;
