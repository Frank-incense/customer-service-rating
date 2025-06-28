import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  ListGroup,
  Badge,
} from "react-bootstrap";

const BusinessReview = () => {
  const { slug } = useParams();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const res = await fetch(`/api/businesses/${slug}`);
        if (!res.ok) throw new Error("Failed to load business details");
        const data = await res.json();
        setBusiness(data.business);
        setReviews(data.reviews || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [slug]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length
        ).toFixed(1)
      : "N/A";

  return (
    <Container className="mt-5">
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

      {!loading && !error && business && (
        <>
          {/* Business Summary */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title className="fs-3">{business.name}</Card.Title>
              <Card.Text>
                Location: <strong>{business.location}</strong>
              </Card.Text>
              <Card.Text>
                Total Reviews: <Badge bg="info">{reviews.length}</Badge>
              </Card.Text>
              <Card.Text>
                Average Rating:{" "}
                <Badge bg={averageRating >= 4 ? "success" : "warning"}>
                  {averageRating}
                </Badge>
              </Card.Text>
            </Card.Body>
          </Card>

          {/* User Reviews */}
          <h4 className="mb-3">User Reviews</h4>
          {reviews.length === 0 ? (
            <Alert variant="secondary">No reviews yet for this business.</Alert>
          ) : (
            <ListGroup>
              {reviews.map((review) => (
                <ListGroup.Item
                  key={review.id}
                  className="mb-2 border rounded shadow-sm"
                >
                  <Row>
                    <Col md={8}>
                      <p className="mb-1 fw-bold">{review.comment}</p>
                      <small className="text-muted">
                        Posted by: {review.username || "Anonymous"}
                      </small>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex justify-content-md-end align-items-center"
                    >
                      <Badge bg="primary" pill>
                        ⭐ {review.rating}
                      </Badge>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </>
      )}
    </Container>
  );
};

export default BusinessReview;
