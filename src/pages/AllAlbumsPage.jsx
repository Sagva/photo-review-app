import React from "react";
import { Button, Card } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useCreateNewAlbum from "../hooks/useCreateNewAlbum";
import useAllAlbums from "../hooks/useAllAlbums";

const AllAlbumsPage = () => {
  const { currentUser } = useAuthContext();
  const createNewAlbum = useCreateNewAlbum();
  const navigate = useNavigate();

  const { data, isLoading } = useAllAlbums(); // fetching all albums from db

  return (
    <div>
      <h3 className="my-4">Your albums</h3>

      <Button
        variant="secondary"
        // function creates a new album with given name, photos and owner
        // every album has the same name 'New album'
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
                    className="album-card mx-3 my-3"
                    key={album.id}
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
