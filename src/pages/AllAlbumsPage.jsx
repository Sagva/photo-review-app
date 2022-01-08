import React from "react";
import { Button } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AllAlbumsPage = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    const newAlbum = await addDoc(collection(db, "albums"), {
      name: "New album",
      accessList: [currentUser.uid],
    });

    navigate(`/album/${newAlbum.id}`);
  };

  return (
    <div>
      <h3 className="my-4">Allalbums page</h3>

      <Button variant="secondary" onClick={handleClick}>
        Create New Album
      </Button>
    </div>
  );
};

export default AllAlbumsPage;
