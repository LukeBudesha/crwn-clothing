import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAFAzcRdl_xpQhKuOsMQfY5wu6kWlTNq0s",
    authDomain: "crwn-db-61f76.firebaseapp.com",
    projectId: "crwn-db-61f76",
    storageBucket: "crwn-db-61f76.appspot.com",
    messagingSenderId: "97161209939",
    appId: "1:97161209939:web:47f0c7737737d8b0867ea6"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get(); 
    
    if (!snapShot.exits) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }

    }

    return userRef

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;