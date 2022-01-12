import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
import ImageGrid from "../components/ImageGid";
import UploadPhotoDropzone from "../components/UploadPhotoDropzone";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { SRLWrapper } from "simple-react-lightbox";
import ReactTooltip from "react-tooltip";
import { useAuthContext } from "../contexts/AuthContext";
import ModalWindow from "../components/ModalWindow";

const AlbumPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuthContext();
  const album = useAlbum(id);
  const [showInputGroup, setShowInputGroup] = useState(false); // input field shows when the user preses button 'change album's name'
  const [newAlbumName, setNewAlbumName] = useState("");
  const [showModal, setShowModal] = useState(false);

  //for changing album's name
  //1. create reference to document
  const ref = doc(db, "albums", id);

  //2. update document
  const changeAlbumName = async () => {
    await updateDoc(ref, {
      name: newAlbumName,
    });
    setNewAlbumName("");
  };

  // when the user presses 'Create link' button, opens modal winow with link to that album
  const shareAlbum = () => {
    setShowModal(true);
  };
  let modalValues = {
    booleanValue: showModal,
    toggleBoolean: setShowModal,
    message: {
      title: "Link to the album:",
      text: `https://foto-review-app-1dfd2.web.app/album/${id}`,
    },
  };

  return (
    <div>
      {album.isLoading && <p>Loading...</p>}
      {album.isSuccess && (
        <div>
          <ModalWindow modalValues={modalValues} />
          <div className="d-flex justify-content-center align-items-center mt-3">
            <h1 className="mx-3">{album.data.data().name}</h1>
            {currentUser && (
              <div>
                <button
                  className="btn-album"
                  onClick={() => setShowInputGroup(!showInputGroup)}
                  data-tip="Change album's name"
                >
                  🖊
                </button>

                <ReactTooltip place="bottom" type="dark" effect="float" />
                <button
                  className="btn-album"
                  data-tip="Create a link to the album"
                  onClick={() => shareAlbum()}
                >
                  🔗
                </button>
                <ReactTooltip place="bottom" type="dark" effect="float" />
              </div>
            )}
          </div>
          {/* this container with input field shows when the user preses button 'change album's name' */}
          <Container
            style={{
              display: showInputGroup ? "block" : "none",
            }}
          >
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Type the new album's name here"
                aria-label="Albums name"
                aria-describedby="basic-addon2"
                onChange={(e) => setNewAlbumName(e.target.value)}
                value={newAlbumName}
              />
              <Button
                onClick={() => changeAlbumName()}
                variant="outline-secondary"
                id="button-addon2"
              >
                Change Album's name
              </Button>
            </InputGroup>
          </Container>

          {/* Dropzone for uploading photos shows only for logged in users (photographers) */}
          {currentUser && <UploadPhotoDropzone albumId={id} />}

          <SRLWrapper>
            <ImageGrid album={album} />
          </SRLWrapper>
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
