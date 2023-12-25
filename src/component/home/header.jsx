import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import img from '../img/logo.jpg'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import './header.css'
import Alert from '../alerts/alert';
import { Authentication } from '../context/auth';
const Header = () => {
    const [cookiestate, setCookiestate] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const { setIsAuthenticated } = useContext(Authentication);
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    const [alertConfig, setAlertConfig] = useState({
        message: '',
        messageType: 'success'
    });
    useEffect(() => {
        const cookie = Cookies.get('Auth');
        console.log(cookie);
        setCookiestate(cookie);
    }, [])
    const navigate = useNavigate();
    const handleNav = () => {
        navigate('/user/login');
    }
    const handleLogout = async () => {
        try {
            const cookie = Cookies.get('Auth');
            if (cookie) {
                const result = await axios.get(`${apiUrl}auth/user/logout`, { withCredentials: true });
                console.log(result.data); // Logging the actual result from the server
                if (result.data.message === "Successfully logged out") {
                    setIsAuthenticated({
                        isAuthenticated: false,
                        UserRole: undefined
                    })
                    handleSuccessLogout();
                } else {
                    handleFailedLogout('Authentication Failed');
                }
            } else {
                handleFailedLogout('Authentication Failed');
            }
        } catch (error) {
            console.error("Logout failed:", error);
            handleFailedLogout('Logout failed. Please try again.');
        }
    }
    const handleSuccessLogout = () => {
        Cookies.remove('Auth');
        Cookies.remove('UserRole');
        Cookies.remove('UserId');
        setCookiestate(null)
        setAlertConfig({
            message: 'Logout Successfully',
            messageType: 'success'
        });
        setShowAlert(true);
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };
    const handleFailedLogout = (message) => {
        Cookies.remove('UserRole');
        Cookies.remove('Auth');
        Cookies.remove('UserId');
        setAlertConfig({
            message: message,
            messageType: 'error'
        });
        setShowAlert(true);
        setTimeout(() => {
            navigate('/user/login');
        }, 3000);
    };
    return (
        <header>

            {/* / contact content */}
            <div className="containerr">
                {/* logo */}
                <strong className="logo"><i className="fas fa-heart"></i></strong>
                {/* open nav mobile */}

                {/*search */}
                <label className="open-search" htmlFor="open-search">
                    <i className="fas fa-search"></i>
                    <input className="input-open-search" id="open-search" type="checkbox" name="menu" />
                    <div className="search">
                        <button className="button-search"><i className="fas fa-search"></i></button>
                        <input type="text" placeholder="What are you looking for?" className="input-search" />
                    </div>
                </label>
                {/* // search */}

                <nav className="nav-content">
                    {/* nav */}
                    <ul className="nav-content-list">
                        <li className="nav-content-item account-login">
                            <label className="open-menu-login-account" htmlFor="open-menu-login-account">

                                <input className="input-menu" id="open-menu-login-account" type="checkbox" name="menu" />

                                <i className="fas fa-user-circle"></i><span className="login-text"></span> <span className="item-arrow"></span>

                                {/* submenu */}
                                <ul className="login-list">
                                    {cookiestate ? <li className="login-list-item"><Link to="/user/profile">My account</Link></li> : null}
                                    {cookiestate ? null : <li className="login-list-item"><Link to="/user/signup">Create account</Link></li>}
                                    {cookiestate ? <li className="login-list-item"><a onClick={handleLogout}>Logout</a></li> : null}
                                </ul>
                            </label>
                        </li>
                        <li className="nav-content-item"><a className="nav-content-link" href="#"><i className="fas fa-heart"></i></a></li>
                        <li className="nav-content-item"><Link className="nav-content-link" to="/product/cart"><i className="fas fa-shopping-cart"></i></Link></li>
                        {/* call to action */}
                    </ul>
                </nav>
            </div>
            {/* nav navigation commerce */}
            <div className="nav-container">
                <nav className="all-category-nav">
                    <label className="open-menu-all" htmlFor="open-menu-all">
                        <input className="input-menu-all" id="open-menu-all" type="checkbox" name="menu-open" />
                        <span className="all-navigator"><i className="fas fa-bars"></i> <span>All category</span> <i className="fas fa-angle-down"></i>
                            <i className="fas fa-angle-up"></i>
                        </span>

                        <ul className="all-category-list">
                            <li className="all-category-list-item"><a href="#" className="all-category-list-link">Smartphones<i className="fas fa-angle-right"></i></a>
                                <div className="category-second-list">
                                    <ul className="category-second-list-ul">
                                        <li className="category-second-item"><a href="#">Iphone 10</a></li>
                                        <li className="category-second-item"><a href="#">Galaxy Note 10</a></li>
                                        <li className="category-second-item"><a href="#">Motorola One </a></li>
                                        <li className="category-second-item"><a href="#">Galaxy A80 </a></li>
                                        <li className="category-second-item"><a href="#">Galaxy M </a></li>
                                        <li className="category-second-item"><a href="#">Huaway P30 </a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="all-category-list-item"><a href="#" className="all-category-list-link">Furniture <i className="fas fa-angle-right"></i></a></li>
                            <li className="all-category-list-item"><a href="#" className="all-category-list-link">Toys<i className="fas fa-angle-right"></i></a></li>
                            <li className="all-category-list-item"><a href="#" className="all-category-list-link">Computing<i className="fas fa-angle-right"></i></a></li>
                            <li className="all-category-list-item"><a href="#" className="all-category-list-link">Games<i className="fas fa-angle-right"></i></a></li>
                            <li className="all-category-list-item"><a href="" className="all-category-list-link">Automotive<i className="fas fa-angle-right"></i></a></li>

                        </ul>
                    </label>
                </nav>
                <nav className="featured-category">
                    <ul className="nav-row">
                        <li className="nav-row-list"><a href="#" className="nav-row-list-link">Smartphones</a></li>
                        <li className="nav-row-list"><a href="#" className="nav-row-list-link">furniture</a></li>
                        <li className="nav-row-list"><a href="#" className="nav-row-list-link">Toys</a></li>
                        <li className="nav-row-list"><a href="#" className="nav-row-list-link">Computing</a></li>
                        <li className="nav-row-list"><a href="#" className="nav-row-list-link">Games</a></li>
                        <li className="nav-row-list"><a href="#" className="nav-row-list-link">Automotive</a></li>
                    </ul>
                </nav>
            </div>
            {showAlert && <Alert messageType={alertConfig.messageType} Message={alertConfig.message} />}
        </header>
    );
};

export default Header;
