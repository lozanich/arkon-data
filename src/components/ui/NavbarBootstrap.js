import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavbarBootstrap = () => {
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Lista de tareas
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/about">
            Acerca de
          </Nav.Link>
          {/* <NavLink to="/add-new">Agregar nueva</NavLink> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
