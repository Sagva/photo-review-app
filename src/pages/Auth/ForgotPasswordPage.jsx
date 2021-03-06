import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";

const ForgotPasswordPage = () => {
  const emailRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { resetPassword } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);

      setLoading(false);
      emailRef.current.value = "";
      setMessage("Password reset email sent!");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Forgot password?</Card.Title>
              {!message && (
                <Card.Text className="mb-3">
                  We'll email you instructions on how to reset it.
                </Card.Text>
              )}
              {message && (
                <Alert variant="success" className="mb-3">
                  {message}
                </Alert>
              )}

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button disabled={loading} type="submit">
                  Reset password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPasswordPage;
