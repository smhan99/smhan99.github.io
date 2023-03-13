import React from 'react';
import { Link } from "react-router-dom";
import "../styles/Navbar.css"

function NavBar() {
  return (
    <div className='navbar'>
      <div className="links">
        <Link to="/"> Home </Link>
        <Link to="/bio"> About Me </Link>
        <Link to="/projects"> Projects </Link>
        <Link to="/experience"> Experience </Link>
      </div>
    </div>
  )
}

export default NavBar