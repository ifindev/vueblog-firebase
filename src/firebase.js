import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
let config = {};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase.database();
