import { Button, Container, Form } from "react-bootstrap";

function Register(){
    return (
        <Container>
            <Container>

            </Container>
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Container>
            <Container className="justify-content-center">
                <h3>Are you a business?</h3>
                <p>Set up a business account with us</p>
                <Container className="d-flex">
                    <Button variant="primary">Login</Button>
                    <Button variant="outline-primary">Sign up</Button>
                </Container>
            </Container>
        </Container>
    );
}

export default Register