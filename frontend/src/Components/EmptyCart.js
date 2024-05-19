import React from 'react'
import emptyCart from '../Assets/EmptyCart.png';
import { useNavigate } from 'react-router-dom';
import './EmptyCart.css';

function EmptyCart(props) {
    const navigate = useNavigate();
    const cartItems = props.cartItems;
    const details = props.details;
    const btnvalue = props.btnvalue;
    function emptyCartClickHandler() {
        if (btnvalue === 'Login') {
            navigate('/login')
        } else {
            navigate('/');
        }
    }
    return (
        <div className='cart-not-login'>
            <img src={emptyCart} alt="Empty Cart" height={200} />
            <p>{cartItems}</p>
            <p id='small-text'>{details}</p>
            <button className='signup-btn' onClick={emptyCartClickHandler}>
                {btnvalue}
            </button>
        </div>
    )
}

export default EmptyCart