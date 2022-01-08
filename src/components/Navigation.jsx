import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import photo from "../assets/photo.svg";
import { NavDropdown } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

const Navigation = () => {
  const { currentUser } = useAuthContext();
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Link to={`/`} className="navbar-brand">
          <img src={photo} alt="Logo" style={{ width: 30 }} className="mx-2" />
          Photo-Review App
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to={`/`} className="nav-link">
              Home
            </NavLink>
            {currentUser ? (
              <>
                <NavLink to={`/all-albums`} className="nav-link">
                  All albums
                </NavLink>

                <NavDropdown
                  title={currentUser.displayName || currentUser.email}
                  id="basic-nav-dropdown"
                >
                  <NavLink to={`/logout`} className="dropdown-item">
                    Log Out
                  </NavLink>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink to={`/login`} className="nav-link">
                  Login
                </NavLink>
                <NavLink to={`/signup`} className="nav-link">
                  Signup
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
