import React from "react";
import { useState } from "react";
import { assets } from "../../assets/assets";
import "./SignUp.css";
import axios from "axios";

const SignUp = ({ setShowSignUp }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSignUp = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/register",
        data
      );

      if (response.data.success) {
        // Save data to localStorage after successful signup (if needed)
        localStorage.setItem("userData", JSON.stringify(data));
        alert("Sign-up successful!");
        setShowSignUp(false); // Close the sign-up modal
      } else {
        alert(response.data.message); // Display backend error message
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Sign-up failed. Please try again.");
    }
  };

  return (
    <div className="sign-up">
      <form onSubmit={onSignUp} className="sign-up-container">
        <div className="sign-up-head">
          <h2>Join Us!</h2>
          <img
            onClick={() => setShowSignUp(false)}
            src={assets.cross_icon}
            alt=""
          ></img>
        </div>
        <div className="sign-up-inputs">
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="name"
            placeholder="Enter Full Name"
            required
          ></input>
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter Your E-mail"
            required
          ></input>
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Create Password"
            required
          ></input>
        </div>
        <button type="submit">Sign Up</button>
        <div className="sign-save">
          <input type="checkbox"></input>
          <h5>Save login info</h5>
        </div>
        </form>
      </div>
  
  );
};

export default SignUp;
