import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const UseCreateNewAlbum = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const createNewAlbum = async (name, photos, ownerID) => {
    const newAlbum = await addDoc(collection(db, "albums"), {
      name: name,
      owner: ownerID,
      photos: photos,
    });

    if (currentUser) {
      navigate(`${process.env.PUBLIC_URL}/album/${newAlbum.id}`);
    } 
  };

  return createNewAlbum;
};

export default UseCreateNewAlbum;
