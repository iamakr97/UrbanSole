import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import { FaRegCopyright } from "react-icons/fa";
function Footer() {
    return (
        <div className='footer'>
            <div className="footer-container">
                <div className="brand-info">
                    <Link to='/' > <img src={logo} alt="Urban Sole" className='logo' /> </Link>
                    <p className='footer-desc'>
                        Urban Sole crafts stylish and comfortable footwear for every occasion. From chic heels to casual sneakers, our designs blend fashion with comfort, ensuring you stride confidently. Explore our diverse collection and step into the perfect pair for any adventure.
                    </p>
                </div>
                <div className="footer-links">
                    <div className="left-link">
                        <Link>Home</Link>
                        <Link>Shop</Link>
                        <Link>Categories</Link>
                        <Link>About</Link>
                        <Link>Contact Us</Link>
                    </div>
                    <div className="right-link">
                        <Link>Terms & Conditions</Link>
                        <Link>Refund Policy</Link>
                        <Link>Privacy Policy</Link>
                        <Link>Shipping Policy</Link>
                        <Link>Partners With Us</Link>
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="developer-info">
                <p><FaRegCopyright />2024 Urban Sole.All rights reserved.</p>
                <p>
                    <span>Developed by : Amit Ranjan | </span>
                    <Link to='https://portfolio-smoky-beta-13.vercel.app' target='_blank'>About Us</Link>
                    <span> | </span>
                    <Link to='https://www.linkedin.com/in/iamakr97' target='_blank'>Contact Us</Link>
                </p>
            </div>
        </div>
    );
}

export default Footer;