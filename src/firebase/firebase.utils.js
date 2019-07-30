import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCUudbOe8iXV7QLf7xW2lPubtZ_kCNN1No",
  authDomain: "crwn-db-ed9f5.firebaseapp.com",
  databaseURL: "https://crwn-db-ed9f5.firebaseio.com",
  projectId: "crwn-db-ed9f5",
  storageBucket: "",
  messagingSenderId: "1085013618034",
  appId: "1:1085013618034:web:3b7e77c0bb8bc56b"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if(!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if(!snapShot.exists){
		const {displayName, email} = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch(error){
			console.log('error creating user ', error.message);

		}
	}

	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;