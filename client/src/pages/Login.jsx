import { useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    role: "user",
    email: "",
    password: "",
    slug: "", // For business login
  };

  const validationSchema = Yup.object().shape({
    role: Yup.string().oneOf(["user", "business"]).required(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    slug: Yup.string().when("role", (role,schema)=>{
      role === "business"
        ? schema.required("Slug is required for business login")
        : schema.notRequired()
    }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoginError(null);
    const endpoint =
      values.role === "business"
        ? `/api/login`
        : "/api/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", values.role);

      navigate(values.role === "business" ? "/dashboard" : "/reviews/user");
    } catch (err) {
      console.error(err);
      setLoginError("Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>

          {loginError && <Alert variant="danger">{loginError}</Alert>}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <FormikForm>
                {/* Role Selector */}
                <Form.Group className="mb-3">
                  <Form.Label>Login as</Form.Label>
                  <Field as="select" name="role" className="form-select">
                    <option value="user">User</option>
                    <option value="business">Business</option>
                  </Field>
                </Form.Group>

                {/* Slug Input - Only for Business */}
                {values.role === "business" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Business Slug</Form.Label>
                    <Field
                      type="text"
                      name="slug"
                      className="form-control"
                      placeholder="e.g. mama-grace-cafe"
                    />
                    <div className="text-danger small">
                      <ErrorMessage name="slug" />
                    </div>
                  </Form.Group>
                )}

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Field type="email" name="email" className="form-control" />
                  <div className="text-danger small">
                    <ErrorMessage name="email" />
                  </div>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  <div className="text-danger small">
                    <ErrorMessage name="password" />
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-100"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
