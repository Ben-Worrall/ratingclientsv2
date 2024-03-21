import {useNavigate} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import "../App.css"
import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'
import $ from 'jquery'
import LOADED from '../functions/HostGetCode';
import { useEffect } from 'react';
import ShowEachSavedResult from './ShowEachSavedResult';
import DownloadExcelSavedPopup from './DownloadExcelSavedPopuup';
import DeleteSavedResultPopup from './DeleteSavedResultPopup';


const db = getFirestore()


const ShowResultsSavedPopup = async () => {


    
         //create popup
  let DownloadPopupDiv = document.createElement('div')
  DownloadPopupDiv.id = "DownloadPopupDiv"
  DownloadPopupDiv.style.display = "none"
  let ClientNameInput = document.createElement('input')
  ClientNameInput.placeholder = "Client's Name"
  ClientNameInput.id = "ClientNameInputPopup"
  let DownloadExcel = document.createElement('button')
  DownloadExcel.innerText = "Download"
  DownloadExcel.id = "DownloadExcelPopup"
  DownloadExcel.onclick = DownloadExcelSavedPopup
  DownloadPopupDiv.appendChild(ClientNameInput)
  DownloadPopupDiv.appendChild(DownloadExcel)


  //popup background
  let DownloadPopupDivBG = document.createElement('div')
  DownloadPopupDivBG.id = "DownloadPopupDivBG"
  DownloadPopupDivBG.style.display = "none"
  DownloadPopupDivBG.onclick = DownloadPopupBG

  //create Delete popup

  let DeletePopup = document.createElement('div')
  DeletePopup.id = "DeletePopup"
  DeletePopup.style.display = "none"
  let DeletePopupText = document.createElement('p')
  DeletePopupText.id = "DeletePopupText"
  DeletePopup.appendChild(DeletePopupText)
  let DeleteBNT = document.createElement('button')
  DeleteBNT.id = "DeleteBNT"
  DeleteBNT.innerText = "Delete Forever"
  DeleteBNT.onclick = DeleteSavedResultPopup
  DeletePopup.appendChild(DeleteBNT)





  //create delete background
  let DeletePopupBG = document.createElement('div')
  DeletePopupBG.id = "DeletePopupBG"
  DeletePopupBG.style.display = "none"
  DeletePopupBG.onclick = DeletePopupBGfunc

    
  document.getElementById("Holder").appendChild(DownloadPopupDiv)
  document.getElementById("Holder").appendChild(DownloadPopupDivBG)
  document.getElementById("Holder").appendChild(DeletePopup)
  document.getElementById("Holder").appendChild(DeletePopupBG)




  //delete popup,
 //function to show delete popups
 function ShowDeletePopup(e){
  console.log(e.target.nextSibling.innerText)
  localStorage.setItem('SavedAsText',e.target.nextSibling.innerText)
  //show popup
  document.getElementById('DeletePopup').style.display = ""
  document.getElementById('DeletePopupBG').style.display = ""
  document.getElementById('SavedResBackground').style.display = "none"
  document.getElementById('DeletePopupText').innerText = `Are you sure you want to permanently delete "`+`${e.target.nextSibling.innerText}`+`" ? `

}

  //delete popup background
  function DeletePopupBGfunc(){
     //show popup
     localStorage.removeItem('SavedAsText')
  document.getElementById('DeletePopup').style.display = "none"
  document.getElementById('DeletePopupBG').style.display = "none"
  document.getElementById('SavedResBackground').style.display = ""
  }





 //function to show the download popups
 function ShowDownloadPopup(e){
    console.log(e.target.previousSibling.innerText)
    localStorage.setItem('SavedAs-Name', e.target.previousSibling.innerText)
    document.getElementById('DownloadPopupDiv').style.display = ""
    document.getElementById('DownloadPopupDivBG').style.display = ""
    document.getElementById('SavedResPopups')
    document.getElementById('SavedResBackground')


    
  }

 





   //function to close the download popups
  function DownloadPopupBG(){
    document.getElementById('ClientNameInputPopup').value = ""
    localStorage.removeItem('SavedAs-Name')
    document.getElementById('DownloadPopupDiv').style.display = "none"
    document.getElementById('DownloadPopupDivBG').style.display = "none"
    if(document.getElementById('ExcelTable')){
      document.getElementById('ExcelTable').remove()
    }
    
  }


    function CloseBackground(){
        document.getElementById('DownloadPopupDiv').remove()
        document.getElementById('DownloadPopupDivBG').remove()
        document.getElementById('SavedResPopups').remove()
        document.getElementById('SavedResBackground').remove()
        if(document.getElementById('ExcelTable')){
          document.getElementById('ExcelTable').remove()
        }
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
            downloadExcelBNT.onclick = ShowDownloadPopup
            downloadExcelBNT.classList.add('downloadExcelBNT')
            let DeleteSaved = document.createElement('button')
            DeleteSaved.innerText = "X"
            DeleteSaved.id = "DeleteSavedBNT"
            DeleteSaved.onclick = ShowDeletePopup


            document.getElementById('SavedResPopups').appendChild(DeleteSaved)
            document.getElementById('SavedResPopups').appendChild(SavedResButton)
            document.getElementById('SavedResPopups').appendChild(downloadExcelBNT)
        }
    }
    })
   


}


export default ShowResultsSavedPopup


