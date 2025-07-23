import React from 'react';
import './BlogDetails.css';
import gadgetsImage from '../assets/OIF.jpg'; // replace with your actual image file

const GadgetsGuide = () => (
  <div className="blog-details-container">
    <h1 className="blog-details-title">Top 10 Must-Have Gadgets</h1>
    <img src={gadgetsImage} alt="Must-Have Gadgets" className="blog-details-image" />
    <div className="blog-details-content">
      <p>
        In a world driven by technology, the right gadgets can make life easier, smarter, and more fun.
        Whether you're a tech enthusiast or a casual shopper, here’s our curated list of top 10 gadgets you shouldn’t miss!
      </p>
      <ol>
        <li><strong>Wireless Earbuds</strong> – Enjoy music and calls with complete freedom.</li>
        <li><strong>Smart Watch</strong> – Track your health, manage notifications, and more on your wrist.</li>
        <li><strong>Portable Bluetooth Speaker</strong> – Bring the party anywhere with powerful sound.</li>
        <li><strong>Power Bank</strong> – Stay charged on the go with high-capacity options.</li>
        <li><strong>Smart Home Assistant</strong> – Control lights, music, and get updates with your voice.</li>
        <li><strong>Streaming Stick</strong> – Turn any TV into a smart entertainment hub.</li>
        <li><strong>Fitness Tracker</strong> – Monitor your steps, sleep, and heart rate in real time.</li>
        <li><strong>Multi-Port USB Hub</strong> – Connect all your devices in one place.</li>
        <li><strong>Mini Projector</strong> – Enjoy a cinematic experience anywhere.</li>
        <li><strong>Wireless Charger</strong> – Ditch the cables for fast, clean charging.</li>
      </ol>
      <p>
        These gadgets are not just cool—they're practical tools for your everyday lifestyle.
        Upgrade your tech game today! ⚙️📱
      </p>
    </div>
  </div>
);

export default GadgetsGuide;
