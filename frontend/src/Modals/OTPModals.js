import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './OTPModals.css';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import toast from 'react-hot-toast';
import ButtonLoader from '../Components/ButtonLoader';
import { useNavigate } from 'react-router-dom';

function OTPModals({ otpModal, setOtpModal, signupData }) {
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [otp, setOtp] = useState('');
  if (otpModal === false) return null;

  async function otpSubmitHandler(e) {
    e.preventDefault();
    if(buttonLoading) {
      return;
    }
    if (otp === '') {
      toast.error("Please Enter OTP");
      return;
    }
    const userData = {
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      otp: otp
    }
    setButtonLoading(true);
    const load = toast.loading("Please wait,Verifying OTP")
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, userData,
      {
        withCredentials: true
      }).then((res) => {
        console.log(res);
        toast.success("User Registerd Successfully");
        setOtp('');
        navigate('/login');
        
      }).catch((err) => {
        console.log("error : ", err.response.status);
        if (err.response.status === 401) {
          toast.error("Incorrect OTP");
          return;
        }
        if(err.response.status===500) {
          toast.error("Internal Server Error");
          return;
        }
      }).finally(() => {
        toast.dismiss(load);
        setButtonLoading(false);
        setOtp('');
      })
  }
  return ReactDOM.createPortal(
    <div className='otp-model-container'>
      <div className='otp-box'>
        <button onClick={() => setOtpModal(false)} className='cutbtn'><RxCross2 /></button>
        <div>
          <h3>Email Verification</h3>
          <p>A six digit OTP sent to your Email, Please Enter below to verify your Email</p>
        </div>
        <form onSubmit={otpSubmitHandler} autoComplete='off'>
          <input
            type="text"
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            className='otp-input-box'
          />
          <button type="submit" className={buttonLoading ? 'otp-submit-btn btn-clicked' : 'otp-submit-btn'} disabled={buttonLoading}>
            {buttonLoading
              ?
              <ButtonLoader />
              :
              <span>Submit</span>
            }
          </button>
        </form>
      </div>
    </div>
    ,
    document.getElementById('modal')
  );
}

export default OTPModals;