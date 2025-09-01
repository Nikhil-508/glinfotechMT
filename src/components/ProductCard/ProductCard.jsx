import React from "react";
import "./ProductCard.css";

export default function ProductCard({
  title,
  price,
  image,
  rating = 0,          // 0–5 float
  ratingCount = 0,     // number
  variantsText = "5 types of shoes available",
  currency = "₹",
  onAddToCart = () => {},
  onAddShortlist = () => {},
  shortlisted = false,
}) {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const fillPct = (safeRating / 5) * 100;

  return (
    <div className="pc-card" role="article" aria-label={title}>
      <button
        className={`pc-like ${shortlisted ? "is-active" : ""}`}
        onClick={onAddShortlist}
        aria-label={shortlisted ? "Remove from shortlist" : "Add to shortlist"}
        type="button"
      >
        {/* Heart outline */}
        <svg viewBox="0 0 24 24" className="pc-like-icon" aria-hidden="true">
          <path d="M12.1 20.3c-.3.2-.9.2-1.2 0C6.1 16.9 3 14.2 3 10.8 3 8.2 5.1 6 7.8 6c1.5 0 3 .7 4.2 1.9C13.2 6.7 14.7 6 16.2 6 18.9 6 21 8.2 21 10.8c0 3.4-3.1 6.1-7.9 9.5z" />
        </svg>
      </button>

      <div className="pc-media">
        <img src={image} alt={title} loading="lazy" />
      </div>

      <div className="pc-body">
        <div className="pc-row">
          <h3 className="pc-title" title={title}>{title}</h3>
          <div className="pc-price">
            <span className="pc-currency">{currency}</span>{" "}
            {Number(price)?.toFixed(2)}
          </div>
        </div>

        <p className="pc-variants">{variantsText}</p>

        <div className="pc-rating-row">
          <div className="pc-star-rating" aria-label={`${safeRating} out of 5`}>
            <div className="pc-stars pc-stars-bg">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={`bg-${i}`} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <div className="pc-stars pc-stars-fill" style={{ width: `${fillPct}%` }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={`fg-${i}`} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>
          <span className="pc-rating-count">({ratingCount})</span>
        </div>

        <div className="pc-actions">
          <button className="pc-btn pc-btn-primary" onClick={onAddToCart} type="button">
            Add To Cart
          </button>
          <button className="pc-btn pc-btn-outline" onClick={onAddShortlist} type="button">
            Add Shortlist
          </button>
        </div>
      </div>
    </div>
  );
}
