import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="admin-navbar">
      <img className="admin-logo" src={assets.logo}></img>
      <img className="profile-image" src={assets.profile_image}></img>
    </div>
  );
};

export default Navbar;
