import React from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { id } = useParams();

  return <div>{`album ${id}`}</div>;
};

export default AlbumPage;
