import { useState, useMemo, useContext } from "react";
import { Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";
import { AuthContext } from "../components/AuthContextProvider";

function UserReviews() {
  const { posts } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Filter & search logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.comment.toLowerCase().includes(search.toLowerCase()) ||
        (post.business?.slug || "").toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category
        ? post.business?.category.category === category
        : true;
        
      return matchesSearch && matchesCategory;
    });
  }, [posts, search, category]);

  const totalPages = Math.ceil(filteredPosts.length / perPage);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const renderPagination = () => (
    <Pagination>
      {Array.from({ length: totalPages }, (_, i) => (
        <Pagination.Item
          key={i + 1}
          active={i + 1 === page}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );

  return (
    <Container className="py-4">
      <h2>User Reviews</h2>

      <Form onSubmit={handleSearchSubmit} className="mb-3">
        <Row>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by business or comment"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option>Banking and Financial Services</option>
              <option>Food & Beverage</option>
              <option>Retail & Shops</option>
              <option>Health & Wellness</option>
              <option>Telecommunication</option>
              <option>Transport and Logistics</option>
              <option>Hotel & Hospitality</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button type="submit" variant="primary">Search</Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {paginatedPosts.length === 0 ? (
          <Col><p>No reviews found.</p></Col>
        ) : (
          paginatedPosts.map((review) => (
            <Col md={6} lg={4} key={review.id} className="mb-3">
              <div className="p-3 border rounded shadow-sm bg-light h-100">
                <h5>{review.business?.slug?.replace("-", " ")}</h5>
                <p><strong>Rating:</strong> {review.rating} ⭐</p>
                <p>{review.comment}</p>
                <p className="text-muted small">Posted on {new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            </Col>
          ))
        )}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        {renderPagination()}
      </div>
    </Container>
  );
}

export default UserReviews;
