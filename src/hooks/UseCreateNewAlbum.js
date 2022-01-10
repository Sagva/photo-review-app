import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const UseCreateNewAlbum = () => {
  const navigate = useNavigate();

  const createNewAlbum = async (name, photos, ownerID) => {
    const newAlbum = await addDoc(collection(db, "albums"), {
      name: name,
      owner: ownerID,
      photos: photos,
    });

    navigate(`/album/${newAlbum.id}`);
  };

  return createNewAlbum;
};

export default UseCreateNewAlbum;
