import React from 'react';
import './Menu.css';

const Menu = () => {
  return (
    <div className="menu">
      <ul className="menu-items">
        <li className="menu-item">
          <a href="#">Home</a>
        </li>
        <li className="menu-item">
          <a href="#">About</a>
          <ul className="sub-menu">
            <li className="sub-menu-item">
              <a href="#">Company</a>
            </li>
            <li className="sub-menu-item">
              <a href="#">Team</a>
            </li>
            <li className="sub-menu-item">
              <a href="#">Mission</a>
            </li>
          </ul>
        </li>
        <li className="menu-item">
          <a href="#">Services</a>
        </li>
        <li className="menu-item">
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
