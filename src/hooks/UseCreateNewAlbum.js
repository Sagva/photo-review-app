import { addDoc, collection } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const UseCreateNewAlbum = (photos) => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  const createNewAlbum = async (photos) => {
    const newAlbum = await addDoc(collection(db, "albums"), {
      name: "New album",
      owner: currentUser.uid,
      photos: photos,
    });

    navigate(`/album/${newAlbum.id}`);
  };

  return createNewAlbum;
};

export default UseCreateNewAlbum;
