import { Button, Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";

function Register(){
  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup.string().required('Input your password'),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password:"",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
          fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then(
            (res) => {
              if (res.status == 200){
                console.log(res)
                res.json()
              }
            }
          )
      },
    });

    return (
        <Container>
            <Container>

            </Container>
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                        name="email"
                        type="email" 
                        placeholder="Enter email"
                        onChange={formik.handleChange}
                        value={formik.values.email} />

                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>

                        {
                        formik.touched.email?
                        <Form.Text>{formik.errors.email}</Form.Text>
                        :null
                        }
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        name="password"
                        type="password" 
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password} />
                        {
                          formik.touched.password?
                          <Form.Text>{formik.errors.password}</Form.Text>
                          :null
                        }
                        
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