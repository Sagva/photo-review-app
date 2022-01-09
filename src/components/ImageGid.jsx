import React from "react";
import { Col, Row } from "react-bootstrap";

const ImageGrid = ({ urls }) => {
  console.log(`urls`, urls);
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="mx-2">
      {urls &&
        urls.map((url) => (
          <Col key={url} className="d-flex justify-content-center mb-4">
            <img src={url} alt={url} style={{ width: 350, height: "auto" }} />
          </Col>
        ))}
    </Row>
  );
};

export default ImageGrid;
