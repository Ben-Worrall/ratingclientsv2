
import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc} from 'firebase/firestore'
import $ from 'jquery'
import LOADED from '../functions/HostGetCode';
import { useEffect } from 'react';
import GetResult from '../functions/GetResults';
const db = getFirestore()


const SaveAndCloseBNT = ()=> {

//create document in SavedResults collection

const ResultsDB = collection(db, "SavedResults")
const ResultsData = {
    
}





//delete the document (server) from the servers collection and put code back in available codes


}


export default SaveAndCloseBNT
