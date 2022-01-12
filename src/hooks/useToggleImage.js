import React, { useState } from 'react';

const useToggleImage = () => {
  const [chosenPhotos, setChosenPhotos] = useState([]);
  const [photosToDelete, setPhotosToDelete] = useState([]);
 
  const toggleChosenPhoto = (photosUrl) => {
    if (chosenPhotos.includes(photosUrl)) {
      setChosenPhotos(chosenPhotos.filter((url) => url !== photosUrl));
    } else if (!chosenPhotos.includes("photosUrl")) {
      setChosenPhotos([...chosenPhotos, photosUrl]);
      setPhotosToDelete(photosToDelete.filter((url) => url !== photosUrl));
    }
  };
  
   const toggleDislikePhoto = (photosUrl) => {
    if (photosToDelete.includes(photosUrl)) {
      setPhotosToDelete(photosToDelete.filter((url) => url !== photosUrl));
    } else if (!photosToDelete.includes("photosUrl")) {
      setPhotosToDelete([...photosToDelete, photosUrl]);
      setChosenPhotos(chosenPhotos.filter((url) => url !== photosUrl));
    }
  };

  return {
    chosenPhotos,
    setChosenPhotos,
    photosToDelete,
    setPhotosToDelete,
    toggleChosenPhoto,
    toggleDislikePhoto
  }
}
 
export default useToggleImage;