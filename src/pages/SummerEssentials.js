import React from 'react';
import './BlogDetails.css';
import summerImage from '../assets/3921a153715ad0da8531232786507d6f.jpg';

const SummerEssentials = () => (
  <div className="blog-details-container">
    <h1 className="blog-details-title">Top 10 Summer Essentials</h1>
    <img src={summerImage} alt="Summer Essentials" className="blog-details-image" />
    <div className="blog-details-content">
      <p>
        Get ready to breeze through summer with this curated list of essentials. Whether you're hitting the beach or just enjoying the sun, these must-haves will keep you cool, stylish, and refreshed all season long.
      </p>
      <ol>
        <li>
          <strong>Sunscreen (SPF 50+)</strong> – Protect your skin from harmful UV rays with a water-resistant, broad-spectrum sunscreen.
        </li>
        <li>
          <strong>Insulated Water Bottle</strong> – Stay hydrated all day with a leak-proof, BPA-free bottle that keeps drinks cold for hours.
        </li>
        <li>
          <strong>Polarized Sunglasses</strong> – Shield your eyes from glare while adding a touch of style.
        </li>
        <li>
          <strong>Lightweight Cotton T-Shirts</strong> – Breathable and comfortable fabrics to keep you fresh in the heat.
        </li>
        <li>
          <strong>UV Protection Hat</strong> – Wide-brimmed or baseball caps to block direct sunlight.
        </li>
        <li>
          <strong>Cooling Towels</strong> – Reusable towels that provide instant cooling when soaked in water.
        </li>
        <li>
          <strong>Portable Fan or Neck Fan</strong> – Rechargeable fans that are perfect for travel or lounging.
        </li>
        <li>
          <strong>Aloe Vera Gel</strong> – A soothing remedy for sunburn and skin irritation.
        </li>
        <li>
          <strong>Swimwear</strong> – Stylish and comfortable options for the beach or pool.
        </li>
        <li>
          <strong>Beach Bag</strong> – Spacious and sand-proof for carrying all your essentials.
        </li>
      </ol>
      <p>
        Pack these essentials and make your summer unforgettable. ☀️🌴
      </p>
    </div>
  </div>
);

export default SummerEssentials;
