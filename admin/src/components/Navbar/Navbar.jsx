import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import {useNavigate}from 'react-router-dom'
const Navbar = ({token,setToken}) => {
  return (
    <div className='navbar'> 
      <img className='logo' src={assets.logo} alt="" />
      <div className='navbar-profile'>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
    </div>
  )
}

export default Navbar
