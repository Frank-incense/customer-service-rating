import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Moon, Sun } from "react-bootstrap-icons";

function NavBar({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Navbar
      bg={theme}
      data-bs-theme={theme}
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">CSR-APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/reviews">Reviews</Nav.Link>
            <Nav.Link href="/add-review">Add Review</Nav.Link>
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
            {true ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
              </>
            ) : (
              <Navbar.Text>
                Signed in as: <a href="#profile">Mark Otto</a>
              </Navbar.Text>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
