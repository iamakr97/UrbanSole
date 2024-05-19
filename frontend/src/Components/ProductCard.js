import React, { useState } from 'react'
import { MdCurrencyRupee } from "react-icons/md";
import './ProductCard.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCartHandler } from '../Utils/CartUtils';
import ShoesSizeModal from '../Modals/ShoesSizeModal';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sizeModal, setSizeModal] = useState(false);

    const { items } = useSelector((state) => state.cart);
    const { isLoggedIn, token } = useSelector((state) => state.auth);

    function isInCart(id) {
        return items.includes(id);
    }
    function handleAddToCart(event) {
        event.stopPropagation();
        if (!isLoggedIn) {
            toast.error("Login to Add items in Cart");
            return;
        }
        setSizeModal(true);
    }


    function productCardClickHandler() {
        navigate(`/product/${product._id}`);
    }
    return (
        <>
            <div className='product-card' onClick={productCardClickHandler}>
                <img src={product.image[0]} />
                <p className='brandName'>{product.brand}</p>
                <p className='product-title'>
                    {((product.title).length > 20)
                        ?
                        `${product.title.substr(0, 19)}...`
                        :
                        product.title
                    }
                </p>
                <p className='product-price'> <span><MdCurrencyRupee /></span> {product.price}</p>
                {(product.quantity > 0)
                    ?
                    (!isInCart(product._id)
                        ?
                        <button className='cart-btn' onClick={(event) => handleAddToCart(event)}>Add to Cart</button>
                        :
                        <button className='cart-btn' onClick={(event) => removeFromCartHandler(product._id, event, token, isLoggedIn, dispatch)}>Remove from Cart</button>
                    )
                    :
                    <button className='cart-btn'>Out of Stock</button>
                }

            </div>
            <ShoesSizeModal sizeModal={sizeModal} setSizeModal={setSizeModal} productId={product._id} />
        </>

    )
}

export default ProductCard;