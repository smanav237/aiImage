import React from 'react'
import {Link} from "react-router-dom"
import { logo } from '../assets'

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="logo" className="nav-logo" />
      </Link>
      <Link to="/create-post"><button className="button is-responsive nav-button">Create</button></Link>
      </div>
  )
}

export default Navbar