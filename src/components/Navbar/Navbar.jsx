import React from 'react'
import './Navbar.css'
import { SlHandbag } from 'react-icons/sl'
import { Assets } from '../Assets/Assets'


const Navbar = () => {
  return (
    <div className='navbar-container'>
      <div className='navbar-content-container'>
        <div className='left-content-container'>
            <h1>FashionHub</h1>
            <ul>
                <li>Category</li>
                <li>Brand</li>
                <li>Contact</li>
                <li>FAQ's</li>
            </ul>
        </div>
        <div className='right-content-container'>
            <div className='cart-section-container'>
                <SlHandbag />
                <h3>3</h3>
            </div>
            <div className='profile-section-container'>
                <img src={Assets.profileImage} alt="user-image" />
                <div className='name-section'>
                    <h3>Good morning</h3>
                    <h2>user name</h2>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
