const firebaseConfig = {
  apiKey: 'put ur key here',
  authDomain: 'put ur data here',
  projectId: 'put ur data here',
  storageBucket: 'put ur data here',
  messagingSenderId: 'put ur data here',
  appId: 'put ur data here',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
