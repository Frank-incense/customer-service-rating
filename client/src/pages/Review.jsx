import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert, InputGroup, Form, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContextProvider";

const Review = () => {
    const {loading, businesses, error} = useContext(AuthContext)
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("search")? searchParams.get("search").toLowerCase(): ""
    const [searchQuery, setSearchQuery] = useState(searchTerm);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const categories = [
        'All',
        'Banking and Financial Services',
        'Food & Beverage',
        'Retail & Shops',
        'Health & Wellness',
        'Telecommunication',
        'Transport and logistics',
        'Hotel & Hospitality']


  useEffect(() => {
    const filtered = businesses.filter((biz) => {
        const matchSearch = biz.slug
        .replace(/-/g, " ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

        const matchCategory =
        selectedCategory === "All" || biz.category.category === selectedCategory;

        return matchSearch && matchCategory;
    });

    setFilteredBusinesses(filtered);
    }, [searchQuery, selectedCategory, businesses]);

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
        <>
        <Row className="align-items-center mb-4">
            <Col md={6} className="mb-3 mb-md-0">
                <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Search businesses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-secondary">
                    <Search />
                </Button>
                </InputGroup>
            </Col>

            <Col md={4}>
                <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                >
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                ))}
                </Form.Select>
            </Col>
        </Row>

        <Row>
          {filteredBusinesses.map((business) => (
            <Col key={business.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                {business.logo_url && (
                <Card.Img
                    variant="top"
                    src={business.logo_url}
                    alt={`${business.slug} logo`}
                    style={{
                    height: "180px",
                    objectFit: "fill",
                    borderBottom: "1px solid #e5e7eb",
                    }}
                />
                )}
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
        </>
      )}
    </Container>
  );
};

export default Review;
