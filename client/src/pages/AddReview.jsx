import { useEffect, useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Form,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

const AddReviewPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    fetch("/api/business")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch businesses");
        return res.json();
      })
      .then((data) => setBusinesses(data))
      .catch((err) => console.error(err));
  }, []);

  const initialValues = {
    business: "",
    rating: "",
    comment: "",
    location: "",
  };

  const validationSchema = Yup.object({
    business: Yup.string().required("Please select a business."),
    rating: Yup.number()
      .required("Rating is required.")
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5"),
    location: Yup.string()
      .required("Please provide your service location."),
    comment: Yup.string()
    .required("Please describe your experience")
    .max(300, "Comment must be under 300 characters."),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(`/api/${values.business}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: values.rating,
          comment: values.comment,
          location: values.location,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit review.");

      setSubmissionStatus("success");
      resetForm();
    } catch (err) {
      console.error(err);
      setSubmissionStatus("error");
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmissionStatus(null), 4000);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">Add a Review</h2>

          {submissionStatus === "success" && (
            <Alert variant="success">Review submitted successfully!</Alert>
          )}
          {submissionStatus === "error" && (
            <Alert variant="danger">There was a problem submitting your review.</Alert>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <FormikForm>
                {/* Business Select */}
                <Form.Group className="mb-3">
                  <Form.Label>Business</Form.Label>
                  <Field as="select" name="business" className="form-select">
                    <option value="">Select a business</option>
                    {businesses.map((b) => (
                      <option key={b.id} value={b.slug}>{b.slug}</option>
                    ))}
                  </Field>
                  <div className="text-danger small">
                    <ErrorMessage name="business" />
                  </div>
                </Form.Group>

                {/* Rating Input */}
                <Form.Group className="mb-3">
                  <Form.Label>Rating (1–5)</Form.Label>
                  <Field
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    className="form-control"
                  />
                  <div className="text-danger small">
                    <ErrorMessage name="rating" />
                  </div>
                </Form.Group>

                {/* Location Input */}
                <Form.Group className="mb-3">
                  <Form.Label>Service Location</Form.Label>
                  <Field
                    type="text"
                    name="location"
                    placeholder="e.g. Nairobi CBD branch"
                    className="form-control"
                  />
                  <div className="text-danger small">
                    <ErrorMessage name="location" />
                  </div>
                </Form.Group>

                {/* Comment Textarea */}
                <Form.Group className="mb-3">
                  <Form.Label>Comment</Form.Label>
                  <Field
                    as="textarea"
                    name="comment"
                    rows="4"
                    className="form-control"
                  />
                  <div className="text-danger small">
                    <ErrorMessage name="comment" />
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
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
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

export default AddReviewPage;
