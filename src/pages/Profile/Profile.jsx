
import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Assets } from "../../components/Assets/Assets";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    mobile: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "USERS", user.uid));
          if (userDoc.exists()) {
            setUserDetails({
              fullName: userDoc.data().fullName || "N/A",
              email: user.email || "N/A",
              mobile: userDoc.data().mobile || "N/A",
              date: userDoc.data().date || "N/A",
            });
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      {/* Left Side Image */}
      {/* <div className="profile-left">
        <img src={Assets.ProfileImage} alt="profile" />
        <div className="image-text-container">
          <div>
            <SiComma />
            <SiComma />
          </div>
          <span>
            Figma ipsum component variant main layer. Create flatten create effect
            move strikethrough. Union export plugin bullet effect hand arrange
            align. Project project boolean arrow scale. Rectangle device clip hand
            figma content frame underline content.
          </span>
          <h3>Pam Hand</h3>
          <div className="image-text-bottom-container">
            <h3>pam.hand@gmail.com</h3>
            <div>
              <MdKeyboardArrowLeft />
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
      </div> */}

      {/* Right Side Profile Details */}
      <div className="profile-right">
        <div className="profile-box">
          <h2 className="profile-title">Your Profile</h2>
          <p className="profile-subtitle">Manage your account details</p>

          {error && <p className="error">{error}</p>}

          <div className="profile-details">
            <div className="profile-field">
              <label>Full Name</label>
              <p>{userDetails.fullName}</p>
            </div>
            <div className="profile-field">
              <label>Email</label>
              <p>{userDetails.email}</p>
            </div>
            <div className="profile-field">
              <label>Mobile</label>
              <p>{userDetails.mobile}</p>
            </div>
            <div className="profile-field">
              <label>Date of Birth</label>
              <p>{userDetails.date}</p>
            </div>
          </div>

          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
