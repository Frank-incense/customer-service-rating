import { useContext, useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { AuthContext } from "./AuthContextProvider";


function BusinessEditForm() {
  const { isAuth, setBusinesses, getCookie, busineses } = useContext(AuthContext);
  const [status, setStatus] = useState(null);

  const initialValues = {
    slug: isAuth.slug,
    locations: isAuth.locations,
    category: isAuth.category || "",
  };

  const validationSchema = Yup.object().shape({
    slug: Yup.string().required("Slug is required"),
    locations: Yup.string().required("Location is required"),
    category: Yup.string().required("Category is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
        const csrfToken = getCookie("csrf_access_token")
        const res = await fetch(`/api/business/${isAuth.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(values),
      });
      
      if (res.ok) {
        const updated = await res.json();
        setBusinesses(busineses.map(business=>{
          if (business.id == updated.id){
            return updated
          }
        }));
        
        setStatus({ type: "success", msg: "Business info updated!" });
      } else {
        setStatus({ type: "error", msg: "Update failed." });
        console.log(res)

      }
    } catch (err){
      setStatus({ type: "error", msg: `${err}` });
      
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Container className="py-4">
      <h3>Edit Business Information</h3>

      {status && (
        <Alert variant={status.type === "error" ? "danger" : "success"}>
          {status.msg}
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          
          <FormikForm as={Form}>
            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Field name="slug" className="form-control" />
              <ErrorMessage name="slug" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Field name="locations" className="form-control" />
              <ErrorMessage name="locations" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Field as="select" name="category" className="form-select">
                <option value="">Select Category</option>
                <option>Banking and Financial Services</option>
                <option>Food & Beverage</option>
                <option>Retail & Shops</option>
                <option>Health & Wellness</option>
                <option>Telecommunication</option>
                <option>Transport and Logistics</option>
                <option>Hotel & Hospitality</option>
              </Field>
              <ErrorMessage name="category" component="div" className="text-danger" />
            </Form.Group>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
}

export default BusinessEditForm;
