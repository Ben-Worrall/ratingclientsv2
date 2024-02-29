import {useNavigate} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'
import $ from 'jquery'
import LOADED from '../functions/HostGetCode';
import { useEffect } from 'react';

const db = getFirestore()


const ShowResultsSavedPopup = async () => {
    function CloseBackground(){
        document.getElementById('SavedResPopups').remove()
        document.getElementById('SavedResBackground').remove()

    }


    //show popup
    let SavedResPopups = document.createElement('div')
    SavedResPopups.id = "SavedResPopups"

    //background for popup
    let SavedResBackground = document.createElement('div')
    SavedResBackground.id = "SavedResBackground"
    SavedResBackground.onclick = CloseBackground

   document.getElementById('Holder').appendChild(SavedResPopups)
   document.getElementById('Holder').appendChild(SavedResBackground)

   //get data from server related to user's name and password
   const querySnapshot = await getDocs(collection(db, "SavedResults"));
   


}


export default ShowResultsSavedPopup


