import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles/NavBar.css";


function NavBar() {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Noticias y clima
            <i className="fas fa-heart"></i>
          </NavLink>
          

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/NoticiasClima"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Buscar clima y noticias
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Busquedas"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Busquedas recientes
              </NavLink>
            </li>
            
            
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;