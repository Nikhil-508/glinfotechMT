import React, { useState } from 'react'
import './Navbar.css'
import { SlHandbag } from 'react-icons/sl'
import { Assets } from '../Assets/Assets'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className='navbar-container'>
      <div className='navbar-content-container'>
        {/* Left Section */}
        <div className='left-content-container'>
          <h1>FashionHub</h1>

          {/* Desktop Menu */}
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li>Category</li>
            <li>Brand</li>
            <li>Contact</li>
            <li>FAQ's</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className='right-content-container'>
          <div className='cart-section-container'>
            <SlHandbag />
            <h3>3</h3>
          </div>
          <div className='profile-section-container'>
            <img src={Assets.profileImage} alt="user" />
            <div className='name-section'>
              <h3>Good morning</h3>
              <h2>User Name</h2>
            </div>
          </div>

          {/* Hamburger Menu */}
          <div className='hamburger' onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
