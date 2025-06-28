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

const Register = () => {
  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    role: "user",
    email: "",
    password: "",
    slug: "",
  };

  const validationSchema = Yup.object().shape({
    role: Yup.string().oneOf(["user", "business"]).required(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    slug: Yup.string().when("role", (role, schema) =>
      role === "business"
        ? schema.required("Business slug is required")
        : schema.notRequired()
    ),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setRegisterError(null);
    setRegisterSuccess(false);

    const endpoint =
      values.role === "business"
        ? `/api/business/register`
        : `/api/user/register`;

    const payload =
      values.role === "business"
        ? {
            email: values.email,
            password: values.password,
            slug: values.slug,
          }
        : {
            email: values.email,
            password: values.password,
          };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Registration failed");

      setRegisterSuccess(true);
      resetForm();
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setRegisterError("Registration failed. Please check your input.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Register</h2>

          {registerError && <Alert variant="danger">{registerError}</Alert>}
          {registerSuccess && (
            <Alert variant="success">
              Registration successful! Redirecting to login...
            </Alert>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <FormikForm>
                {/* Role Selector */}
                <Form.Group className="mb-3">
                  <Form.Label>Register as</Form.Label>
                  <Field as="select" name="role" className="form-select">
                    <option value="user">User</option>
                    <option value="business">Business</option>
                  </Field>
                </Form.Group>

                {/* Slug (business only) */}
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
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                  />
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
                  variant="success"
                  disabled={isSubmitting}
                  className="w-100"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Registering...
                    </>
                  ) : (
                    "Register"
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

export default Register;
