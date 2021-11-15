import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { FaBars, FaTimes } from "react-icons/fa";

function NavBar({ user, setUser }) {
  const [click, setClick] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            TODOLOO
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {!user && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Home
                </NavLink>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Login
                </NavLink>
              </li>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/dashboard"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/lists"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Lists
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/friends"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Friends
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    activeClassName="active"
                    className="nav-links"
                    onClick={logout}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
