import React, { useContext } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { SignoutSvg } from "../../Svgs";

import { AuthContext } from "../../../contexts/AuthContext";

const NavbarComponent = () => {
     let authContext = useContext(AuthContext);

     return (
          <div>
               <Navbar className="mb-5 p-2" bg="light" expand="lg">
                    <Container className="d-flex w-100 p-2">
                         <Navbar.Brand className="fw-bold text-uppercase">
                              JUST DO IT
                         </Navbar.Brand>
                         <Button
                              className="fw-medium"
                              variant="light" //Change to info if not ideal
                              size="sm"
                              onClick={authContext?.logout}>
                              <span className="me-1">Sign out</span>
                              <img src={SignoutSvg} alt="" />
                         </Button>
                    </Container>
               </Navbar>
          </div>
     );
};

export default NavbarComponent;
