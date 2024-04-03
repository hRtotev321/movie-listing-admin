import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  getFirestore,
  getDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { CreateMovieType, MovieType, UpdateMovieType } from "../app/types";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2mIvSLh6WRpy2ZogIlqk59ZRIoCBevxc",
  authDomain: "movieslist-49cde.firebaseapp.com",
  projectId: "movieslist-49cde",
  storageBucket: "movieslist-49cde.appspot.com",
  messagingSenderId: "975628726138",
  appId: "1:975628726138:web:c899fd1cd971f3b1cd30c3",
  measurementId: "G-8PD0XNWQN5",
};

type LoginType = {
  email: string;
  password: string;
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const isAdmin = async (uid: string): Promise<boolean> => {
  if (!uid) return false;
  const docRef = doc(db, "admins", uid);
  const docSnap = await getDoc(docRef);

  return docSnap.data()?.isAdmin as boolean;
};

export const getMovies = async () => {
  const data: MovieType[] = [];
  const querySnapshot = await getDocs(collection(db, "movies"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({ ...doc.data(), movieId: doc.id });
  });

  return data;
};

export const getMovie = async (movieId: string) => {
  const docRef = doc(db, "movies", movieId);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data(), movieId: docSnap.id };
};

export const editMovie = async (movieData: UpdateMovieType) => {
  try {
    // const user = getCurrentUser();
    const lastChange = new Date().getTime();
    const movieRef = doc(db, "movies", movieData.movieId as string);

    await updateDoc(movieRef, {
      ...movieData,
      lastChange,
    });

    return movieData.movieId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteMovie = async (movieId: string) => {
  try {
    await deleteDoc(doc(db, "movies", movieId));
    return true;
  } catch (error) {
    return false;
  }
};

export const uploadImage = async (imageUri: string) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `/images/${new Date().getTime()}`);

    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log(error);
    return "uploading image failed :/";
  }
};

export const createMovie = async (movieData: CreateMovieType) => {
  const lastChange = new Date().getTime();
  // const creatorId = getCurrentUser()?.uid;
  // const user = getCurrentUser();

  const movie: MovieType = {
    ...movieData,
    rating: 0,
    lastChange,
    comments: [],
    creatorId: "pzrNuUttC7Q9lRgCD9le9Qp7yMJ3", // todo - change this
    creator: "admin@gmail.com", // todo - change this
  };

  try {
    const docRef = await addDoc(collection(db, "movies"), movie);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export function getCurrentUser() {
  return auth.currentUser;
}

export const loginUser = async ({
  email,
  password,
}: LoginType): Promise<boolean | Error> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const resp = await isAdmin(user.uid);
    return resp;
  } catch (error) {
    return false;
  }
};

export const checkAuth = async (): Promise<boolean> => {
  await auth.authStateReady();
  return !!auth.currentUser;
};

export const logout = async (): Promise<void> => {
  return await signOut(auth);
};
