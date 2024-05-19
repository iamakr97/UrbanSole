import React, { useState } from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import { CiSearch } from "react-icons/ci";
import { PiShoppingCart } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";

function Navbar() {
    const [searchBox, setSearchBox] = useState('');
    function searchHandler(e) {
        e.preventDefault();
        setSearchBox("");
        // console.log(searchBox);
    }
    return (
        <div className='nav-bar'>
            <div className="nav-container">
                <div className="left-nav">
                    <Link to='/' > <img src={logo} alt="Urban Sole" className='logo' /> </Link>
                </div>
                <div className='search-box'>
                    <form onSubmit={searchHandler}>
                        <input
                            className="search-input"
                            type="text"
                            placeholder='Search for Products'
                            value={searchBox}
                            onChange={(e) => setSearchBox(e.target.value)} 
                        />
                        <button className='search-btn'><CiSearch className='search-icon' /></button>
                    </form>
                </div>
                <div className="right-nav">
                    <Link to='/myAccount'><FaRegUserCircle className='nav-icons' /></Link>
                    <Link to='/cart'><PiShoppingCart className='nav-icons' /></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;