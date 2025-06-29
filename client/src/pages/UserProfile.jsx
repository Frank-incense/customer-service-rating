import { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../components/AuthContextProvider";
import { useNavigate } from "react-router-dom";


const UserProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const {isAuth, reviews, setIsAuth, logout, getCookie} = useContext(AuthContext)

    const handleUpdate = async (values) => {
        setSaving(true);
        setError("");

        try {
          const csrfToken = getCookie('csrf_access_token')
        const res = await fetch("/api/register", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken
            },
            body: JSON.stringify(values),
            credentials: "include",
        });

        if (!res.ok) throw new Error("Update failed");

        const updatedUser = await res.json();
        setIsAuth(updatedUser);
        setEditMode(false);
        } catch (err) {
        console.error(err);
        setError("Failed to update profile");
        } finally {
        setSaving(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/')
    };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}

              {!isAuth ? (
                <Spinner animation="border" />
              ) : editMode ? (
                <Formik
                  initialValues={{
                    email: isAuth.email,
                    username: isAuth.username || "",
                  }}
                  validationSchema={Yup.object({
                    email: Yup.string().email("Invalid email").required("Required"),
                    username: Yup.string().required("Username required"),
                  })}
                  onSubmit={handleUpdate}
                >
                  {() => (
                    <FormikForm>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Field type="email" name="email" className="form-control" />
                        <div className="text-danger small">
                          <ErrorMessage name="email" />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Field type="text" name="username" className="form-control" />
                        <div className="text-danger small">
                          <ErrorMessage name="username" />
                        </div>
                      </Form.Group>

                      <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={saving}>
                          {saving ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </FormikForm>
                  )}
                </Formik>
              ) : (
                <>
                  <p>
                    <strong>Email:</strong> {isAuth.email}
                  </p>
                  <p>
                    <strong>Username:</strong> {isAuth.username || "N/A"}
                  </p>
                  <div className="d-flex gap-3 mt-3">
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                    <Button onClick={() => setEditMode(true)} variant="primary">
                        Edit Profile
                  </Button>
                  </div>
                  
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">My Reviews</Card.Title>
              {reviews.length === 0 ? (
                <Alert variant="info">You haven't submitted any reviews yet.</Alert>
              ) : (
                <ListGroup>
                  {reviews.map((review) => (
                    <ListGroup.Item key={review.id} className="mb-2">
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="mb-1 fw-bold">{review.comment}</p>
                          <small className="text-muted">
                            For: {review.business.slug}
                          </small>
                        </div>
                        <Badge bg="primary" className="d-flex justify-content-center align-items-center" pill>
                          ⭐ {review.rating}
                        </Badge>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
