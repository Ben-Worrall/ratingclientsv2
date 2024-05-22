
import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs,deleteDoc, deleteField, addDoc, getDoc, setDoc} from 'firebase/firestore'
import $ from 'jquery'
import LOADED from '../functions/HostGetCode';
import { useEffect } from 'react';
import GetResult from '../functions/GetResults';
const db = getFirestore()


const SaveAndCloseBNT = async ()=> {
    
  var canRun = true

  document.getElementById('CircleHostRoom').style.display = ""
  document.getElementById('CircleHostRoomBackground').style.display = ""


function testFunc(){
    if(canRun){
      console.log('can run func')
      CanRunFunc()
    } else if(!canRun) {
      alert('Already got that name saved')
      return
    }
}



async function CanRunFunc(){

    console.log('yes it is saved and now will run this function')






    

//GET EVERYTHING THAT IS NEEDED





  //get name of each factor
  var FactorsListAr = JSON.parse(localStorage.getItem(`${document.getElementById('RoomPasswordText').innerText}factors`))
    //sort the factors list out
    FactorsListAr = FactorsListAr.sort((a,b) => a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
  //get document id from server list
  var DocId = ""
  const querySnapshotID = await getDocs(collection(db, "Servers"))
  querySnapshotID.forEach(async(docs)=>{
    if(docs.data().UserName == localStorage.getItem('User-Name')){
      if(docs.data().UserPassword == localStorage.getItem('User-Password')){
        if(docs.data().code == document.getElementById('RoomPasswordText').innerText){
          DocId = docs.id
        }
      }
    }
  })
  var DocumentIdServer = DocId
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
    ClientName: document.getElementById('SaveCloseClientsName').value,
    Code: ServerCode,
    FinalScore: document.getElementById('HostFSinput').value,
    OverallScore:document.getElementById('HostOSinput').value
  }
  for(let i = 0; i < FactorsListAr.length; i++){
    //console.log(FactorsListAr[i])
    let fac =  (FactorsListAr[i])
    DocData[fac] = fac

  }
  console.log(DocData)
  await setDoc(CurDocSavedResults, DocData)
  

  
  //ADD SUB COLLECTIONS TO THE NEWLY CREATED DOCUMENT (in "SavedResults")


  //for overall scores

  const colRef1 = collection(CurDocSavedResults, 'Overall Score')
  var CurFactorCol = collection(db,'Servers/' + DocumentIdServer + '/Overall Score');
  //search through the docs of the collection but pass through the host document
  let SubDocs = await getDocs(CurFactorCol)
  //look through the documents
   SubDocs.forEach(async subDoc => {
    if(!subDoc.data().Host){
      //then append each set 
      addDoc(colRef1, {
        OverallScore: subDoc.data().OverallScore,
        OverallScoreNOTES: subDoc.data().OverallScoreNOTES,
        Username: subDoc.data().Username
        
      });
     }
   })
   addDoc(colRef1, {
    Anchor: "Anchor"
 });

  //for the factors

  for(let i = 0; i < FactorsListAr.length; i++){
    //for each factor, create subcollection
    const colRef2 = collection(CurDocSavedResults, (FactorsListAr[i]))


    //GET DATA FROM THE ORIGINAL SUB COLLECTION FROM THE SERVER DOC
    
    var CurFactorCol = collection(db,'Servers/' + DocumentIdServer + '/'+ (FactorsListAr[i]));
    //search through the docs of the collection but pass through the host document
    let SubDocs = await getDocs(CurFactorCol)
    //look through the documents
     SubDocs.forEach(async subDoc => {
       //skip over the host doc
       if(!subDoc.data().Host){
        //then append each set 
        addDoc(colRef2, {
          Notes: subDoc.data().Notes,
          Rating: subDoc.data().Rating,
          Username: subDoc.data().Username
        });
       }
     })
     addDoc(colRef2, {
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



       //final score
       let FinalScore = document.getElementById('HostFSinput').value
       let FinalScoreTR = document.createElement('tr')
       let FinalScoreTD = document.createElement('td')
       let FinalScoreTDText = document.createElement('td')
       FinalScoreTDText.innerText = "Final Score"
       FinalScoreTD.innerText = FinalScore
       FinalScoreTR.appendChild(FinalScoreTDText)
       FinalScoreTR.appendChild(FinalScoreTD)
       ExcelTable.appendChild(FinalScoreTR)





/*
       //overall score
       let OverallScore = document.getElementById('HostOSinput').value
       let OverallScoreTR = document.createElement('tr')
       let OverallScoreTD = document.createElement('td')
       let OverallScoreTDText = document.createElement('td')
       OverallScoreTDText.innerText = "Overall Score"
       OverallScoreTDText.style.fontWeight = "bold"
       OverallScoreTD.innerText = OverallScore
       OverallScoreTR.appendChild(OverallScoreTDText)
       OverallScoreTR.appendChild(OverallScoreTD)
       ExcelTable.appendChild(OverallScoreTR)
*/









 
       let EachFactorTR = document.createElement('tr')

       //overall score
       
       let overallScoreText = document.createElement('td')
       let overallScoreAverage = document.createElement('td')
       let overallScoreNotes = document.createElement('td')

       overallScoreText.innerText = "Overall Score"
       overallScoreText.style.fontWeight = "bold"

       overallScoreAverage.innerText = "Average: " + document.getElementById('HostOSinput').value
       
       overallScoreNotes.innerText = "Notes:"

       EachFactorTR.appendChild(overallScoreText)
       EachFactorTR.appendChild(overallScoreAverage)
       EachFactorTR.appendChild(overallScoreNotes)



       //quesitons
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
           EachFactorNameTD.style.fontWeight = "bold"
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
           AllUsernames.forEach(async(user)=>{
              //console.log(user)
              let EachUserRatingsTotalTR = document.createElement('tr')

              




              
              //USERS RESULTS






              //overall score

              var CurFactorCol = collection(db,'Servers/' + doc.id + '/Overall Score');
              //search through the docs of the collection but pass through the host document
              let SubDocs = await getDocs(CurFactorCol)
              //look through the documents
              SubDocs.forEach(async subDoc => {
                      if(!subDoc.data().Host){

                        if(subDoc.data().Username == user){
                          
                          let UserEachNameTD_OS = document.createElement('td')
                          let UserEachRatingTD_OS = document.createElement('td')
                          let UserEachNotesTD_OS = document.createElement('td')
                          UserEachNameTD_OS.innerText = await subDoc.data().Username 
                          UserEachRatingTD_OS.innerText =await subDoc.data().OverallScore
                          UserEachNotesTD_OS.innerText = await subDoc.data().OverallScoreNOTES
                          //console.log(user)
                          EachUserRatingsTotalTR.appendChild(UserEachNameTD_OS)
                          EachUserRatingsTotalTR.appendChild(UserEachRatingTD_OS)
                          EachUserRatingsTotalTR.appendChild(UserEachNotesTD_OS)

                        }
                        
                      }
              })







              //quesitons

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
  var DocId = ""
  const querySnapshotID = await getDocs(collection(db, "Servers"))
  querySnapshotID.forEach(async(docs)=>{
    if(docs.data().UserName == localStorage.getItem('User-Name')){
      if(docs.data().UserPassword == localStorage.getItem('User-Password')){
        if(docs.data().code == document.getElementById('RoomPasswordText').innerText){
          DocId = docs.id
        }
      }
    }
  })
  //delete the server sub collections (factors)
  //otherwise documents will still apear and only the server code will be deleted
  //access tlocalstorage to get the factors(collection names)
  const querySnapshot = await getDocs(collection(db, "Servers", DocId, "Overall Score"));
    
  querySnapshot.forEach(async(docs) => {
   //get collections documents ids
     let DocRefId = docs.id
     console.log(DocRefId)
     //get sub collection
     let CurCollection = collection(db, "Servers", DocId, "Overall Score")
     //get doc from sub collection
     let curDoc = doc(CurCollection, DocRefId)
     await deleteDoc(curDoc)
   
 });


  var AllFactorsAr = JSON.parse(localStorage.getItem(`${document.getElementById('RoomPasswordText').innerText}factors`))
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




    document.getElementById('ToHomeAfterSave').click()
    console.log('start proceaa')
  }

  setTimeout(ChangeToSuccess,6000)



   }
  }











  if(document.getElementById('SaveCloseName').value !== ""){
    if(document.getElementById('SaveCloseClientsName').value !== ""){
      
      
     
      

  
        //check if user has a result saved as that name
      var CurFactorCol = collection(db,'SavedResults');
      //search through the docs of the collection but pass through the host document
      let SubDocs = await getDocs(CurFactorCol)
      
      //look through the documents
      var subDocAmount = 0
      var SubDocsAr = []
      SubDocs.forEach(async(subdoc) =>{
        await SubDocsAr.push(subdoc)
      })


        for(let i = 0; i < SubDocsAr.length; i++){
        let HostUsername = localStorage.getItem('User-Name')
        let HostPassword = localStorage.getItem('User-Password')
        let HostSavedAs = document.getElementById('SaveCloseName').value
  
        
         if(await SubDocsAr[i].data().Username == HostUsername){
          if(await SubDocsAr[i].data().Password == HostPassword){
            if(await SubDocsAr[i].data().SavedAs == HostSavedAs){
              canRun = false
              console.log('stop')
              testFunc()
              break
              
            }
            
            
          }
          
        }
        console.log('continue')
        //console.log(SubDocsAr[i].data().SavedAs)
        if(i = SubDocsAr.length - 1){
          console.log('run func')
          testFunc()
        }
        
       }

      






      

      

}else{
  alert('please fill in all inputs')
}

}else{
alert('please fill in all inputs')
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