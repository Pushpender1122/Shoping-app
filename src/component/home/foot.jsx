import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './foot.css'
// import Logo from './images.jpg'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-info ">
                    <img src="/logo-no-background.png" alt="QuikCyber Ecom" className="footer-logo bg-blend-multiply " />
                    <p className="footer-text">
                        Copyright &copy; {new Date().getFullYear()} QuikCyber Ecom. All Rights Reserved.
                    </p>
                </div>
                <nav className="footer-nav">
                    <ul className="footer-nav-list">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Help & Support</a></li>
                        <li><a href="#">Shipping & Returns</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                    </ul>
                </nav>
                <div className="footer-social">
                    <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="https://www.instagram.com/jangra.pushpender/" target='_black'><FontAwesomeIcon icon={faInstagram} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
