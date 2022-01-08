import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const useUploadPhoto = (albumId) => {
  console.log(`albumid`, albumId);

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [progress, setProgress] = useState(null);

  const mutate = async (photo) => {
    // reset internal state
    setError(null);
    setIsError(null);
    setIsMutating(true);
    setIsSuccess(null);

    // break if there is no photo
    if (!photo instanceof File) {
      setError("That is no file");
      setIsError(true);
      setIsMutating(false);
      return;
    }

    //generate a uuid for the photo
    const uuid = uuidv4();

    // construct full path in storage to save photo as
    const storageFullpath = `photos/${uuid}`;
    console.log(`storage_fullpath`, storageFullpath);

    try {
      // create a referenc in storage to upload photo to
      const storageRef = ref(storage, storageFullpath);

      // start upload photo
      const uploadTask = uploadBytesResumable(storageRef, photo);

      // attach upload observer
      uploadTask.on("state_changed", (uploadTaskSnapshot) => {
        //update progress
        setProgress(
          Math.round(
            (uploadTaskSnapshot.bytesTransferred /
              uploadTaskSnapshot.totalBytes) *
              1000
          ) / 10
        );
      });
      //when upload is completed
      await uploadTask.then();

      //get download url to uploaded photo
      const url = await getDownloadURL(storageRef);

      //create reference to collection 'photos'
      const collectionRef = collection(db, "photos");

      //create document in db for the uploaded photo
      await addDoc(collectionRef, {
        path: storageRef.fullPath,
        url,
        created: serverTimestamp(),
      });

      //add the photo to album-photos array
      const refToAlbum = doc(db, "albums", albumId);

      await updateDoc(refToAlbum, {
        photos: arrayUnion(uuid),
      });

      setIsMutating(false);
      setIsSuccess(true);
      setProgress(null); //progress bar disappear
    } catch (e) {
      // console.log(`Error`, e);
      setError(e.message);
      setIsError(true);
      setIsMutating(false);
      setIsSuccess(false);
    }
  };
  return { error, isError, isMutating, isSuccess, progress, mutate };
};

export default useUploadPhoto;
