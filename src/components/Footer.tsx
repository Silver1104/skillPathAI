import React from 'react';
import '../css/Footer.css'; // Ensure you create this CSS file

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} skillPath.AI</p>
      </div>
    </footer>
  );
};

export default Footer;