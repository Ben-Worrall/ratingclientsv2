
import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs,deleteDoc, deleteField, addDoc, getDoc, setDoc} from 'firebase/firestore'
import $ from 'jquery'
import LOADED from '../functions/HostGetCode';
import { useEffect } from 'react';
import GetResult from '../functions/GetResults';
const db = getFirestore()


const SaveAndCloseBNT = async ()=> {
    
  if(document.getElementById('SaveCloseName').value !== ""){
    if(document.getElementById('SaveCloseClientsName').value !== ""){
      




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



























 //DOWNLOAD AS EXCEL


    //create table for excel
    let ExcelTable = document.createElement('table')
    ExcelTable.id = "ExcelTable"
    ExcelTable.style.display = "none"
    document.getElementById('HostRoomApp').appendChild(ExcelTable)







    //get the client's name
    let ClientName = document.getElementById('SaveCloseClientsName').value
    let ClientNameTR = document.createElement('tr')
    let ClientNameTD = document.createElement('td')
    let ClientNameTDText = document.createElement('td')
    ClientNameTDText.innerText = "Client"
    ClientNameTD.innerText = ClientName
    ClientNameTR.appendChild(ClientNameTDText)
    ClientNameTR.appendChild(ClientNameTD)
    ExcelTable.appendChild(ClientNameTR)
    //console.log(ClientName)



    let allFactos = document.querySelectorAll('.Resultfactor')
    allFactos.forEach(async(Factor) => {
        //get each question
        //console.log(Factor.childNodes[0].value)
        //each question's average rating
        //console.log(Factor.childNodes[1].childNodes[0].innerText)
        let EachFactorNameTD = document.createElement('td')
        let EachFactorTDavg = document.createElement('td')
        let EachFactorTR = document.createElement('tr')
        EachFactorNameTD.innerText = Factor.childNodes[0].value
        EachFactorTDavg.innerText = "Score: " + Factor.childNodes[1].childNodes[0].innerText
        EachFactorTR.appendChild(EachFactorNameTD)
        EachFactorTR.appendChild(EachFactorTDavg)
        ExcelTable.appendChild(EachFactorTR)

          //get each user from each factor




          //get each user from each factor

 



//get stats from db collection



const colRef = collection(db, "Servers");
const docsSnap = await getDocs(colRef);
//search through and find the doc with the code
docsSnap.forEach(async doc => {
    var Code = localStorage.getItem('code')
    
 //find and establish the doc of the server u made
 if(doc.data().code == Code){
    


// 2nd step is to access sub collection with id of the doc that matches the code
var CurFactorCol = collection(db,'Servers/' + doc.id + '/'+ Factor.childNodes[0].value);
//search through the docs of the collection but pass through the host document
let SubDocs = await getDocs(CurFactorCol)
//look through the documents
SubDocs.forEach(async subDoc => {
        //skip over the host doc
        if(!subDoc.data().Host){
            if(!subDoc.data().Anchor){


          
          //console.log(Factor.childNodes[0].value)
          //console.log(subDoc.data().Username)
          //console.log(subDoc.data().Rating)
          //console.log(subDoc.data().Notes)
          let EachFactorName = document.createElement('td')
          let EachFactorUserNameTD = document.createElement('td')
          let EachFactorUserRatingTD = document.createElement('td')
          let EachFactorUserNotesTD = document.createElement('td')
          let EachFactorUserTR = document.createElement('tr')

          EachFactorName.innerText = Factor.childNodes[0].value
          EachFactorUserNameTD.innerText = "Name: " + subDoc.data().Username
          EachFactorUserRatingTD.innerText = "Rating: " + subDoc.data().Rating
          EachFactorUserNotesTD.innerText = "Notes: "+subDoc.data().Notes
          
          EachFactorUserTR.appendChild(EachFactorName)
          EachFactorUserTR.appendChild(EachFactorUserNameTD)
          EachFactorUserTR.appendChild(EachFactorUserRatingTD)
          EachFactorUserTR.appendChild(EachFactorUserNotesTD)
          ExcelTable.appendChild(EachFactorUserTR)

        



            }
          
         }
                     

            

        })
    
 

 }

})








});












//downlaod table
function exportTableToExcel() {
  // Get the table element using the provided ID
  const table = document.getElementById('ExcelTable');

  // Extract the HTML content of the table
  const html = table.outerHTML;

  // Create a Blob containing the HTML data with Excel MIME type
  const blob = new Blob([html], {type: 'application/vnd.ms-excel'});

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element for downloading
  const a = document.createElement('a');
  a.href = url;

  // Set the desired filename for the downloaded file
  a.download = `${document.getElementById('SaveCloseClientsName').value}.xls`;

  // Simulate a click on the anchor to trigger download
  a.click();

  // Release the URL object to free up resources
  URL.revokeObjectURL(url);
  document.getElementById('ExcelTable').remove()
}




setTimeout(function() { exportTableToExcel();; }, 5000)






























  async function ChangeToSuccess(){
    // quits the website or refreshes then get put code back in data base and delete the server

 //get code
 
  let x = document.getElementById('RoomPasswordText').innerText
  let y = String(x)
  let z = Number(y)
  //put the server code back
  const docRef = doc(db, "AvailableCodes", "bTqLQ7U8f7ScZu6uXXjj")
  await updateDoc(docRef, {[y]: z})
  //delete the server from the Servers collection
  let DocId = localStorage.getItem('DocId')

  //delete the server sub collections (factors)
  //otherwise documents will still apear and only the server code will be deleted
  //access tlocalstorage to get the factors(collection names)
  var AllFactorsAr = JSON.parse(localStorage.getItem('factors'))
  for(let i = 0; i< AllFactorsAr.length; i++){
    //get the collection
    const querySnapshot = await getDocs(collection(db, "Servers", DocId, AllFactorsAr[i]));
    
     querySnapshot.forEach(async(docs) => {
      //get collections documents ids
        let DocRefId = docs.id
        console.log(DocRefId)
        //get sub collection
        let CurCollection = collection(db, "Servers", DocId, AllFactorsAr[i])
        //get doc from sub collection
        let curDoc = doc(CurCollection, DocRefId)
        await deleteDoc(curDoc)
      
    });

   
  }

  //delete the server document
  await deleteDoc(doc(db, "Servers", DocId))



     //back to normal
     
    localStorage.removeItem("code")
    localStorage.removeItem("factors")
    localStorage.removeItem("DocId")

    document.getElementById('ToHomeAfterSave').click()
    console.log('start proceaa')
  }

  //setTimeout(ChangeToSuccess,6000)





    } else {
      alert('Please fill in all inputs')
    }

  } else {
    alert('Please fill in all inputs')
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