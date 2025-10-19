import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div>
        <Link to="/">Employee Dashboard</Link>
      </div>
      <div>
        <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
        <Link className={location.pathname === "/employee-form" ? "active" : ""} to="/employee-form">Employee Form</Link>
      </div>
    </nav>
  );
};

export default Navbar;
