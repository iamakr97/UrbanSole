import React, { useEffect, useState } from 'react';
import './AddAddress.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddAddress() {
    const navigate = useNavigate();
    const { isLoggedIn, token } = useSelector(state => state.auth);
    useEffect(()=>{
        if(!isLoggedIn) {
            navigate('/login');
        }
    }, [])
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    })
    function changeHandler(e) {
        setAddress((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    function addressSubmitHandler(e) {

        if (address.street == '' || address.city == '' || address.state == '' || address.zipCode == '' || address.phone == '') {
            toast.error("Please Enter All details");
            return;
        }
        e.preventDefault();
        const load = toast.loading("Please Wait");
        axios.post(`${process.env.REACT_APP_SERVER_URL}/addAddress`, address,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(res => {
                // console.log(res);
                setAddress({
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    phone: ''
                })
                toast.success("Address Addes Successfully");
            }).catch((error) => {
                toast.error("Internal Server Error");
                console.log(error);
            }).finally(() => {
                toast.dismiss(load);
            })
    }

    return (
        <div className='add-address-container'>
            <h3>Add New Address </h3>
            <form onSubmit={addressSubmitHandler}>
                <input
                    type="text"
                    placeholder='Enter Street'
                    name='street'
                    value={address.street}
                    onChange={changeHandler}
                    required
                />
                <input
                    type="text"
                    placeholder='Enter City Name'
                    name='city'
                    value={address.city}
                    onChange={changeHandler}
                    required
                />
                <input
                    type="text"
                    placeholder='Enter State Name'
                    name='state'
                    value={address.state}
                    onChange={changeHandler}
                    required
                />
                <input
                    type="number"
                    placeholder='Enter Zip Code'
                    name='zipCode'
                    value={address.zipCode}
                    onChange={changeHandler}
                    required
                />
                <input
                    type="number"
                    placeholder='Enter Phone Number'
                    name='phone'
                    value={address.phone}
                    onChange={changeHandler}
                    required
                />
                <button type="submit">Add Address</button>
            </form>
        </div>
    );
}

export default AddAddress;