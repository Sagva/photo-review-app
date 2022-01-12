import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const useCreateNewAlbum = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const createNewAlbum = async (name, photos, ownerID) => {
    const newAlbum = await addDoc(collection(db, "albums"), {
      name: name,
      owner: ownerID,
      photos: photos,
      timestamp: serverTimestamp(),
    });

    if (currentUser) {
      navigate(`/album/${newAlbum.id}`);
    }
  };

  return createNewAlbum;
};

export default useCreateNewAlbum;
