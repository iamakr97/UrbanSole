import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import { MdCurrencyRupee } from "react-icons/md";
import './Product.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { addToCartHandler } from '../Utils/CartUtils';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function Product() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, isLoggedIn } = useSelector(state => state.auth);
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [imgIndex, setImgIndex] = useState(0);
    const [size, setSize] = useState(0);
    const { items } = useSelector(state => state.cart);
    function isInCart(id) {
        return items.includes(id);
    }
    function fetchProductDetails() {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/product/${id}`,
            {
                withCredentials: true
            }).then((res) => {
                setProduct(res.data.product);
            }).catch((error) => {
                console.log(error);
            })
    }
    function goToCartHandler() {
        navigate('/cart');
    }
    useEffect(() => {
        fetchProductDetails();
    }, []);
    function handleNextImg() {
        setImgIndex((imgIndex) => (imgIndex + 1) % product.image.length);
    }
    function handlePrevImg() {
        setImgIndex((imgIndex) => (imgIndex - 1 + product.image.length) % product.image.length);
    }
    function addToCartHandle(){
        if(size==0){
            toast.error("Please Select Size");
            return;
        }
        addToCartHandler(product._id, token, isLoggedIn, size, dispatch);
    }
    return (
        <div className='product-container'>
            {product
                ?
                <div className='product-box'>
                    <div className="product-image-container">
                        <div className='product-image'>
                            <IoIosArrowBack className='next-btn' onClick={handlePrevImg} />
                            <img src={product.image[imgIndex]} alt="Product Image" />
                            <IoIosArrowForward className='next-btn' onClick={handleNextImg} />
                        </div>
                        <div className='button-container'>
                            {(product.quantity > 0)
                                ?
                                (!isInCart(product._id)
                                    ?
                                    <button className='cart-btn' onClick={(event) => addToCartHandle()}>Add to Cart</button>
                                    :
                                    <button className='cart-btn' onClick={() => goToCartHandler()}>Go to Cart</button>
                                )
                                :
                                <button className='cart-btn'>Out of Stock</button>
                            }
                        </div>
                    </div>
                    <div className="product-details-container">
                        <p className='brandName'>{product.brand}</p>
                        <h3 className='product-title'>{product.title}</h3>
                        <p className='product-price-details'><span><MdCurrencyRupee /></span>{product.price}</p>
                        <p className='brandName'>Select Your Size</p>
                        <div className="size-buttons">
                            {[5, 6, 7, 8, 9, 10].map((size) => {
                                return <div key={size} className='radio-btn-box'>
                                    <input type="radio" name="shoesSize" id={size} value={size} onChange={()=>setSize(size)}/>
                                    <label htmlFor={size}>{size}</label>
                                </div>
                            })}
                        </div>
                        <div className="product-details">
                            <p className='product-details-heading'>Product Details</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Color</td>
                                        <td>{product.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Ideal For</td>
                                        <td>{product.idealFor}</td>
                                    </tr>
                                    <tr>
                                        <td>Category</td>
                                        <td>{product.category}</td>
                                    </tr>
                                    <tr>
                                        <td>Brand</td>
                                        <td>{product.brand}</td>
                                    </tr>
                                    <tr>
                                        <td>Model</td>
                                        <td>{product.model}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                :
                <Loader />
            }
        </div>
    );
}

export default Product;