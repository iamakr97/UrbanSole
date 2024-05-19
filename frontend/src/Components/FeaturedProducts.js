import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeaturedProducts.css';
import { FaArrowRightLong } from "react-icons/fa6";
import ProductCard from './ProductCard';
import { fetchCartItems } from '../Utils/CartUtils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearFilter } from '../redux/filterSlice';
import Loader from './Loader';
import toast from 'react-hot-toast';

function FeaturedProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  function fetchFeaturedProducts() {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/featuredProducts`,
      {
        withCredentials: true
      }).then((res) => {
        setFeaturedProducts(res.data.featuredProducts);
      }).catch((err) => {
        toast.error("Internal Server Error in Fetching Featured Products")
        console.log(err);
      })
  }
  useEffect(() => {
    fetchFeaturedProducts();
    fetchCartItems(token, dispatch);
  }, []);
  function browseAllProductHandler() {
    dispatch(clearFilter());
    navigate('/products')
  }

  return (
    <div>
      <h2 id='featuredProductHeading'>Featured Products</h2>
      {featuredProducts.length < 1
        ?
        <Loader/>
        :
        <div className='featured-container'>
          {
            featuredProducts.map((product) => {
              return <ProductCard key={product._id} product={product} />
            })
          }
        </div>
      }
      <div className='btn-container'>
        <button className='hero-btn' onClick={() => browseAllProductHandler()}>Browse All Products <FaArrowRightLong /> </button>
      </div>
    </div>
  );
}

export default FeaturedProducts;