import axios from 'axios';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

export const fetchCartItems = (token, dispatch, setCartItems) => {
    if (!token) {
        return;
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/allCartItems`, { token },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }).then((res) => {
            if (res.status === 200) {
                setCartItems(()=>res.data.allCartItems[0]);
                res.data.allCartItems[0].cartItem.forEach((item) => {
                    dispatch(addToCart(item.products._id));
                });
            }
        }).catch((error) => {
            console.log(error);
        });
};

export const addToCartHandler = (productId, token, isLoggedIn, size, dispatch, setSizeModal) => {

    if (!isLoggedIn) {
        toast.error("Login to Add into Cart");
        return;
    }
    const load = toast.loading("Please Wait...");

    axios.post(`${process.env.REACT_APP_SERVER_URL}/addToCart/${productId}`, { token, size },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }).then((res) => {
            if (res.status === 200) {
                dispatch(addToCart(productId));
                toast.success("Added to Cart");
                setSizeModal(false);
            }
        }).catch((err) => {
            console.log("Error Item to Add in Cart: ", err);
            toast.error("Something Went Wrong");
        }).finally(() => {
            toast.dismiss(load);
        })
};

export const removeFromCartHandler = (productId, event, token, isLoggedIn, dispatch) => {
    event.stopPropagation();
    if (!isLoggedIn) {
        toast.error("Login First...");
        return;
    }
    const load = toast.loading("Please Wait...");

    axios.post(`${process.env.REACT_APP_SERVER_URL}/removeFromCart/${productId}`, { token },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }).then((res) => {
            if (res.status === 200) {
                dispatch(removeFromCart(productId));
                toast.success("Removed from Cart");
            }
        }).catch((err) => {
            console.log("Error in Removing items form Cart: ", err);
            toast.error("Something Went Wrong");
        }).finally(() => {
            toast.dismiss(load);
        })
}
