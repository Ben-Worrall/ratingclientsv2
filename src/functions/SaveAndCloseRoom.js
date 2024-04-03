
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
  





   //check if user has saved put input for the clients name
   if(document.getElementById('SaveCloseClientsName').value == ""){
       
       alert(`Inputs can't be empty`)

   }else{

















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


       let EachFactorTR = document.createElement('tr')
       let allFactos = document.querySelectorAll('.Resultfactor')
       allFactos.forEach(async(Factor) => {
           //get each question
           console.log(Factor.childNodes[0].value)
           //each question's average rating
           console.log(Factor.childNodes[1].childNodes[0].innerText)


           let EachFactorNameTD = document.createElement('td')
           let EachFactorTDavg = document.createElement('td')
           let EachFactorNotesTag = document.createElement('td')
           
           EachFactorNameTD.innerText = Factor.childNodes[0].value
           EachFactorTDavg.innerText = "Average: " + Factor.childNodes[1].childNodes[0].innerText
           EachFactorNotesTag.innerText = "Notes: "
           EachFactorTR.appendChild(EachFactorNameTD)
           EachFactorTR.appendChild(EachFactorTDavg)
           EachFactorTR.appendChild(EachFactorNotesTag)
           


});



ExcelTable.appendChild(EachFactorTR)






  //get stats from db collection


  var AllUsernames = []


  const colRef = collection(db, "Servers");
  const docsSnap = await getDocs(colRef);
  //search through and find the doc with the code
  docsSnap.forEach(async doc => {
      var server_code = localStorage.getItem('code')
      
   //find and establish the doc of the server u made
   if(doc.data().code == server_code){
      //console.log('found the server')

           


           let allFactos = document.querySelectorAll('.Resultfactor')
        allFactos.forEach(async(Factor) => {
          //console.log('for each factor')
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
            
                //console.log(Factor.childNodes[0].value + " "+  subDoc.data().Username + " "+ subDoc.data().Rating  + " "+  subDoc.data().Notes )
               if(AllUsernames.includes(subDoc.data().Username) == false){
                  AllUsernames.push(subDoc.data().Username)
                 // console.log("pushing for each user")

                  
               }

               


              }
              
           }

          })
          
         })
         //loop thropugh each user and append to the users tr ratings, then appened that to the excel page
         setTimeout(async function () { 
           AllUsernames.forEach((user)=>{
              //console.log(user)
              let EachUserRatingsTotalTR = document.createElement('tr')

              

              //get the factors
              let allFactos = document.querySelectorAll('.Resultfactor')
              allFactos.forEach(async(Factor) => {
     // 2nd step is to access sub collection with id of the doc that matches the code
     var CurFactorCol = collection(db,'Servers/' + doc.id + '/'+ Factor.childNodes[0].value);
     //search through the docs of the collection but pass through the host document
     let SubDocs = await getDocs(CurFactorCol)
     //look through the documents
     SubDocs.forEach(async subDoc => {
                //skip over the host doc
                if(!subDoc.data().Host){
                    if(!subDoc.data().Anchor){
                       if(subDoc.data().Username == user){
                          let UserEachNameTD = document.createElement('td')
                          let UserEachRatingTD = document.createElement('td')
                          let UserEachNotesTD = document.createElement('td')
                          UserEachNameTD.innerText = await subDoc.data().Username 
                          UserEachRatingTD.innerText =await subDoc.data().Rating 
                          UserEachNotesTD.innerText = await subDoc.data().Notes
                          //console.log(user)
                          EachUserRatingsTotalTR.appendChild(UserEachNameTD)
                          EachUserRatingsTotalTR.appendChild(UserEachRatingTD)
                          EachUserRatingsTotalTR.appendChild(UserEachNotesTD)
                       }
                    }
                }
              })
           })



           ExcelTable.appendChild(EachUserRatingsTotalTR)

           })
          }, 1000);
         
      
      
   

   }
   
  })
  












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



   }
  }
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