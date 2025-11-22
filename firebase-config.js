const firebaseConfig = {
  apiKey: "AIzaSyDpKC_qNkzUkeXmFS2itSEYXayANf2WnLM",
  authDomain: "owino-furniture.firebaseapp.com",
  projectId: "owino-furniture",
  storageBucket: "owino-furniture.firebasestorage.app",
  messagingSenderId: "1009920200474",
  appId: "1:1009920200474:web:456fcd99018ffb7c52a6a3",
  measurementId: "G-77C4B6LSPZ",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
