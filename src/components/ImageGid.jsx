import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import UseCreateNewAlbum from "../hooks/UseCreateNewAlbum";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import ModalWindow from "./ModalWindow";

const ImageGrid = ({ album }) => {
  const urls = album.data.data().photos;
  const [chosenPhotos, setChosenPhotos] = useState([]);
  const [photosToDelete, setPhotosToDelete] = useState([]);
  const [isAllPhotosMarked, setIsAllPhotosMarked] = useState(false);
  const { currentUser } = useAuthContext();
  const createNewAlbum = UseCreateNewAlbum();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsAllPhotosMarked(
      urls.length - (chosenPhotos.length + photosToDelete.length) === 0
    );
  }, [urls, chosenPhotos, photosToDelete]);

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

  const sendToPhotographer = () => {
    setShowModal(true);
    const timeAndDate = new Date().toLocaleTimeString();

    let name = `${album.data.data().name}_${timeAndDate}`;
    createNewAlbum(name, chosenPhotos, album.data.data().owner);
  };
  const modalValues = {
    booleanValue: showModal,
    toggleBoolean: setShowModal,
    message: {
      title: "",
      text: `Thank you! Your photos have been send!`,
    },
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {!currentUser && !isAllPhotosMarked && (
        <p>
          Please mark all photos before sending the album to the photographer
        </p>
      )}
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
                  <div className="mt-1">
                    <button
                      onClick={() => toggleChosenPhoto(url)}
                      className="mx-2 btn-thumbs like"
                    >
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="faThumbsUp"
                      />
                    </button>
                    <button
                      onClick={() => toggleDislikePhoto(url)}
                      className="btn-thumbs dislike"
                    >
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        className="faThumbsDown"
                      />
                    </button>
                  </div>
                )}
              </div>
            </Col>
          ))}
      </Row>

      {!currentUser && (
        <div>
          <div>
            Photo to keep: <span>{chosenPhotos.length}</span>
          </div>
          <div>
            Photo to delete: <span>{photosToDelete.length}</span>
          </div>
          {!isAllPhotosMarked && (
            <div>
              Not determined:{" "}
              <span>
                {urls.length - (chosenPhotos.length + photosToDelete.length)}
              </span>
            </div>
          )}
          <div className="mt-3" style={{ borderTop: "1px solid black" }}>
            Total photos: <span>{urls.length}</span>
          </div>
        </div>
      )}
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
        <div>
          <Button
            variant="secondary"
            onClick={() => sendToPhotographer()}
            className="my-5"
            disabled={!isAllPhotosMarked}
          >
            Send to Photographer
          </Button>
          <ModalWindow modalValues={modalValues} />
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
