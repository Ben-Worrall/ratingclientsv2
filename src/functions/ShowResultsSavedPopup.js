import {useNavigate} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'
import $ from 'jquery'
import LOADED from '../functions/HostGetCode';
import { useEffect } from 'react';
import ShowEachSavedResult from './ShowEachSavedResult';
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
   const queryAllDocs = await getDocs(collection(db, "SavedResults"));

   //search through the documents to find the ones that match with username and password
   queryAllDocs.forEach(async(docs) => {
    if(docs.data().Username == localStorage.getItem('User-Name')){
        if(docs.data().Password == localStorage.getItem('User-Password')){
            //now got their results
            //create a button and append the saved name of the doc
            //then append it to the savedrespopups
            let SavedResButton = document.createElement('button')
            SavedResButton.classList.add("SavedResBNT") 
            SavedResButton.innerText = docs.data().SavedAs
            SavedResButton.onclick = ShowEachSavedResult
            let downloadExcelBNT = document.createElement('button')
            downloadExcelBNT.innerText = "⤓"
            downloadExcelBNT.classList.add('downloadExcelBNT')


            document.getElementById('SavedResPopups').appendChild(SavedResButton)
            document.getElementById('SavedResPopups').appendChild(downloadExcelBNT)
        }
    }
    })
   


}


export default ShowResultsSavedPopup


