import React from "react";
import { Button, Card } from "react-bootstrap";

import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UseCreateNewAlbum from "../hooks/UseCreateNewAlbum";
import useAllAlbums from "../hooks/useAllAlbums";

const AllAlbumsPage = () => {
  const { currentUser } = useAuthContext();
  const createNewAlbum = UseCreateNewAlbum();
  const navigate = useNavigate();

  const { data, isLoading } = useAllAlbums();

  return (
    <div>
      <h3 className="my-4">Your albums</h3>

      <Button
        variant="secondary"
        onClick={() => createNewAlbum("New Album", [], currentUser.uid)}
      >
        Create New Album
      </Button>

      {isLoading && <p>isLoading...</p>}
      {data && (
        <>
          {data.length ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-md-row flex-wrap mt-3">
              {data.map((album) => {
                return (
                  <Card
                    key={album.id}
                    style={{
                      width: "18rem",
                      height: "6rem",
                      cursor: "pointer",
                    }}
                    className="mx-3 my-3"
                    onClick={() => navigate(`/album/${album.id}`)}
                  >
                    <Card.Body className="album-card">
                      <Card.Title>{album.name}</Card.Title>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="mt-3">You don't have any albums yet</p>
          )}
        </>
      )}
    </div>
  );
};

export default AllAlbumsPage;
