
import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc} from 'firebase/firestore'
import $ from 'jquery'
import LOADED from '../functions/HostGetCode';
import { useEffect } from 'react';
import GetResult from '../functions/GetResults';
const db = getFirestore()


const SaveAndCloseBNT = ()=> {
    



    //if "Save as" input is empty, then alert and not do anything
    //else carry on
    if(document.getElementById('SaveCloseName').value == ""){
        alert('Must be saved with a name')
    }else{
     
        //create document in SavedResults collection

const ResultsDB = collection(db, "SavedResults")
const ResultsData = {
    "UserName": localStorage.getItem('User-Name'),
    "UserPassword":localStorage.getItem('User-Password')
    
}
//for each factor
var factors = JSON.parse(localStorage.getItem('factors'))
factors = factors.sort((a,b) => a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
factors.forEach(async (SubColId) => {


    
     //now that it has been established
     //access teh sub collections to get the data
     

     // 1st step is to access the doc that matches the code
     const colRef = collection(db, "Servers");
     const docsSnap = await getDocs(colRef);
     //search through and find the doc with the code
     docsSnap.forEach(async doc => {
        
      //find and establish the doc of the server u made
      if(doc.data().code == localStorage.getItem('code')){
        var UserRatings = 0
        var UserRatingsLength = 0
        var UserNames = 0


         // 2nd step is to access sub collection with id of the doc that matches the code
         var CurFactorCol = collection(db,'Servers/' + doc.id + '/'+ SubColId);
         //search through the docs of the collection but pass through the host document
         let SubDocs = await getDocs(CurFactorCol)
         //look through the documents
          SubDocs.forEach(async subDoc => {
            //skip over the host doc
            if(!subDoc.data().Host){
              UserRatings = UserRatings + Number(subDoc.data().Rating)
              UserRatingsLength = UserRatingsLength+1
            }

          })





})




console.log(ResultsData)
addDoc(ResultsDB, ResultsData)




//delete the document (server) from the servers collection and put code back in available codes

   

    }
}


export default SaveAndCloseBNT
