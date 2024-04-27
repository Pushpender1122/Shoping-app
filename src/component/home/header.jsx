import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import './header.css'
import Alert from '../alerts/alert';
import { Authentication } from '../context/auth';
import { SerachlistProvider } from '../context/serchContext';
const Header = () => {
    const [cookiestate, setCookiestate] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [checkAdmin, setCheckAdmin] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Authentication);
    const [showList, setShowList] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { serachList, setSearchList } = useContext(SerachlistProvider);
    const apiUrl = process.env.REACT_APP_SERVER_URL;
    const [alertConfig, setAlertConfig] = useState({
        message: '',
        messageType: 'success'
    });
    useEffect(() => {
        const cookie = Cookies.get('Auth');
        const userRole = Cookies.get('UserRole');
        if (userRole === 'admin') {
            setCheckAdmin(true);
        }
        console.log(cookie);
        setCookiestate(cookie);
        const handleClickOutside = (event) => {
            const dropdown = document.querySelector('.login-list');
            const menuCheckbox = document.getElementById('open-menu-login-account');
            // console.log(event.target);
            if (!menuCheckbox.contains(event.target) && !dropdown.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])


    const handleListClick = () => {
        setIsOpen(!isOpen);
    };
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const cookie = Cookies.get('Auth');
            if (cookie) {
                const result = await axios.get(`${apiUrl}auth/user/logout`, { withCredentials: true });
                console.log(result.data); // Logging the actual result from the server
                if (result.data.message === "Successfully logged out") {
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
            setIsAuthenticated({
                isAuthenticated: false,
                UserRole: undefined
            })
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
    const handleProductSearch = () => {
        navigate("/product/search");
    }
    const handleNavClick = () => {
        setShowList(false)
    }
    return (
        <header>

            {/* / contact content */}
            <div className="containerr">
                {/* logo */}
                <Link to={'/'}> <strong className="logo"><i className="fas fa-heart"></i></strong></Link>
                {/* open nav mobile */}

                {/*search */}
                <label className="open-search" htmlFor="open-search">
                    <i className="fas fa-search"></i>
                    <input className="input-open-search" id="open-search" type="checkbox" name="menu" />
                    <div className="search">
                        <button className="button-search" onClick={handleProductSearch}><i className="fas fa-search"></i></button>
                        <input type="text" placeholder="What are you looking for?" className="input-search" value={serachList} onChange={(e) => setSearchList(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                navigate("/product/search");
                            }
                        }} />
                    </div>
                </label>
                {/* // search */}

                <nav className="nav-content">
                    {/* nav */}
                    <ul className="nav-content-list">
                        <li className="nav-content-item account-login">
                            <label className="open-menu-login-account" htmlFor="open-menu-login-account">

                                <input
                                    className="input-menu"
                                    id="open-menu-login-account"
                                    type="checkbox"
                                    name="menu"
                                    checked={isOpen}
                                    onChange={handleListClick}
                                />

                                <i className="fas fa-user-circle"></i><span className="login-text"></span> <span className="item-arrow"></span>
                                {/* submenu */}
                                <ul className={`login-list ${isOpen ? '' : 'hidden'}`}>
                                    {cookiestate ? <Link className='login-a' to="/user/profile"><li className="login-list-item" onClick={() => setIsOpen(false)}>My account</li></Link> : null}
                                    {cookiestate ? null : <Link className='login-a' to="/user/signup"><li className="login-list-item">Create account</li></Link>}
                                    {checkAdmin ? <Link className='login-a' to="/admin/dashboard"><li className="login-list-item">Admin Dashboard</li></Link> : null}
                                    {cookiestate ? <Link className='login-a' onClick={handleLogout}><li className="login-list-item">Logout</li></Link> : null}
                                </ul>
                            </label>
                        </li>
                        <li className="nav-content-item"><Link className="nav-content-link" to="/user/wishlist"><i className="fas fa-heart"></i></Link></li>
                        <li className="nav-content-item"><Link className="nav-content-link" to="/product/cart"><i className="fas fa-shopping-cart"></i></Link></li>
                        {/* call to action */}
                    </ul>
                </nav>
            </div>
            {/* nav navigation commerce */}
            <div className="nav-container">
                <nav className="all-category-nav">
                    <label className="open-menu-all" htmlFor="open-menu-all">
                        <input className="input-menu-all" id="open-menu-all" type="checkbox" name="menu-open" checked={showList} onChange={(e) => (setShowList(e.target.checked))} />
                        <span className="all-navigator"><i className="fas fa-bars"></i> <span>All category</span> <i className="fas fa-angle-down"></i>
                            <i className="fas fa-angle-up"></i>
                        </span>

                        <ul className={`all-category-list `}>
                            <li className="all-category-list-item"><Link to="/product/search" className="all-category-list-link" onClick={() => (setSearchList('phone'), handleNavClick())}>Smartphones<i className="fas fa-angle-right"></i></Link></li>
                            <li className="all-category-list-item"><Link to="/product/search" className="all-category-list-link" onClick={() => (setSearchList('Furniture'), handleNavClick())}>Furniture <i className="fas fa-angle-right"></i></Link></li>
                            <li className="all-category-list-item"><Link to="/product/search" className="all-category-list-link" onClick={() => (setSearchList('toys'), handleNavClick())}>Toys<i className="fas fa-angle-right"></i></Link></li>
                            <li className="all-category-list-item"><Link to="/product/search" className="all-category-list-link" onClick={() => (setSearchList('computer'), handleNavClick())}>Computing<i className="fas fa-angle-right"></i></Link></li>
                            <li className="all-category-list-item"><Link to="/product/search" className="all-category-list-link" onClick={() => (setSearchList('games'), handleNavClick())}>Games<i className="fas fa-angle-right"></i></Link></li>

                        </ul>
                    </label>
                </nav>
                <nav className="featured-category">
                    <ul className="nav-row">
                        <li className="nav-row-list"><Link to="/product/search" onClick={() => setSearchList('phone')} className="nav-row-list-link">Smartphones</Link></li>
                        <li className="nav-row-list"><Link to="/product/search" onClick={() => setSearchList('Furniture')} className="nav-row-list-link">furniture</Link></li>
                        <li className="nav-row-list"><Link to="/product/search" onClick={() => setSearchList('toys')} className="nav-row-list-link">Toys</Link></li>
                        <li className="nav-row-list"><Link to="/product/search" onClick={() => setSearchList('computer')} className="nav-row-list-link">Computing</Link></li>
                        <li className="nav-row-list"><Link to="/product/search" onClick={() => setSearchList('games')} className="nav-row-list-link">Games</Link></li>

                    </ul>
                </nav>
            </div>
            {showAlert && <Alert messageType={alertConfig.messageType} Message={alertConfig.message} />}
        </header>
    );
};

export default Header;
