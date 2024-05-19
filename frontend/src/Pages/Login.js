import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import LoginImage from '../Assets/LoginImage.png';
import ButtonLoader from '../Components/ButtonLoader';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [loginData, setLogindata] = useState({
        email: "",
        password: ""
    });
    const { isLoggedIn } = useSelector(state => state.auth);
    useEffect(() => {
        console.log(isLoggedIn)
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn])
    function changeHandler(e) {
        setLogindata(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }
    function loginHandler(e) {
        e.preventDefault();
        if(buttonLoading) {
            return;
        }
        if (loginData.email === '' || loginData.password === '') {
            toast.error("Fill all the Details");
            return;
        }
        setButtonLoading(true);
        const load = toast.loading("Please Wait...");
        axios.post(`${process.env.REACT_APP_SERVER_URL}/login`,
            {
                email: loginData.email,
                password: loginData.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(login(response.data));
                    window.localStorage.setItem("token",response.data.token);
                    // console.log(window.localStorage.getItem("token"));
                    toast.success("LoggedIn Successfully");
                    setLogindata(
                        {
                            email: "",
                            password: "",
                        }
                    );
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    toast.error("Please fill all the details... ");
                    return;
                }
                if (err.response.status === 400) {
                    toast.error("User not found");
                    return;
                }
                if (err.response.status === 500) {
                    toast.error("Something Went Wrong, Please try again");
                    return;
                }
            }).finally(() => {
                toast.dismiss(load);
                setButtonLoading(false);
            })
    }
    return (
        <div className='signupFormContainer'>

            <form onSubmit={loginHandler} className='form-container'>
                <h2 className='form-heading'>Enter Details for Login</h2>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter Your Email'
                    value={loginData.email}
                    onChange={changeHandler}
                    autoComplete='off'
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder='Enter Password'
                    value={loginData.password}
                    onChange={changeHandler}
                    autoComplete='off'
                />
                <button type="submit" className='signup-btn'>
                    {buttonLoading
                        ?
                        <ButtonLoader />
                        :
                        <span>Login</span>
                    }
                </button>
                <Link to='/signup' className='btn2 signup-btn'>Signup</Link>
            </form>
            <div className='signup-image'>
                <img src={LoginImage} alt="Login Here" />
            </div>
        </div>
    )
}

export default Login;