import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="custom" dark expand="lg" className="navbar-custom">
        <NavbarBrand tag={RRNavLink} to="/">Last Spool</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/"> Printer List </NavLink>
                </NavItem>
              </>
            }
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
          <Nav navbar>
            {/* <NavItem>
              <a aria-current="page" className="nav-link"
                href="https://www.youtube.com/watch?v=3N_ywhx6_K0"
                target="_new">Grace Hopper on Letterman</a>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
