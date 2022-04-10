import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3I4pxloQgAV8-oszRCGflHBCGUEm71ww",
  authDomain: "crown-clothing-17fe4.firebaseapp.com",
  projectId: "crown-clothing-17fe4",
  storageBucket: "crown-clothing-17fe4.appspot.com",
  messagingSenderId: "406709894501",
  appId: "1:406709894501:web:8b8aca7514f8f5dacd758c",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//signing in
export const auth = getAuth();

//Signing in with google popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
//Signing in with google redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// creating a collection and document in firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

// getting date from categories and documents from firestore
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  //console.log("query: ", q);
  const querySnapshot = await getDocs(q);
  //console.log("query snapshot: ", querySnapshot);
  //console.log("query snapshot docs: ", querySnapshot.docs);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //console.log(acc, docSnapshot, docSnapshot.data());
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// creating user collection and document in data in user does not exists already.
export const createUserDocumentfromAuth = async (userauth, additionalInfo) => {
  console.log("I am about to create db document");
  const userDocRef = doc(db, "user", userauth.uid);

  const userSnapshot = await getDoc(userDocRef);
  //console.log("Db is created");
  if (!userSnapshot.exists()) {
    const { displayName, email } = userauth;
    const createAt = new Date();

    try {
      setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInfo,
      });
      console.log("User is created");
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("User already exists");
    return userDocRef;
  }
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  console.log(email, password);
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUser = async (email, password) => {
  if (!email || !password) return;
  console.log(email, password);
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
