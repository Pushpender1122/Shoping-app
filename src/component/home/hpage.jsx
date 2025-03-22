import React, { useEffect } from 'react'
// import './main.css'
import Header from './header'
import Contents from './content'
import Footer from './foot'
import ImageSlider from '../helper/topsliderimage'
import Cookies from 'js-cookie';

import { initializeHomeTour as homeTour, initializeLoginHomeTour as loginHomeTour } from '../configs/tour'
const Homepage = () => {
    useEffect(() => {
        if (Cookies.get('Auth')) {
            if (!sessionStorage.getItem('homeTour')) {
                homeTour().drive()
                sessionStorage.setItem('homeTour', 'true')
            }
        }
        else {
            if (!sessionStorage.getItem('loginHomeTour')) {
                loginHomeTour().drive()
                sessionStorage.setItem('loginHomeTour', 'true')
            }
        }
        return () => {
            if (Cookies.get('Auth')) {
                homeTour().destroy()
            }
            else {
                loginHomeTour().destroy()
            }
        }
    }, [])
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
