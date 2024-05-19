import React, { useEffect } from 'react';
import './AddressCard.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AddressCard({ address }) {
    const navigate = useNavigate();
    const { isLoggedIn, token } = useSelector(state => state.auth);
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    })
    function deleteAddressHandler() {
        if (!isLoggedIn) {
            navigate('/login');
        }
        const load = toast.loading("Please Wait");
        axios.post(`${process.env.REACT_APP_SERVER_URL}/deleteAddress/${address._id}`, { token },
            {
                withCredentials: true
            }
        ).then((res) => {
            console.log(res);
            toast.success("Address Deleted Successfully");
        }).catch((error) => {
            console.log(error);
            toast.error("Internal Server Error");
        }).finally(() => {
            toast.dismiss(load);
        })
    }
    function editAddreddHandler() {

    }
    return (
        <div className='address-card'>
            <table>
                <tbody>
                    <tr>
                        <td>Street</td>
                        <td>{address.street}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{address.city}</td>
                    </tr>
                    <tr>
                        <td>State</td>
                        <td>{address.state}</td>
                    </tr>
                    <tr>
                        <td>Zip Code</td>
                        <td>{address.zipCode}</td>
                    </tr>
                    <tr>
                        <td>Phone NO.</td>
                        <td>{address.phone}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={editAddreddHandler} id='edit-btn-add'>Edit</button>
            <button onClick={deleteAddressHandler} id='delete-btn-add'>Delete</button>
        </div>
    );
}

export default AddressCard;