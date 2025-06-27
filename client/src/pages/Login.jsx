import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Button, Container, Form } from "react-bootstrap"
import { useContext } from "react";
import { AuthContext } from "../components/AuthContextProvider";

function Login(){
    const navigate = useNavigate();
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        password: yup.string().max(8, 'Must be atleast 8 characters.').required('Input your password'),
      })
    
      const formik = useFormik({
        initialValues: {
          email: "",
          password:"",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
              fetch("/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }).then(
                (res) => {
                if (res.status == 200){
                    return res.json();
                } else {
                    return res.json().then(err => { throw new Error(err.error) });
                }
                }
              ).then((user)=>{
                console.log(user)
                setIsAuth(user.user)
                navigate('/')
              })
          },
        });
    
    return (
        <Container>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    name="email"
                    type="email" 
                    placeholder="Enter email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    />
                    
                    {formik.dirty || formik.touched.email ?
                    <Form.Text>{formik.errors.email}</Form.Text>
                    : null}
                       
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}/>

                    {formik.dirty || formik.touched.email ?
                    <Form.Text>{formik.errors.password}</Form.Text>
                    :null}

                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>
        </Container>
    )
}

export default Login