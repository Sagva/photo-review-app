import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import useCreateNewAlbum from "../hooks/useCreateNewAlbum";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import ModalWindow from "./ModalWindow";
import useToggleImage from "../hooks/useToggleImage";

const ImageGrid = ({ album }) => {
  const urls = album.data.data().photos;
  const createNewAlbum = useCreateNewAlbum();

  const { currentUser } = useAuthContext();

  const [isAllPhotosMarked, setIsAllPhotosMarked] = useState(false);

  const [showModal, setShowModal] = useState(false);

  // for choosing photos for both the photographer (for adding to a new album)
  // and for the client (marking before sending to the photographer)
  const {
    chosenPhotos,
    photosToDelete,
    toggleChosenPhoto,
    toggleDislikePhoto,
    setChosenPhotos,
    setPhotosToDelete,
  } = useToggleImage();

  // to check if the client marked all photos before send them to the photographer
  //button 'Send to Photographer' will be disabled untill all photos are marked
  useEffect(() => {
    setIsAllPhotosMarked(
      urls.length - (chosenPhotos.length + photosToDelete.length) === 0
    );
  }, [urls, chosenPhotos, photosToDelete]);

  const sendToPhotographer = () => {
    setShowModal(true);
    const timeAndDate = new Date().toLocaleTimeString();

    let name = `${album.data.data().name}_${timeAndDate}`;
    createNewAlbum(name, chosenPhotos, album.data.data().owner);
    setIsAllPhotosMarked(false);
    setChosenPhotos([]);
    setPhotosToDelete([]);
  };

  //Values for modal window that opens after the client marked all photos and pressed the button 'Send to photographer'
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
      {/* the album page is the same for the photographer and the client but it renders different elements depending on existence of the current user id  */}
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
                {/* adding class for img 'chosen' or 'disliked' depending on in which array the photos url is */}
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

                {/* checkboxes on photos only render for photographers */}
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
                {/* thumbs up and down rendrer only for clients (not logged in users) */}
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

      {/* Information for clients (not logged in users) about how many photos left to evaluate and how many photos they liked or disliked  */}
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

      {/* for photographers renders button for creating a new album with chosen photos */}
      {currentUser ? (
        <Button
          variant="secondary"
          style={{ display: chosenPhotos.length ? "block" : "none" }}
          onClick={() =>
            createNewAlbum("New album", chosenPhotos, album.data.data().owner)
          }
          className="my-5"
        >
          Create new album
        </Button>
      ) : (
        // for clients renders buttonfor sending chosen photos to the photographer
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
