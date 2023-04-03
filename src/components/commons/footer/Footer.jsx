import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
        <figure>
            <NavLink
            to="/"
            className={({ isActive }) =>
                isActive ? "selected link-footer home" : "link-footer home"
            }
            >
            </NavLink>
        </figure>
        <figure>
            <NavLink
            to="/search"
            className={({ isActive }) =>
                isActive ? "selected link-footer search" : "link-footer search"
            }
            >
            </NavLink>
        </figure>
        <figure>
            <NavLink
            to="/orders"
            className={({ isActive }) =>
                isActive ? "selected link-footer order" : "link-footer order"
            }
            >
            </NavLink>
        </figure>
        <figure>
            <NavLink
            to="/profile"
            className={({ isActive }) =>
                isActive ? "selected link-footer profile" : "link-footer profile"
            }
            >
            </NavLink>
        </figure>
    </footer>
  );
};

export default Footer;
