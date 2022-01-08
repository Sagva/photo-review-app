import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import photo from "../assets/photo.svg";

const Navigation = () => {
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
            <NavLink to={`/login`} className="nav-link">
              Login
            </NavLink>
            <NavLink to={`/signup`} className="nav-link">
              Signup
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
