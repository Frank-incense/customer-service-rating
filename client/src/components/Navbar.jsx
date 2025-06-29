import { useContext } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Moon, Sun } from "react-bootstrap-icons";
import { AuthContext } from "./AuthContextProvider";
import { Link } from "react-router-dom";

function NavBar({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const {isAuth, } = useContext(AuthContext) 
  
  return (
    <Navbar
      bg={theme}
      data-bs-theme={theme}
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">RateMate</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/reviews">Reviews</Nav.Link>
            <Nav.Link as={Link} to="/add-review">Add Review</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            {/* Theme Toggle Button */}
            <Button
              variant={theme === "light" ? "outline-dark" : "outline-light"}
              onClick={toggleTheme}
              className="me-3"
            >
              {theme === "light" ? <Moon /> : <Sun />}{" "}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>

            {/* Auth links (replace with real auth check later) */}
            {!isAuth ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
              </>
            ) : (
              <Navbar.Text>
                Signed in as: <Link to="/user/profile">{isAuth.email}</Link>
              </Navbar.Text>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
