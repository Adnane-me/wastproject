import React from "react";
import "./Navbar.css";

const NAVBAR = () => {
  return (
    <nav className="top-menu">
      <ul>
        <li>Postcode</li>
        <li>Waste Type</li>
        <li>Select Tip</li>
        <li>Permit Check</li>
        <li>Choose Date</li>
        <li>Payment</li>
      </ul>
    </nav>
  );
};

export default NAVBAR;
