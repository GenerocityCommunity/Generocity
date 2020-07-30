import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  console.log('Navbar isLoggedIn ->', props.isLoggedIn);
  /*---Navbar Logged Out ---- */
  if (!props.isLoggedIn) {
    return (
      <nav
        className="navbar navbar-expand-md navbar-light"
        style={{ backgroundColor: '#e4f3fe' }}
      >
        <NavLink to="/" className="nav-brand">
          <a className="navbar-brand" href="#" style={{ letterSpacing: '2px' }}>
            genero
            <span style={{ color: 'gray', letterSpacing: '3px' }}>city</span>
          </a>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            </li>

            <div id="filterBox">
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                name="itemCategory"
                onChange={(e) => {
                  props.handleFilterChange(e);
                }}
              >
                <option>Category</option>
                <option value="">All</option>
                <option value="Appliances">Appliances</option>
                <option value="Plants">Plants</option>
                <option value="Sports">Sports</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-link"
                style={{ marginRight: '10px' }}
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/signup" className="nav-link">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  /*---Navbar Logged In ---- */
  if (props.isLoggedIn) {
    return (
      <nav
        className="navbar navbar-expand-md navbar-light"
        style={{ backgroundColor: '#e4f3fe' }}
      >
        <NavLink to="/" className="nav-brand">
          <a className="navbar-brand" href="#" style={{ letterSpacing: '2px' }}>
            genero
            <span style={{ color: 'gray', letterSpacing: '3px' }}>city</span>
          </a>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            </li>

            <div id="filterBox">
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                name="itemCategory"
                onChange={(e) => {
                  props.handleFilterChange(e);
                }}
              >
                <option>Category</option>
                <option value="">All</option>
                <option value="Appliances">Appliances</option>
                <option value="Plants">Plants</option>
                <option value="Sports">Sports</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* sets isLoggedIn to false and redirects to / */}
              <NavLink to="/" className="nav-link">
                <div
                  className="nav-link"
                  className="logout"
                  onClick={props.handleLogoutSubmit}
                >
                  LogOut
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Navbar;
