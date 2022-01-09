import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { addDoc, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

const AllAlbumsPage = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  console.log(`currentUser`, currentUser.uid);
  const queryRef = query(
    collection(db, "albums"),
    where("owner", "==", currentUser.uid)
  );

  const { data, isLoading } = useFirestoreQueryData(
    ["albums", currentUser.uid],
    queryRef,
    { idField: "id", subscribe: true },
    { fetchOnMount: "always" }
  );

  const handleClick = async () => {
    const newAlbum = await addDoc(collection(db, "albums"), {
      name: "New album",
      owner: currentUser.uid,
      photos: [],
    });

    navigate(`/album/${newAlbum.id}`);
  };

  return (
    <div>
      <h3 className="my-4">All albums page</h3>

      <Button variant="secondary" onClick={handleClick}>
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
                    style={{ width: "18rem", height: "6rem" }}
                    className="mx-3 my-3"
                    onClick={() => navigate(`/album/${album.id}`)}
                  >
                    <Card.Body>
                      <Card.Title>{album.name}</Card.Title>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p>You don't have any albums yet</p>
          )}
        </>
      )}
    </div>
  );
};

export default AllAlbumsPage;
