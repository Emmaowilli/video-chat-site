import { storage, auth } from "./firebase.js";
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

window.uploadPhoto = async () => {
  const file = photoInput.files[0];
  const refPath = ref(storage, `photos/${auth.currentUser.uid}/${file.name}`);
  await uploadBytes(refPath, file);
  alert("Uploaded");
};
