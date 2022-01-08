import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { addDoc, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

const AllAlbumsPage = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const queryRef = query(collection(db, "albums"));

  const { data, isLoading } = useFirestoreQueryData(
    ["albums"],
    queryRef,
    { idField: "id", subscribe: true },
    { fetchOnMount: "always" }
  );

  const handleClick = async () => {
    const newAlbum = await addDoc(collection(db, "albums"), {
      name: "New album",
      owner: currentUser.uid,
    });

    navigate(`/album/${newAlbum.id}`);
  };

  useEffect(() => {
    console.log(`data`, data);
  }, [data]);
  return (
    <div>
      <h3 className="my-4">Allalbums page</h3>

      <Button variant="secondary" onClick={handleClick}>
        Create New Album
      </Button>

      {isLoading && <p>isLoading...</p>}
      {data && (
        <>
          {data.length ? (
            <div>
              {data.map((album) => {
                return <div key={album.id}>{album.id}</div>;
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
