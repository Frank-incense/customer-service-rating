// src/pages/BusinessDashboard.jsx
import { useContext, useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContextProvider";

function BusinessDashboard() {
  const { isAuth, logout } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate()
  
  const isBusiness = localStorage.getItem('role') === "business"; 
  
  useEffect(() => {
    if (isBusiness) {
      fetch(`/api/business/${isAuth.id}`, {
      })
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch(() => setStats(null));
    }
  }, [isAuth, isBusiness]);

  if (!isAuth || !isBusiness) {
    return (
      <Container className="py-5">
        <h4>Unauthorized – You must be a business user to access this page.</h4>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Business Dashboard</h2>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="fs-4">Welcome, {isAuth.email}</Card.Title>
          <Card.Text>
            <strong>Business Slug:</strong> {isAuth.slug}
          </Card.Text>
          <Card.Text>
            <strong>Location:</strong> {isAuth.locations}
          </Card.Text>
          {isAuth.logo_url && (
            <Image
              src={isAuth.logo_url}
              alt="Business Logo"
              width={80}
              className="my-2 d-block"
              rounded
              thumbnail
            />
          )}
          <div className="d-flex gap-3 mt-3">
            <Button as={Link} to={`/reviews/${isAuth.slug}`} variant="warning">
              View Public Reviews
            </Button>
            <Button as={Link} to="/dashboard/edit" variant="outline-primary">
              Edit Business Info
            </Button>
            <Button variant="danger" onClick={()=>{ 
              logout()
              navigate('/')
              }}>
              Logout
            </Button>
          </div>
        </Card.Body>
      </Card>

      {stats && (
        <Row>
          <Col md={6}>
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title>Total Reviews</Card.Title>
                <Badge bg="info" className="fs-5">{stats.total_reviews}</Badge>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title>Average Rating</Card.Title>
                <Badge
                  bg={stats.average_rating >= 4 ? "success" : "warning"}
                  className="fs-5"
                >
                  {stats.average_rating.toFixed(1)}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default BusinessDashboard;
