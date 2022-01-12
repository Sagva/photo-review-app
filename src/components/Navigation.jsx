import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import photo from "../assets/photo.svg";
import { NavDropdown } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

const Navigation = () => {
  const { currentUser } = useAuthContext();
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Link
          to={currentUser ? `/all-albums` : `/login`}
          className="navbar-brand"
        >
          <img src={photo} alt="Logo" style={{ width: 30 }} className="mx-2" />
          Photo-Review App
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {location.pathname.includes("/album/") && !currentUser ? (
              <></>
            ) : (
              <>
                {currentUser ? (
                  <>
                    <NavLink to={`/all-albums`} className="nav-link">
                      All albums
                    </NavLink>

                    <NavDropdown
                      title={currentUser.email}
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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
