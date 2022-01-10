import React, {  useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import UseCreateNewAlbum from "../hooks/UseCreateNewAlbum";

const ImageGrid = ({ urls }) => {
  const [chosenPhotos, setChosenPhotos] = useState([]);

  const createNewAlbum = UseCreateNewAlbum();

  const toggleChosenPhoto = (photosUrl) => {
    if (chosenPhotos.includes(photosUrl)) {
      setChosenPhotos(chosenPhotos.filter((url) => url !== photosUrl));
      chosenPhotos.filter((url) => url !== photosUrl);
    } else if (!chosenPhotos.includes("photosUrl")) {
      setChosenPhotos([...chosenPhotos, photosUrl]);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Row xs={1} sm={2} md={3} lg={4} className="mx-2 justify-content-center">
        {urls &&
          urls.map((url) => (
            <Col
              key={url}
              className="ImageBox d-flex justify-content-center align-items-center my-4 mx-4"
            >
              <div className="ImageBox">
                <img
                  className={
                    chosenPhotos.includes(url) ? "chosen" : "not-chosen"
                  }
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
      <Button
        variant="secondary"
        style={{ display: chosenPhotos.length ? "block" : "none" }}
        onClick={() => createNewAlbum(chosenPhotos)}
        className="my-5"
      >
        Create new album
      </Button>
    </div>
  );
};

export default ImageGrid;
