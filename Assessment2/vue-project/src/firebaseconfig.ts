import { initializeApp } from 'firebase/app'
// import { getFirestore, collection, getDocs } from 'firebase/firestore'
// import { getDatabase, ref, set, push } from 'firebase/database';

const firebaseConfig = {
    // your application settings
    apiKey: "AIzaSyC_uOiSsA5hNpw26G5sClRATuIue5jM_eE",
    authDomain: "projeteagle.firebaseapp.com",
    databaseURL: "https://projeteagle-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projeteagle",
    storageBucket: "projeteagle.appspot.com",
    messagingSenderId: "127615114263",
    appId: "1:127615114263:web:ac60ed097803ee46795052"
  }


const firebaseAppconfig = initializeApp(firebaseConfig);

// //realtime database : getDatabase()
// const databaseDb = getDatabase(firebaseApp)
// const databaseDbRef = ref(databaseDb,'/users');

// //firestore db  : getFirestore()
// const firestoreDb = getFirestore(firebaseApp);
// const firestoreDbcollection = collection(firestoreDb, 'cities');



// console.log(db)
// console.log(firestoreDbcollection)

// async function getCities(db) {
//   const citiesCol = collection(db, 'users');
//   const citySnapshot = await getDocs(citiesCol);
//   console.log(citySnapshot)
  
  
//   //const cityList = citySnapshot.docs.map(doc => doc.data());
//   //return cityList;
// }
// getCities(db)
export {firebaseAppconfig};