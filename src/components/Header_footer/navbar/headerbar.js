import React from "react";
import "./headerbar.css";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import brandLogo from "../../assets/Header & footer/header/medichainlogo.svg";
import { Link } from "react-router-dom";

export default function Headerbar() {
  return (
    <>
      <Navbar className="navbar" sticky="top" expand="lg">
        <Container>
          <NavLink href="/">
            <div className="d-flex">
              <img src={brandLogo} width={40} className="navlogo" />
              <h4 className="ms-3 mt-3 ">MediChain</h4>
            </div>
          </NavLink>

          <NavbarToggle aria-controls="navbar-dark-example" />

          <NavbarCollapse
            id="navbar-dark-example"
            className="justify-content-end fw-bold   "
          >
            <Nav>
              <NavLink href="/">
                <div className="glow-on-hover">Home</div>
              </NavLink>

              <NavLink href="/about">
                <div className="glow-on-hover">About Us</div>
              </NavLink>

              <NavLink href="/owner">
                <div className="glow-on-hover">Owner</div>
              </NavLink>

              <NavLink href="/admin">
                <div className="glow-on-hover">Admin</div>
              </NavLink>

              <NavLink href="/doctor">
                <div className="glow-on-hover">Doctor</div>
              </NavLink>

              <NavLink href="/contact">
                <div className="glow-on-hover">Patient</div>
              </NavLink>

              <NavLink href="/contact">
                <div className="glow-on-hover">Contact US</div>
              </NavLink>
            </Nav>
           
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
}
