import React from "react";
import { useSearchParams } from "react-router-dom";
import "./PaymentPaid.css";
import { assets } from "../../assets/assets";

const PaymentPaid = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  return (
    <div className="paymentverify">
      <img src={assets.tick} alt=""></img>
      <h1>Order Successfull</h1>
      <p>Reference No. {reference}</p>
    </div>
  );
};

export default PaymentPaid;
