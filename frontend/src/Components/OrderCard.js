import React, { useEffect } from 'react';
import './OrderCard.css';


function OrderCard({ order }) {
  useEffect(() => {
    console.log(order);
  }, []);
  return (
    <div className='order-card-container'>
      <p id='order-id'>Order Id: <span>{order._id}</span></p>
      <div className='order-per-card'>
        {(order.products).map((pro) => {
          return <div key={pro._id} className='order-pro-card'>
            <div className='order-card-image'>
              <img src={pro.product.image[0]} alt="Product Image" />
            </div>
            <div className='order-card-desc'>
              <p>{pro.product.title}</p>
              <p>Size: <span>{pro.size}</span></p>
              <p>Color: <span>{pro.color}</span></p>
              <p>Price: <span>{pro.price}</span></p>
            </div>
          </div>
        })}
      </div>
      <div>
      <h3>Address </h3>
        <p>Street: <span>{order.address.street}</span></p>
        <p>City: <span>{order.address.city}</span></p>
        <p>State: <span>{order.address.state}</span></p>
        <p>Zip Code: <span>{order.address.zipCode}</span></p>
        <p>Phone No: <span>{order.address.phone}</span></p>
      </div>
      <h3>Total Amount: <span>{order.totalAmount}</span></h3>
      <h3>Status: <span>{order.status}</span></h3>
    </div>
  );
}

export default OrderCard;