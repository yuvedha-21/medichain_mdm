import React from 'react'
import "./headerbar.css"
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
// import brandLogo from "../../asssets/Header&Footer/Logo-01.svg";
import { Link } from "react-router-dom";


export default function Headerbar() {
  return (
    <>
     <Navbar className="navbar" sticky="top" expand="lg">
        <Container >
          <NavLink href="/">
            <div className="d-flex">
            {/* <img src={brandLogo} width={40} className="navlogo" /> */}
            <h4 className="ms-3 mt-3 ">MediChain</h4>
            </div>
          </NavLink>

          <NavbarToggle aria-controls="navbar-dark-example" />

          <NavbarCollapse
            id="navbar-dark-example"
            className="justify-content-end fw-bold   "
          >
            <Nav>
              
              <NavLink href="/" ><div className="glow-on-hover">Home</div></NavLink>

              <NavLink href="/about"><div className="glow-on-hover">About Us</div></NavLink>

              <NavLink href="/service"><div className="glow-on-hover">Service</div></NavLink>

              <NavLink href="/contact"><div className="glow-on-hover">Contact US</div></NavLink>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  )
}
