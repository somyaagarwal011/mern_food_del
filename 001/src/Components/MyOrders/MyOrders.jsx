import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  const fetchOrders = async (req, res) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/order/userorders",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Full API Response:", response);
      if (response.data && Array.isArray(response.data.orders)) {
        setData(response.data.orders);
      } else if (response.data && response.data.orders) {
        setData(response.data.orders);
      } else {
        console.error("Invalid response format: ", response);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt=""></img>
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>Rs. {order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p className="status">
                <span>&#x25cf;</span><b>{order.status}</b>
                <button onClick={fetchOrders}>Track Order</button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
