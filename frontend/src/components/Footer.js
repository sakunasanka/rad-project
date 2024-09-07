import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} School Admin System. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
