import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './ShoesSizeModal.css';
import { RxCross2 } from "react-icons/rx";
import { addToCartHandler } from '../Utils/CartUtils';
import { useDispatch, useSelector } from 'react-redux';


function ShoesSizeModal({ sizeModal, setSizeModal, productId }) {
    const { token, isLoggedIn } = useSelector(state => state.auth);
    const [size, setSize] = useState(6);
    const dispatch = useDispatch();
    if (sizeModal === false) return null;
    function submitHandler(e) {
        e.preventDefault();
        addToCartHandler(productId, token, isLoggedIn, size, dispatch, setSizeModal);
    }

    return ReactDOM.createPortal(
        <div className='otp-model-container '>
            <div className="otp-box" id='shoes-select-box'>
                <button onClick={() => setSizeModal(false)} className='cutbtn'><RxCross2 /></button>
                <p>Select Size: </p>
                <form className="size-buttons" onSubmit={submitHandler}>
                    {[5, 6, 7, 8, 9, 10].map((size) => {
                        return <div key={size} className='radio-btn-box'>
                            <input type="radio" name="shoesSize" id={size} value={size} onChange={(e) => setSize(e.target.value)} />
                            <label htmlFor={size}>{size}</label>
                        </div>
                    })}
                    <button type="submit" className='otp-submit-btn'>
                        Add to Cart
                    </button>
                </form>
            </div>
        </div>
        ,
        document.getElementById('modal')
    );
}

export default ShoesSizeModal