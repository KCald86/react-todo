//Firebase is a cloud computing tool that includes a lot of features like db management, messaging, machine learning, authentication, and file storage.
//Steps to configure authentication functionality
//1. Create a firebase app at firebase.google.com
//2. Register the app with Firebase
//3. Configure/Initialize firebase in our react app by creating the base.js and .env files
        //a. npm install firebase
        //b. base.js is at the root of the src folder
        //c. .env file HAS TO BE LOCATED in the root of the entire project
//4. Configure GitHub authentication in Firebase and GitHub
//---------- After working in Firebase, we need to code: -----------
//5. Create the context which will house all user info and login/logout functions
//6. Call to login/logout/user functionality in any component we need/want to

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize authentication from firebase - the code we write below should remind you to connect authentication
//from firebase to an OAuth app in GitHub (we go to GitHub.com to create this)
const auth = getAuth(app)

export {auth} //We export auth so we can use this object in the React context (AuthContext)

