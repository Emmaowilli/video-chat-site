import { storage } from "./firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

/**
 * Upload image or video to Firebase Storage
 */
export async function uploadMedia(file, path) {
  const fileRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}

