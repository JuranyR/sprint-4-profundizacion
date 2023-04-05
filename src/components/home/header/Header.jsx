import React from "react";
import { NavLink } from "react-router-dom";
import location from '../../../images/location.jpg';
import arrowDown from '../../../images/arrowDown.png';
import { useSelector } from "react-redux";

const  Header = () => {
  const { user } = useSelector((store) => store.login);

  return (
      <header className="header-home">
        <figure>
          <img src={location} alt="position" />
          <div>
            <p>DELIVER TO</p>
            <NavLink className="address-selected" to="/address">
              <span>{user.location?user.location[0]:user.location[1]}</span>
              <img src={arrowDown} alt="arrow" />
            </NavLink>
          </div>
        </figure>
      </header>
  );
}

export default Header;