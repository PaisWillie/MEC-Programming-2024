// Import the Firestore SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, doc, addDoc, setDoc, getDocs } from "firebase/firestore";
import { configDotenv } from "dotenv";
const dotenv = configDotenv();

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: dotenv.parsed.FIREBASE_APIKEY,
    authDomain: dotenv.parsed.FIREBASE_AUTHDOMAIN,
    projectId: dotenv.parsed.FIREBASE_PROJECTID,
    storageBucket: dotenv.parsed.FIREBASE_STORAGEBUCKET,
    messagingSenderId: dotenv.parsed.FIREBASE_MESSAGINGSENDERID,
    appId: dotenv.parsed.FIREBASE_APPID,
    measurementId: dotenv.parsed.FIREBASE_MEASUREMENTID
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersRef = collection(db, 'users');

const addUser = async (req, res) => {
    const { id } = req.body;
    try {
        const userDoc = doc(usersRef, id);
        await setDoc(userDoc, {}); // Initializes user document with an empty object
        console.log(`User ${id} created successfully.`);
        res.json({ message: `User ${id} created successfully.` });
    } catch (error) {
    console.error("Error creating user:", error);
    }
}

const addUserLogin = async (req, res) => {
    const { id, platform, username, password } = req.body;
    try {
        const userLoginDoc = doc(db, `users/${id}/logins`, platform);
        await setDoc(userLoginDoc, {
            username,
            password
        }, { merge: true }); // Merges if the platform exists, creating if it doesn’t
        console.log(`Login for platform ${platform} added/updated successfully for user ${id}.`);
        res.json({ message: `Login for platform ${platform} added/updated successfully for user ${id}.` });
    } catch (error) {
        console.error("Error adding/updating user login:", error);
    }
}

/*
async function getUserLogins(email) {
  try {
    const userLoginsRef = collection(db, `users/${email}/logins`);
    const querySnapshot = await getDocs(userLoginsRef);
    const logins = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("User logins retrieved successfully:", logins);
    return logins;
  } catch (error) {
    console.error("Error getting user logins:", error);
    return [];
  }
}
  */

const getUserLogins = async (req, res) => {
    const { id } = req.body;
    try {
        // Reference the logins subcollection within the user's document
        const userLoginsRef = collection(db, `users/${id}/logins`);
        
        // Retrieve all documents within the logins subcollection
        const querySnapshot = await getDocs(userLoginsRef);
        
        // Map each document in the query snapshot to an object with id and data
        const logins = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        console.log(`User logins retrieved successfully for user ${id}:`, logins);
        res.json(logins);
    } catch (error) {
        console.error("Error getting user logins:", error);
        res.json({});
    }
};

export { addUser, addUserLogin, getUserLogins };