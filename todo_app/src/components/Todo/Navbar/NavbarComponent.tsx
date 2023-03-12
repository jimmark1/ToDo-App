import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const NavbarComponent = () => {
     return (
          <div>
               <Navbar className="mb-5 p-2" bg="light" expand="lg">
                    <Container className="d-flex w-100 p-2">
                         <Navbar.Brand className="fw-bold text-uppercase">
                              JUST DO IT
                         </Navbar.Brand>
                         <Button variant="secondary" size="sm">
                              Sign out
                         </Button>
                    </Container>
               </Navbar>
          </div>
     );
};

export default NavbarComponent;
