import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../firebase";

const useAlbum = (albumId) => {
  // create ref to collection 'albums'
  const refToAlbum = doc(db, "albums", albumId);

  const album = useFirestoreDocument(
    ["albums", albumId],
    refToAlbum,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  return album;
};

export default useAlbum;
