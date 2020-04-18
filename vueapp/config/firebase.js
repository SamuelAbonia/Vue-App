import firebase from 'firebase/app'
import 'firebase/firestore'

let config = { 
  apiKey: "AIzaSyC-R1Ds1_PF5SiDnBJmFS43GbTLqk-EEUk",
    authDomain: "foro-8955e.firebaseapp.com",
    databaseURL: "https://foro-8955e.firebaseio.com",
    projectId: "foro-8955e",
    storageBucket: "foro-8955e.appspot.com",
    messagingSenderId: "970214033059",
    appId: "1:970214033059:web:460d3d957eff1f32642116"
}

firebase.initializeApp(config);
const db = firebase.firestore()
const usuarios = db.collection('usuarios')
export {
  db, usuarios
}

