import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

function NavBar({theme, setTheme}) {
    const [isAuth, setIsAuth] = useState(true)
    
  return (
    <Navbar bg={theme} data-bs-theme={theme} expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-center" id="basic-navbar-nav">
          <Nav >
            <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" href="/reviews">Reviews</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" href="/add-review">Add Review</Nav.Link>
            </Nav.Item>
            
          </Nav>
        </Navbar.Collapse>
            {isAuth ?
            <Nav variant='pills' className="d-flex">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
            </Nav>:
            <Navbar.Text>
                    Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>}
      </Container>
    </Navbar>
  );
}

export default NavBar;

