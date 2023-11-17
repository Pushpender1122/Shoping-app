import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="footer-back-to-top"><a href="#">Back to top</a></div>
            <div className="footer">
                <div className="List-of-footer-element">
                    <div className="footer-element">
                        <div className="footer-Get-to-know">Get to Know Us</div>
                        <ul className="footer-element1-list">
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">About Amazon</a></li>
                            <li><a href="#">Investor Relations</a></li>
                            <li><a href="#">Amazon Devices</a></li>
                            <li><a href="#">Amazon Science</a></li>
                        </ul>
                    </div>
                    <div className="footer-element">
                        <div className="footer-Make-Money">Make Money with Us</div>
                        <ul className="footer-element2-list">
                            <li><a href="#">Sell Product on Amazon</a></li>
                            <li><a href="#">Sell on Amazon Business</a></li>
                            <li><a href="#">Sell Apps on Amazon</a></li>
                            <li><a href="#">Become an Affiliate</a></li>
                            <li><a href="#">Advertise Your Product</a></li>
                            <li><a href="#">Self-Publish with Us</a></li>
                            <li><a href="#">Host an Amazon Hub</a></li>
                        </ul>
                    </div>
                    <div className="footer-element">
                        <div className="footer-Amazon-Pay">Amazon Payment Products</div>
                        <ul className="footer-element3-list">
                            <li><a href="#">Amazon Business Card</a></li>
                            <li><a href="#">Shop with Points</a></li>
                            <li><a href="#">Reload Your Balance</a></li>
                            <li><a href="#">Amazon Currency Converter</a></li>
                        </ul>
                    </div>
                    <div className="footer-element">
                        <div className="footer-Let-Us">Let Us Help You</div>
                        <ul className="footer-element4-list">
                            <li><a href="#">Amazon and COVID-19</a></li>
                            <li><a href="#">Your Account</a></li>
                            <li><a href="#">Your Orders</a></li>
                            <li><a href="#">Shipping Rates & Policies</a></li>
                            <li><a href="#">Return & Replacement</a></li>
                            <li><a href="#">Manage Your Content and Devices</a></li>
                            <li><a href="#">Amazon Assistant</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>
                </div>
                <div className="nav-footer-line"></div>
                <div className="Another-footer">
                    <div className="footerlogo"></div>
                    <div className="language-country-box">
                        <div className="language">English</div>
                    </div>
                </div>
            </div>
            <div className="last-footer">
                <ul className="footer-last-element">
                    <li><a href="#">Conditions of Use</a></li>
                    <li><a href="#">Privacy Notice</a></li>
                    <li><a href="#">Your Ads Privacy Choices</a></li>
                </ul>
                <span className="copyright">
                    <div>© 1996-2023, Amazon.com, Inc. or its affiliates</div>
                </span>
            </div>
        </footer>
    );
}

export default Footer;
