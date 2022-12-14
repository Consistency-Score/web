import React from "react";
import itr_logo from "../../assets/logos/itr_logo.png";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../../graphql/queries/CurrentUser";


const NavBar = () => {
  const { error, data } = useQuery(CURRENT_USER);
  console.log(data)

  // current user is null because the FE isn't passing the 
  // auth token in the header of the CURRENT_USER request. 
  // console.log(data)
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={itr_logo} alt="logo" />
      </Link>
      {/* {data.currentUser} */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/dash">Dashboard</Link>
      <Link to="/insights">Insights</Link>
      <Link to="/alphatesting">AlphaTesting</Link>
      <Link to="/leaderboard">Leaderboard</Link>

      <a
        className="navbar-url-link"
        href="https://docs.immutabletrackrecord.com/blog"
      >
        Blog
      </a>
      <a className="navbar-url-link" href="https://discord.gg/4JDd83zY6q">
        Discord
      </a>
      <a
        className="navbar-url-link"
        href="https://docs.immutabletrackrecord.com/"
      >
        Docs
      </a>

      <Link to="/signup">Sign Up</Link>
      <Link to="/signin">Log In</Link>
      <Link to="/product-listing">Product Listings</Link>

      <div className="dropdown">
        <button className="dropbtn">
          Account
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <Link to="/connect-broker">Connect Your Broker</Link>
          <Link to="/">Profile</Link>
          <Link to="/admin">Admin Portal</Link>
          <Link to="/logout">Log Out</Link>
          <Link to="/itr-sass">ITR-SASS testing gr</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
