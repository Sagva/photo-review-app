import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import useAlbum from "../hooks/UseAlbum";
import ImageGrid from "../components/ImageGid";
import UploadPhotoDropzone from "../components/UploadPhotoDropzone";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";

const AlbumPage = () => {
  const { id } = useParams();

  const album = useAlbum(id);
  const [showInputGroup, setShowInputGroup] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");

  const ref = doc(db, "albums", id);

  const changeAlbumName = async () => {
    await updateDoc(ref, {
      name: newAlbumName,
    });
    setNewAlbumName("");
  };
  
  return (
    <div>
      {album.isLoading && <p>Loading...</p>}
      {album.isSuccess && (
        <div>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <h1 className="mx-3">{album.data.data().name}</h1>
            <button
              className="btnChangeAlbumName"
              onClick={() => setShowInputGroup(!showInputGroup)}
            >
              🖊
            </button>
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
          <UploadPhotoDropzone albumId={id} />

          <ImageGrid urls={album.data.data().photos} />
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
