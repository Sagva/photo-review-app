import React, { useCallback } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert";
import { useDropzone } from "react-dropzone";
import useUploadPhoto from "../hooks/useUploadPhoto";

const UploadPhotoDropzone = ({ albumId }) => {
  // upload a new photo
  const uploadPhoto = useUploadPhoto(albumId);

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
  );
};

export default UploadPhotoDropzone;
