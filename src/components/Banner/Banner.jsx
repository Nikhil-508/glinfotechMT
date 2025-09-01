import React from "react";
import "./Banner.css";
import { Assets } from "../Assets/Assets";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-text">
        <h2>Grab Upto 50% Off On Selected Headphone</h2>
        <button>Buy Now</button>
      </div>
      <div className="banner-image">
        <img 
          src={Assets.bannerImage} 
          alt="Headphone Offer" 
        />
      </div>
    </div>
  );
};

export default Banner;
