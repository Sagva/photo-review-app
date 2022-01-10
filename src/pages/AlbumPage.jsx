import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAlbum from "../hooks/UseAlbum";
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
  const [showInputGroup, setShowInputGroup] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const ref = doc(db, "albums", id);

  const changeAlbumName = async () => {
    await updateDoc(ref, {
      name: newAlbumName,
    });
    setNewAlbumName("");
  };

  const shareAlbum = () => {
    setShowModal(true);
  };
  let modalValues = {
    booleanValue: showModal,
    toggleBoolean: setShowModal,
    link: `/album/${id}`
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
          {currentUser && <UploadPhotoDropzone albumId={id} />}

          <SRLWrapper>
            <ImageGrid urls={album.data.data().photos} />
          </SRLWrapper>
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
