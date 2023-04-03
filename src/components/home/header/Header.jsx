import React from "react";
import { NavLink } from "react-router-dom";
import location from '../../../images/location.jpg';
import arrowDown from '../../../images/arrowDown.png';

const  Header = () => {
  return (
      <header className="header-home">
        <figure>
          <img src={location} alt="position" />
          <div>
            <p>DELIVER TO</p>
            <NavLink className="address-selected" to="/address">
              <span>882 Well St, New-York</span>
              <img src={arrowDown} alt="arrow" />
            </NavLink>
          </div>
        </figure>
      </header>
  );
}

export default Header;