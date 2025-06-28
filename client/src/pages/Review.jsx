import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Review = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/business")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch businesses.");
        return res.json();
      })
      .then((data) => setBusinesses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Companies on RateMate</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Row>
          {businesses.map((business) => (
            <Col key={business.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{business.slug.replace('-'," ")}</Card.Title>
                  <Card.Text>
                    Click below to view what customers are saying.
                  </Card.Text>
                  <Link
                    to={`/reviews/${business.slug}`}
                    className="stretched-link text-decoration-none fw-bold"
                  >
                    View Reviews →
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Review;
