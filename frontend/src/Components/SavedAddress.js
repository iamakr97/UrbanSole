import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import noAddress from '../Assets/noAddress.png';
import { useNavigate } from 'react-router-dom';
import AddressCard from '../Components/AddressCard';

function SavedAddress() {
    const navigate = useNavigate();
    const { isLoggedIn, token } = useSelector(state => state.auth);
    const [address, setAddress] = useState([]);
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
                setAddress(res.data.myAccount.address)
            }).catch((error) => {
                toast.error("Internal Server Error");
                console.log("Error in Fetching Address: ", error);
            }).finally(() => {
                toast.dismiss(load);
            })
    }, [])
    return (
        <div className='select-address-container'>
            <h3>Saved Address</h3>
            {address && address.length <= 0
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
                            address.map((address) => {
                                return <div key={address._id}>
                                    <AddressCard address={address} />
                                </div>
                            })
                        }
                    </div>
                    <div className='add-add-btn'>
                        <button onClick={() => navigate('/user/addAddress')}>Add new Address</button>
                    </div>
                </>
            }
        </div>
    );
}

export default SavedAddress;