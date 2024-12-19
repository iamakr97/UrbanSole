import React, { useState, useCallback } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';
import { CiSearch } from "react-icons/ci";
import { PiShoppingCart } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';
import debounce from 'lodash.debounce';

function Navbar() {
    const navigate = useNavigate();
    const [searchBox, setSearchBox] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Function to make the API call
    const searchProducts = async (query) => {
        if (query === '') {
            setSearchResults([]);
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/search?query=${query}`);
            setSearchResults(response.data.results);
            console.log(response.data.results)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const debouncedSearch = useCallback(
        debounce((query) => searchProducts(query), 500),
        []
    );

    const searchHandler = (e) => {
        const value = e.target.value;
        console.log(value);
        setSearchBox(value);
        debouncedSearch(value);
    };
    function productCardClickHandler(id) {
        setSearchBox('');
        setSearchResults([]);
        navigate(`/product/${id}`);
    }

    return (
        <>
            <div className='nav-bar'>
                <div className="nav-container">
                    <div className="left-nav">
                        <Link to='/' > <img src={logo} alt="Urban Sole" className='logo' /> </Link>
                    </div>
                    <div className='search-box'>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                className="search-input"
                                type="text"
                                placeholder='Search for Products'
                                value={searchBox}
                                onChange={searchHandler} 
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

            {searchResults.length > 0 && (
                <div className='search-product' >
                    {searchResults.map((product) => (
                        <div key={product._id} className='search-item' onClick={()=>productCardClickHandler(product._id)}>
                            <img src={product.image[0]} alt={product.title} id='product-image' />
                            <p>{product.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Navbar;
