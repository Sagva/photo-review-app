import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import UseCreateNewAlbum from "../hooks/UseCreateNewAlbum";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const ImageGrid = ({ urls }) => {
  const [chosenPhotos, setChosenPhotos] = useState([]);
  const [photosToDelete, setPhotosToDelete] = useState([]);
  const { currentUser } = useAuthContext();
  const createNewAlbum = UseCreateNewAlbum();

  const toggleChosenPhoto = (photosUrl) => {
    if (chosenPhotos.includes(photosUrl)) {
      setChosenPhotos(chosenPhotos.filter((url) => url !== photosUrl));
    } else if (!chosenPhotos.includes("photosUrl")) {
      setChosenPhotos([...chosenPhotos, photosUrl]);
      setPhotosToDelete(photosToDelete.filter((url) => url !== photosUrl));
    }
  };

  const toggleDislikePhoto = (photosUrl) => {
    if (photosToDelete.includes(photosUrl)) {
      setPhotosToDelete(photosToDelete.filter((url) => url !== photosUrl));
    } else if (!photosToDelete.includes("photosUrl")) {
      setPhotosToDelete([...photosToDelete, photosUrl]);
      setChosenPhotos(chosenPhotos.filter((url) => url !== photosUrl));
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
                  className={`image ${
                    chosenPhotos.includes(url) ? "chosen" : ""
                  } ${photosToDelete.includes(url) ? "disliked" : ""}`}
                  src={url}
                  alt={url}
                  style={{
                    width: 350,
                    height: "auto",
                    cursor: "pointer",
                  }}
                />
                {currentUser && (
                  <input
                    className="chosePhotoCheckbox"
                    type="checkbox"
                    onChange={() => toggleChosenPhoto(url)}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                )}
                {!currentUser && (
                  <div className="mt-3">
                    <button onClick={() => toggleChosenPhoto(url)}>
                      <FontAwesomeIcon icon={faThumbsUp} />
                    </button>
                    <button onClick={() => toggleDislikePhoto(url)}>
                      <FontAwesomeIcon icon={faThumbsDown} />
                    </button>
                  </div>
                )}
              </div>
            </Col>
          ))}
      </Row>
      {currentUser ? (
        <Button
          variant="secondary"
          style={{ display: chosenPhotos.length ? "block" : "none" }}
          onClick={() =>
            createNewAlbum(
              "New album",
              chosenPhotos,
              "here should be photographer's id"
            )
          }
          className="my-5"
        >
          Create new album
        </Button>
      ) : (
        <Button
          variant="secondary"
          // style={{ display: chosenPhotos.length ? "block" : "none" }}
          onClick={() =>
            createNewAlbum(
              "New album",
              chosenPhotos,
              "here should be photographer's id"
            )
          }
          className="my-5"
        >
          Send to Photographer
        </Button>
      )}
    </div>
  );
};

export default ImageGrid;
