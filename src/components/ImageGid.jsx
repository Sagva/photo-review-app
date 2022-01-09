import React, { useEffect, useState } from "react";
import { Col, FormControl, InputGroup, Row } from "react-bootstrap";

const ImageGrid = ({ urls }) => {
  const [chosenPhotos, setChosenPhotos] = useState([]);

  const toggleChosenPhoto = (photosUrl) => {
    if (chosenPhotos.includes(photosUrl)) {
      setChosenPhotos(chosenPhotos.filter((url) => url !== photosUrl));
      chosenPhotos.filter((url) => url !== photosUrl);
    } else if (!chosenPhotos.includes("photosUrl")) {
      setChosenPhotos([...chosenPhotos, photosUrl]);
    }
  };
  useEffect(() => {
    console.log(`chosenPhotos`, chosenPhotos);
  }, [chosenPhotos]);
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="mx-2">
      {urls &&
        urls.map((url) => (
          <Col key={url} className="d-flex justify-content-center my-4 mx-4">
            <div className="ImageBox">
              <img
                className={chosenPhotos.includes(url) ? "chosen" : "not-chosen"}
                src={url}
                alt={url}
                style={{
                  width: 350,
                  height: "auto",
                  cursor: "pointer",
                }}
              />
              <input
                className="chosePhotoCheckbox"
                type="checkbox"
                onChange={() => toggleChosenPhoto(url)}
                style={{
                  cursor: "pointer",
                }}
              />
            </div>
          </Col>
        ))}
    </Row>
  );
};

export default ImageGrid;
