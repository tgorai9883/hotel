import React from "react";
import { Dropdown } from "react-bootstrap";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout(){
    localStorage.removeItem('currentUser');
    window.location.href='/login';
  }
  return (
    <div className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            HotelWith
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            {user ? (
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <i className="fa-solid fa-user"></i> {user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="/login">
                    Login
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
