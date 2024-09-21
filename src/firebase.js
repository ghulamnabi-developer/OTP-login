import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to set up RecaptchaVerifier
const setUpRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha-container',  // The ID of the container where recaptcha will be rendered
    {
      'size': 'invisible',  // Makes Recaptcha invisible to the user
      'callback': (response) => {
        console.log('Recaptcha verified');
      }
    },
    auth  // Pass in the auth instance
  );
};

export { auth, setUpRecaptcha, signInWithPhoneNumber };
