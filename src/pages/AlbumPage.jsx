import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import useUploadPhoto from "../hooks/useUploadPhoto";
import { Alert } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import useAlbum from "../hooks/UseAlbum";
import ImageGrid from "../components/ImageGid";

const AlbumPage = () => {
  const { id } = useParams();

  const album = useAlbum(id);

  useEffect(() => {
    if (album.isSuccess) {
      console.log(`album`, album);
      console.log(`album.data,photos`, album.data.data().photos);
    }
  }, [album]);

  // upload a new photo
  const uploadPhoto = useUploadPhoto(id);
  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }

    uploadPhoto.mutate(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    maxFiles: 1,
    onDrop,
  });

  return (
    <div>
      <h1>{`album ${id}`}</h1>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        id="dropzone-wrapper"
        className={`${isDragAccept ? "drag-accept" : ""}${
          isDragReject ? "drag-reject" : ""
        }`}
      >
        <input {...getInputProps()} />

        <div className="indicator">
          {isDragActive ? (
            isDragAccept ? (
              <p>Nice!</p>
            ) : (
              <p>
                This format is not supported. Only the following formats are
                allowed: jpeg, jpg, png
              </p>
            )
          ) : (
            <p>Drag 'n' drop a photo here</p>
          )}
        </div>

        {uploadPhoto.progress !== null && (
          <ProgressBar variant="success" animated now={uploadPhoto.progress} />
        )}

        {uploadPhoto.isError && (
          <Alert variant="warning">{uploadPhoto.error}</Alert>
        )}
        {uploadPhoto.isSuccess && (
          <Alert variant="success">The photo has been uploaded!</Alert>
        )}
      </div>
      {album.isSuccess && <ImageGrid urls={album.data.data().photos} />}
    </div>
  );
};

export default AlbumPage;
