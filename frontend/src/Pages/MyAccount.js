import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader';
import './MyAccount.css';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { clearCart } from '../redux/cartSlice';

function MyAccount() {
  const { isLoggedIn, token, role } = useSelector(state => state.auth);
  const [myAccount, setMyAccount] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function fetchMyAccountDetails() {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/myAccount`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      })
      .then((res) => {
        setMyAccount(() => res.data.myAccount);
        setName(res.data.myAccount.name);
        setEmail(res.data.myAccount.email);
        // console.log(res.data.myAccount)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/login');
      return;
    }
    fetchMyAccountDetails();

  }, []);
  const [picEdit, setPicEdit] = useState(false);
  const [profilePic, setProfilePic] = useState();
  function updateProfilePicHandler() {
    if (!profilePic) {
      toast.error('Choose New Image');
      return;
    }
    const formData = new FormData();
    formData.append('file', profilePic);
    const load = toast.loading("Please Wait");
    axios.post(`${process.env.REACT_APP_SERVER_URL}/editProfilePic`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    }).then((res) => {
      toast.success("Profile Updated Successfully");
      setPicEdit(false);
      fetchMyAccountDetails();
    }).catch((error) => {
      toast.error("Something went Wrong...")
    }).finally(() => toast.dismiss(load))

  }
  const [editProfile, setEditProfile] = useState(false);
  const [disable, setDisable] = useState(true);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  function profileEditHandler() {
    setDisable(false);
    setEditProfile(true);
  }
  function saveHandler() {
    if (name === '' || email === '') {
      toast.error("Please fill the Details...");
      return;
    }
    const load = toast.loading("Pleas Wait...");
    axios.post(`${process.env.REACT_APP_SERVER_URL}/editProfile`,
      { name, email },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then((res) => {
        console.log(res);
        toast.success("Profile Updated Successfully");
        fetchMyAccountDetails();
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        toast.dismiss(load);
        setEditProfile(false);
        setDisable(true);
      })

  }

  function logoutHandler() {
    const load = toast.loading("Please Wait...");

    axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(() => {
        dispatch(logout());
        dispatch(clearCart());
        window.localStorage.removeItem('token');
        toast.success("Logged out successfully");
        navigate('/');
      }).catch(() => {
        toast.error("Something went wrong");
      }).finally(() => toast.dismiss(load));
  }
  return (
    <div className='myAccount'>
      {(!myAccount || myAccount === undefined)
        ?
        <Loader />
        :
        <div className='myaccoutn-container'>
          <div className='image-container'>
            <img src={myAccount.profileImage} alt="ProfileImage" height={150} />
            {!picEdit
              ?
              <button onClick={() => setPicEdit(true)} className='editbtn'>Edit</button>
              :
              <div>
                <input type="file" name="file" id="file" onChange={(e) => setProfilePic(e.target.files[0])} />
                <button type="button" onClick={updateProfilePicHandler} className='editbtn'>Save</button>
                <button type='button' onClick={() => setPicEdit(false)} className='editbtn'>Cancle</button>
              </div>
            }
          </div>
          <div className='content-container'>
            <div>
              <input
                type="text"
                name='name'
                id='name'
                value={name}
                disabled={disable}
                className='profileName'
                placeholder='Enter Your Name'
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                name='email'
                id='email'
                value={email}
                disabled={disable}
                placeholder='Enter Your Email'
                onChange={(e) => setEmail(e.target.value)}
                className='emailId'
              />

              <div className="btncontainer">
                {!editProfile
                  ?
                  <button onClick={profileEditHandler} className='editbtn btn2'>Edit Profile</button>
                  :
                  <button onClick={saveHandler} className='editbtn btn2' >Save</button>
                }
              </div>
            </div>
            <div>
              {role === 'Admin' &&
                <Link to='/admin/dashboard' className='cart'>Admin Dashboard</Link>
              }
              <Link to='/cart' className='cart'>My Cart</Link>
              <Link to='/myOrders' className='cart'>My Orders</Link>
              <Link to='/savedAddress' className='cart'>Saved Address</Link>
              <div className='logoutbtncontainer' onClick={logoutHandler}><button className='logoutbtn'>Logout</button></div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default MyAccount;