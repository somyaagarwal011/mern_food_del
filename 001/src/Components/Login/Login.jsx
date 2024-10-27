import React from "react";
import { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reduxSlice/AuthSlice";

const Login = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/login",
        data
      );
      console.log(response.data);
      if (response.data.success) {
        dispatch(setToken(response.data.token));
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login. Please try again.");
    }
  };
  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-container">
        <div className="login-head">
          <h2>Welcome Back!</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          ></img>
        </div>
        <div className="login-inputs">
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="E-mail"
            required
          ></input>
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="login-save">
      </div>
    </div>
  );
};

export default Login;
