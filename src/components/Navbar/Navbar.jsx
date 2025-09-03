import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { SlHandbag } from 'react-icons/sl'
import { Assets } from '../Assets/Assets'
import { FiMenu, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const {user} = useAuth();

  console.log(user,"userrr")
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);



    useEffect(() => {
      const fetchUserDetails = async () => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, "USERS", user.uid));
            if (userDoc.exists()) {
          console.log(userDoc.data().fullName,"user navbarrrr")

              setName(userDoc.data().fullName || "username")
            } else {
              setError("User data not found");
            }
          } catch (err) {
            console.error("Error fetching user details:", err.message);
            setError("Failed to load user details");
          }
          setLoading(false);
        }
      };
  
      fetchUserDetails();
    }, [user]);

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
          <div
          onClick={() => navigate('/profile')} 
          className='profile-section-container'>
            <img src={Assets.profileImage} alt="user" />
            <div className='name-section'>
              <h3>Good morning</h3>
              <h2>{name}</h2>
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
