import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Address.css';
import noAddress from '../Assets/noAddress.png';
import { useNavigate } from 'react-router-dom';
import AddressCard from '../Components/AddressCard';
import { setOrderAddress } from '../redux/orderSlice';
import logo from '../Assets/logo.png';
import { clearCart } from '../redux/cartSlice';

function Address() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, totalAmount, address, paymentStatus } = useSelector(state => state.order);
    const { isLoggedIn, token } = useSelector(state => state.auth);
    const [add, setAdd] = useState([]);
    const [selectAdd, setSelectAdd] = useState();
    function addressSelectHandle(add) {
        setSelectAdd(add);
    }
    async function paymentHandler() {
        if (!selectAdd) {
            toast.error("Please Select Address");
            return;
        }
        dispatch(setOrderAddress(selectAdd));
        let myOrder;    
        const load = toast.loading("Please Wait");

        await axios.post(`${process.env.REACT_APP_SERVER_URL}/checkout`,
            { totalAmount, token, products, address:selectAdd },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then((res) => {
            myOrder = res.data.order;
            // console.log(res);
        }).catch((error) => {
            toast.error("Internal Server Error");
            console.log(error);
        }).finally(() => {
            toast.dismiss(load);
        })
        console.log(myOrder);
        if (!window.Razorpay) {
            toast.error("Razorpay SDK not loaded");
            return;
        }
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: myOrder.amount,
            currency: "INR",
            name: "Urban Sole",
            description: "Test Transaction",
            image: logo,
            order_id: myOrder.id,
            callback_url: `${process.env.REACT_APP_SERVER_URL}/paymentVerification`,
            prefill: {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#4e00ff"
            }

        };

        const razor = new window.Razorpay(options);
        razor.open();
        dispatch(clearCart());
    }
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
        const load = toast.loading("Please Wait");
        axios.get(`${process.env.REACT_APP_SERVER_URL}/myAccount`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }).then((res) => {
                setAdd(res.data.myAccount.address)
            }).catch((error) => {
                toast.error("Internal Server Error");
                console.log("Error in Fetching Address: ", error);
            }).finally(() => {
                toast.dismiss(load);
            })
    }, [])
    return (
        <div className='select-address-container'>
            <h3>Select Address and Proceed to Payment Page</h3>
            {add && add.length <= 0
                ?
                <div className='no-address-found'>
                    <img src={noAddress} alt="No Address Found" />
                    <p>No Address Found</p>
                    <button onClick={() => navigate('/user/addAddress')}>Add New Address</button>
                </div>
                :
                <>
                    <div className='address-container'>
                        {
                            add.map((address) => {
                                return <div key={address._id} className='select-add-card'>
                                    <input type="radio" name="address" id={address._id} onChange={() => addressSelectHandle(address)} />
                                    <label htmlFor={address._id}>
                                        <AddressCard address={address} />
                                    </label>
                                </div>
                            })
                        }
                    </div>
                    <div className='add-add-btn'>
                        <button onClick={() => navigate('/user/addAddress')}>Add new Address</button>
                    </div>
                    <div className='proceed-next-button-container'>
                        <button onClick={paymentHandler}>Proceed To Payment</button>
                    </div>
                </>
            }
        </div>
    );
}

export default Address;