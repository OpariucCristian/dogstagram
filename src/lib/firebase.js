import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {seedDatabase} from '../seed'
const config = {
    apiKey: "AIzaSyAJbpZ_42l_dTiNdkB6fvzHN1r_SFeLKaw",
    authDomain: "fakestagram-5fd7a.firebaseapp.com",
    projectId: "fakestagram-5fd7a",
    storageBucket: "fakestagram-5fd7a.appspot.com",
    messagingSenderId: "553814547252",
    appId: "1:553814547252:web:9b42f9b1064e998324e361"
};

const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;


export {firebase,FieldValue}