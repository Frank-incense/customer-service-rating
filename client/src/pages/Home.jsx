import { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContextProvider";

function HomePage(){

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const {posts} = useContext(AuthContext)

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
        navigate(`/reviews?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleCategoryClick = (category) => {
        navigate(`/reviews?category=${encodeURIComponent(category)}`);
    };

    const sortedReviews = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    const topThree = sortedReviews.slice(0,3)
    
    return (
        <main className="container py-4">
      <div className="header text-center mb-5">
        <h2>Measure. Improve. Delight.</h2>
        <h5>Your one-stop platform for collecting, analyzing, and improving customer service experiences.</h5>
        <div className="search mt-3">
        <form onSubmit={handleSearchSubmit}>
          <div className="formGroup d-flex">
            <input
              type="search"
              name="search"
              id="search"
              className="form-control me-2"
              placeholder="Search for a business..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
      </div>

      <hr />

      <div className="sep text-center my-4">
        <span>Write a review of a product you have bought</span>
      </div>

      <div className="categories mb-5">
        <h4>Categories</h4>
        <ul className="list-unstyled d-flex gap-3">
          {[
            "Banking and Financial Services",
            "Food & Beverage",
            "Retail & Shops",
            "Health & Wellness",
            "Telecommunication",
            "Transport and logistics",
            "Hotel & Hospitality"
          ].map((cat) => (
            <li
              key={cat}
              className="category badge bg-secondary p-2 rounded-pill text-white"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="cta text-center mb-5">
        <h4>Looking to get feedback?</h4>
        <p>Get started with us and receive feedback from your customers.</p>
        <Button as={Link} to="/register" variant="warning">Get Started</Button>
      </div>

      <div className="business_reviews mb-5">
        <div className="review_head d-flex justify-content-between align-items-center mb-3">
          <h4>Business Reviews</h4>
          <Button as={Link} to="/reviews" variant="outline-primary">See more</Button>
        </div>
        <div className="row">
          {topThree.map((review) => (
            <div key={review.id} className="col-md-4 mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{review.business.slug.replace("-", " ")}</Card.Title>
                  <Card.Text>{review.comment}</Card.Text>
                  <Card.Text><strong>Rating:</strong> {review.rating}</Card.Text>
                  <Link to={`/reviews/${review.business.slug}`}>View Business</Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="customer_reviews mb-5">
        <div className="review_head d-flex justify-content-between align-items-center mb-3">
          <h4>Recent Reviews</h4>
          <Button as={Link} to="/reviews/user" variant="outline-primary">See more</Button>
        </div>
        <div className="row">
          {topThree.map((review) => (
            <div key={review.id} className="col-md-4 mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{review.user.email}</Card.Title>
                  <Card.Text>{review.comment}</Card.Text>
                  <Card.Text><strong>Rating:</strong> {review.rating}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </main>
    )
}

export default HomePage