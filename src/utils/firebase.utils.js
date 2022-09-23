import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
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
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPjwSqpanB6ZY-ZAG9IxJzgZxaTl2h6fQ",
  authDomain: "crown-clot-db.firebaseapp.com",
  projectId: "crown-clot-db",
  storageBucket: "crown-clot-db.appspot.com",
  messagingSenderId: "1076438414695",
  appId: "1:1076438414695:web:c80149a88acb856a2eabc2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, googleProvider);
};
export const signInWitGooglehRedirect = () => {
  return signInWithRedirect(auth, googleProvider);
};

export const db = getFirestore();

export const addCollectionAndDocument = async (collectioKey, objectsToAdd) => {
  const collectionRef = collection(db, collectioKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object)=> {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  })

  await batch.commit();

  console.log('done');
}

export const getCategoriesAndDocuments = async() => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

  return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }

    return userDocRef;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInhUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUSer = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
