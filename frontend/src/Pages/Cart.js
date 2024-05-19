import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Cart.css';
import { fetchCartItems, removeFromCartHandler } from '../Utils/CartUtils';
import EmptyCart from '../Components/EmptyCart';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { clearOrderSlice, setOrderProducts } from '../redux/orderSlice';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems(token, dispatch, setCartItems);
  }, [token, dispatch, items]);

  function checkOutHandler() {
    dispatch(clearOrderSlice());
    dispatch(setOrderProducts(cartItems));
    navigate('/user/address');
  }

  return (
    <div>
      {isLoggedIn
        ?
        (!(cartItems.cartItem) || (cartItems.cartItem).length < 1)
          ?
          <EmptyCart cartItems="Cart is Empty" details="" btnvalue="Shop Now" />
          :
          <div className='cart-container'>
            {
              (cartItems.cartItem).map((item) => {
                return <div key={item._id} className='cart-items'>
                  <div className="cart-image">
                    <img src={item.products.image[0]} alt="Product Image" />
                  </div>
                  <div className="cart-item-details">
                    <p className='brandName'>{item.products.brand}</p>
                    <p>{item.products.title}</p>
                    <p>
                      <span>Size: </span>{item.size}
                      <span>, Color: </span>{item.products.color}
                    </p>
                    <div className='cart-quantity'>
                      <p>Quentity</p>
                      <div className='quantity-cont'>
                        <button><CiCircleMinus className='inc-dec-btn' /></button>
                        <p>{item.quantity}</p>
                        <button><CiCirclePlus className='inc-dec-btn' /></button>
                      </div>
                    </div>
                    <div>
                      <p className='product-price'> <span><MdCurrencyRupee /></span> {item.products.price}</p>
                      <button className='remove-btn' onClick={(event) => removeFromCartHandler(item.products._id, event, token, isLoggedIn, dispatch)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              })
            }
            <div className='check-out'>
              <div className="check-out-container">
                <h3>Total Price :  <MdCurrencyRupee /> {cartItems.totalPrice}</h3>
                <div><button className='checkout-btn' onClick={() => checkOutHandler()}>Check Out</button></div>
              </div>
            </div>
          </div>
        :
        <EmptyCart cartItems="Missing Cart Items ?" details="Login to see the items you added previously" btnvalue="Login" />
      }
    </div>
  )
}

export default Cart;