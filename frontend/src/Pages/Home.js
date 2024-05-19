import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Components/Loader';
import ProductCard from '../Components/ProductCard';
import './Home.css';
import heroImage from '../Assets/hero-image.png';
import { FaArrowRightLong } from "react-icons/fa6";
import Categories from '../Components/Categories';
import FeaturedProducts from '../Components/FeaturedProducts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearFilter } from '../redux/filterSlice';
import Cookies from 'js-cookie';

function Home() {
  useEffect(()=>{
    console.log(Cookies.get("token"));
  }, [])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function viewCollectionHandle() {
    dispatch(clearFilter());
    navigate('/products')
  }
  return (
    <div>
      <div className='hero-container'>
        <div className="hero-section">
          <div className="hero-left">
            <p>LEAP TO COMPORT</p>
            <button className='hero-btn' onClick={() => viewCollectionHandle()}>View Collections<FaArrowRightLong /></button>
          </div>
          <div className='hero-right'>
            <img src={heroImage} alt="HeroImage" />
          </div>
        </div>
      </div>
      <Categories />
      <FeaturedProducts />
    </div>
  )
}

export default Home;