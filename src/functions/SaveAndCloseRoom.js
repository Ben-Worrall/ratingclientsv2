
import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc} from 'firebase/firestore'
import $ from 'jquery'
import LOADED from '../functions/HostGetCode';
import { useEffect } from 'react';
import GetResult from '../functions/GetResults';
const db = getFirestore()


const SaveAndCloseBNT = async ()=> {
    
  
  //GET EVERYTHING THAT IS NEEDED


  //get name of each factor
  var FactorsListAr = JSON.parse(localStorage.getItem('factors'))
    //sort the factors list out
    FactorsListAr = FactorsListAr.sort((a,b) => a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
  //get document id from server list
  var DocumentIdServer = localStorage.getItem('DocId')
  // get code
  var ServerCode = localStorage.getItem('code')
  // get username
  var UserName = localStorage.getItem('User-Name')
  //get password
  var UserPassword = localStorage.getItem('User-Password')
  //get what the user saved it as
  var SavedAs = document.getElementById('SaveCloseName').value


  //CREATE A NEW DOCUMENT THAT WILL BE STORED IN SAVE RESULTS
  
  //create a document in the "SavedResults" collection
  const CurDocSavedResults = await addDoc(collection(db, "SavedResults"),{
    Anchor:"Anchor"
  })
  
  var DocData = {
    Username: UserName,
    Password: UserPassword,
    SavedAs: SavedAs,
    Code: ServerCode
  }
  for(let i = 0; i < FactorsListAr.length; i++){
    //console.log(FactorsListAr[i])
    let fac =  (FactorsListAr[i])
    DocData[fac] = fac

  }
  console.log(DocData)
  await setDoc(CurDocSavedResults, DocData)
  

  
  //ADD SUB COLLECTIONS TO THE NEWLY CREATED DOCUMENT (in "SavedResults")

  for(let i = 0; i < FactorsListAr.length; i++){
    //for each factor, create subcollection
    const colRef = collection(CurDocSavedResults, (FactorsListAr[i]))


    //GET DATA FROM THE ORIGINAL SUB COLLECTION FROM THE SERVER DOC
    
    var CurFactorCol = collection(db,'Servers/' + DocumentIdServer + '/'+ (FactorsListAr[i]));
    //search through the docs of the collection but pass through the host document
    let SubDocs = await getDocs(CurFactorCol)
    //look through the documents
     SubDocs.forEach(async subDoc => {
       //skip over the host doc
       if(!subDoc.data().Host){
        //then append each set 
        addDoc(colRef, {
          Notes: subDoc.data().Notes,
          Rating: subDoc.data().Rating,
          Username: subDoc.data().Username
        });
       }
     })
     addDoc(colRef, {
       Anchor: "Anchor"
    });
    

  }
  




}


export default SaveAndCloseBNT


/*

//GET EVERYTHING THAT IS NEEDED


  //get name of each factor
  var FactorsListAr = JSON.parse(localStorage.getItem('factors'))
    //sort the factors list out
    FactorsListAr = FactorsListAr.sort((a,b) => a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
  //get document id from server list
  var DocumentIdServer = localStorage.getItem('DocId')
  // get code
  var ServerCode = localStorage.getItem('code')
  // get username
  var UserName = localStorage.getItem('User-Name')
  //get password
  var UserPassword = localStorage.getItem('User-Password')
  //get what the user saved it as
  var SavedAs = document.getElementById('SavedCloseName').value


  //CREATE A NEW DOCUMENT THAT WILL BE STORED IN SAVE RESULTS
  
  //create a document in the "SavedResults" collection
  const CurDocSavedResults = await addDoc(collection(db, "SavedResults"), {
    Username: UserName,
    Password: UserPassword,
    SavedAs: SavedAs,
    Code: ServerCode

  })
  
  var DocData = {}
  for(let i = 0; i < FactorsListAr.length; i++){
    DocData.FactorsListAr[i] = FactorsListAr[i]
  }
  
  await setDoc(CurDocSavedResults, DocData)


*/