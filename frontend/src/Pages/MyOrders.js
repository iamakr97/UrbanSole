import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';
import './MyOrders.css';
import no_orders from '../Assets/no_orders.png';
import OrderCard from '../Components/OrderCard';

function MyOrders() {
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  const [myOrders, setMyOrders] = useState();
  async function fetchMyOrders() {
    const load = toast.loading("Please Wait");
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/myOrders`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then((res) => {
        setMyOrders(res.data.myOrders);
      }).catch((error) => {
        console.log("Error in Fetchin Orders: ", error);
        toast.error("Error in fetching Orders");
      }).finally(() => {
        toast.dismiss(load);
      })
  }
  useEffect(() => {
    fetchMyOrders();
  }, [])
  return (
    <div className='myOrders-container'>
      {!myOrders
        ?
        <Loader />
        : (myOrders.length <= 0
          ?
          <div className='no-order'>
            <img src={no_orders} alt="No Orders" />
            <h3>No Orders Yet...</h3>
            <button onClick={() => navigate('/')}>Shop Now</button>
          </div>
          :
          <div>
            {myOrders.map((order) => {
              return <OrderCard key={order._id} order={order} />
            })

            }
          </div>

        )
      }
    </div>
  )
}

export default MyOrders;