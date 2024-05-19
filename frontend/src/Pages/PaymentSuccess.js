import React from 'react';
import successIcon from '../Assets/success-icon.png';
import './PaymentSuccess.css';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const navigate = useNavigate();
  function goToOrders() {
    navigate('/myOrders');
  }
  function goToHomePage() {
    navigate('/');
  }
  return (
    <div className='payment-success'>
      <h1>Ordered Successfully</h1>
      <img src={successIcon} alt="Success" />
      <button onClick={goToOrders}>Go to Orders</button>
      <button onClick={goToHomePage}>Home Page</button>
    </div>
  );
}

export default PaymentSuccess;