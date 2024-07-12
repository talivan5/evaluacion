import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap"; // Importa los componentes de Bootstrap

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Navbar color="primary" dark expand="md" className="mb-3">
      <div className="container d-flex justify-content-between align-items-center">
        <NavbarBrand href="/">Mi Aplicación</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#">Inicio</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Perfil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={handleLogout}>
                Cerrar Sesión
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
