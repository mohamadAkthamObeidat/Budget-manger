import React from "react";
import { Link } from "react-router-dom";
import "../../Style/SideBar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <li>
        <img className='logo-img' src={require('../../Assets/Logo.svg')} alt=""/>
        <br></br>
        <span className='logo-txt'>Budget Manager</span>
      </li>
      <li className="items">
        <Link to="/dashboard">
          {" "}
          <img
            className="icons"
            src={require("../../Assets/chart.svg")}
            alt=""
          />{" "}
          <span className="nav-item-txt">Dashboard</span>
        </Link>
      </li>
      <li className="items">
        <Link to="/Search">
          {" "}
          <img
            className="icons"
            src={require("../../Assets/accounting.svg")}
            alt=""
          />
          <span className="nav-item-txt">Search</span>
        </Link>
      </li>
      <li className="items">
        <Link to="/settings">
          {" "}
          <img
            className="icons"
            src={require("../../Assets/gears.svg")}
            alt=""
          />
          <span className="nav-item-txt">Settings</span>
        </Link>
      </li>

      <li className="logout">
        <Link to="/login">
          <button className="logout button">LOGOUT</button>
        </Link>
      </li>
    </nav>
  );
};

export default Sidebar;
