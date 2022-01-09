import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

const usePhotos = (photosIds) => {
  // create ref to collection 'memes'
  const colPhotosRef = collection(db, "photos");

  // create query for colPhotosRef
  const queryRef = query(colPhotosRef, where("photoId", "in", photosIds));

  const photos = useFirestoreQueryData(["photos"], queryRef, {
    idField: "_id",
  });

  return photos;
};

export default usePhotos;
