import React from 'react'
// import './main.css'
import Header from './header'
import Contents from './content'
import Footer from './foot'
import ImageSlider from '../helper/topsliderimage'
const Homepage = () => {
    return (
        <div>
            <Header />
            <ImageSlider />
            <Contents />
            <Footer />
        </div>
    )
}

export default Homepage
