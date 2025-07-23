import React from 'react';
import './BlogDetails.css';
import  warehouseImage from '../assets/1us-e-commerce-advertising-banners-editable.jpg';

const BehindTheScenes = () => (
  <div className="blog-details-container">
    <h1 className="blog-details-title">Behind the Scenes at SuperKart</h1>
    <img src={warehouseImage} alt="Inside SuperKart Operations" className="blog-details-image" />
    <div className="blog-details-content">
      <p>
        At SuperKart, we're more than just an online store — we’re a well-oiled machine driven by technology,
        people, and a mission to deliver delight at your doorstep. But how do we manage thousands of orders,
        fast delivery, and excellent quality every day? Let’s take a peek behind the curtain!
      </p>

      <h3>🚚 Our Logistics Magic</h3>
      <p>
        From AI-powered warehousing to real-time delivery tracking, our logistics team ensures your orders move
        swiftly from shelves to your home. Every second counts, and we’ve optimized every step.
      </p>

      <h3>📦 Curated Inventory</h3>
      <p>
        Our buying team works with top-rated suppliers and brands, ensuring only genuine, high-quality products
        make it to our store. Every product on SuperKart passes rigorous checks.
      </p>

      <h3>🧑‍💻 Tech That Powers Everything</h3>
      <p>
        Our smart backend systems predict demand, manage stocks, and personalize your shopping experience.
        SuperKart isn’t just fast — it’s intelligent.
      </p>

      <h3>💬 Customer Happiness First</h3>
      <p>
        Our support team is available 24/7 to answer questions, resolve issues, and make sure you're 100% satisfied.
        Because at SuperKart, every customer is a priority.
      </p>

      <p>
        From seamless shopping to lightning delivery — it's all designed to make your life easier. ❤️🛒
        Thank you for being a part of our journey!
      </p>
    </div>
  </div>
);

export default BehindTheScenes;