import React from "react";
import { useParams } from "react-router-dom";

import useAlbum from "../hooks/UseAlbum";
import ImageGrid from "../components/ImageGid";
import UploadPhotoDropzone from "../components/UploadPhotoDropzone";

const AlbumPage = () => {
  const { id } = useParams();

  const album = useAlbum(id);

  return (
    <div>
      <h1>{`album ${id}`}</h1>
      <UploadPhotoDropzone albumId={id} />

      {album.isSuccess && <ImageGrid urls={album.data.data().photos} />}
    </div>
  );
};

export default AlbumPage;
