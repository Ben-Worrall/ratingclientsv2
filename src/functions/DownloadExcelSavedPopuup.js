
import {useNavigate} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Home from '../Home';
import { useEffect } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'
import $ from 'jquery'
import { useDownloadExcel } from 'react-export-table-to-excel';

const db = getFirestore()



const DownloadExcelSavedPopup = async (e) => {
    
  var ClientNameText = ""

   //create table for excel
   let ExcelTable = document.createElement('table')
   ExcelTable.id = "ExcelTable"
   ExcelTable.style.display = "none"
   document.getElementById('Holder').appendChild(ExcelTable)




  

      
//console.log(e.target.previousSibling.innerText)

 localStorage.setItem('SavedAs-Name', e.target.previousSibling.innerText)


   

    


    const colRef = collection(db, "SavedResults");
    const docsSnap = await getDocs(colRef);
    //search through and find the doc with the code
    docsSnap.forEach(async doc => {
        var UserName = localStorage.getItem('User-Name')
        var UserPassword = localStorage.getItem('User-Password')
        var SavedAs = localStorage.getItem('SavedAs-Name')
     //find and establish the doc of the server u made
if(doc.data().Username == UserName){
        if(doc.data().Password == UserPassword){
            if(doc.data().SavedAs == SavedAs){

               console.log('works')

               






              
              
              ClientNameText = doc.data().ClientName
              
              


                  //get the client's name
        let ClientNameResult = doc.data().ClientName
        let ClientNameTR = document.createElement('tr')
        let ClientNameTD = document.createElement('td')
        let ClientNameTDText = document.createElement('td')
        ClientNameTDText.innerText = "Client"
        ClientNameTD.innerText = ClientNameResult
        ClientNameTR.appendChild(ClientNameTDText)
        ClientNameTR.appendChild(ClientNameTD)
        ExcelTable.appendChild(ClientNameTR)
        //console.log(ClientName)








        //Final Score
        let FinalScoreResult = doc.data().FinalScore
        let FinalScoreTR = document.createElement('tr')
        let FinalScoreTD = document.createElement('td')
        let FinalScoreTDText = document.createElement('td')
        FinalScoreTDText.innerText = "Final Score "
        FinalScoreTD.innerText = FinalScoreResult
        FinalScoreTR.appendChild(FinalScoreTDText)
        FinalScoreTR.appendChild(FinalScoreTD)
        ExcelTable.appendChild(FinalScoreTR)
        
    






































     //for quesitons, average rating, notes




        let EachFactorTR = document.createElement('tr')



           //overall score
           let EachFactorNameTD_OS = document.createElement('td')
           let EachFactorTDavg_OS = document.createElement('td')
           let EachFactorNotesTag_OS = document.createElement('td')
           
           EachFactorNameTD_OS.innerText = "Overall Score"
           EachFactorNameTD_OS.style.fontWeight = "bold"
           EachFactorTDavg_OS.innerText = "Average: " + doc.data().OverallScore
           EachFactorNotesTag_OS.innerText = "Notes:"

           EachFactorTR.appendChild(EachFactorNameTD_OS)
           EachFactorTR.appendChild(EachFactorTDavg_OS)
           EachFactorTR.appendChild(EachFactorNotesTag_OS)

           




        //for each question
        const {ClientName,FinalScore, OverallScore, Code, Password, SavedAs, Username,...otherProperties} = doc.data();
                            const personClone = {...otherProperties};
                            let allFactors = Object.keys(personClone)
                            //sort the array
                            allFactors = allFactors.sort((a,b) => a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
        allFactors.forEach(async(Factor) => {
            
                        //the average rating for that factor
                        let SavedAvgRating = document.createElement('div')
                        //access all the ratings from the sub collection of the current document with the factor sub collection
                        SavedAvgRating.classList.add('SavedResultRatingFor')
                        // 2nd step is to access sub collection with id of the doc
                        var CurFactorCol = collection(db,'SavedResults/' + doc.id + '/'+ Factor);
                        //search through the docs of the collection but pass through the host document
                        let SubDocs = await getDocs(CurFactorCol)
                        //look through the documents
                        var SavedUserRatings = 0
                        var SavedUserRatingsLength = 0
                         SubDocs.forEach(async subDoc => {
                           //skip over the host doc
                           if(!subDoc.data().Host){
                            if(!subDoc.data().Anchor){
                                SavedUserRatings = SavedUserRatings + Number(subDoc.data().Rating)
                                SavedUserRatingsLength = SavedUserRatingsLength + 1
                            }
                            
                           }
            
                         })
                         //gotten the average ratings
                         //(fac 9)
                         //console.log(Factor, Math.round((SavedUserRatings / SavedUserRatingsLength) * 10) / 10)
                        let EachFactorNameTD = document.createElement('td')
                        let EachFactorTDavg = document.createElement('td')
                        let EachFactorNotesTag = document.createElement('td')
                        
                        EachFactorNameTD.innerText = Factor
                        EachFactorNameTD.style.fontWeight = "bold"
                        EachFactorTDavg.innerText = "Average: " + Math.round((SavedUserRatings / SavedUserRatingsLength) * 10) / 10
                        EachFactorNotesTag.innerText = "Notes:"

                        EachFactorTR.appendChild(EachFactorNameTD)
                        EachFactorTR.appendChild(EachFactorTDavg)
                        EachFactorTR.appendChild(EachFactorNotesTag)


                      })



                      ExcelTable.appendChild(EachFactorTR)


                  

















                  //details from each user
                  




                  //get stats from db collection
                  //get how many users are in the server
                  
                  var AllUsernames = []
                  
                  
                  const colRef = collection(db, "SavedResults");
                  const docsSnap = await getDocs(colRef);
                  //search through and find the doc with the code
                  docsSnap.forEach(async doc => {
                      var UserName = localStorage.getItem('User-Name')
                      var UserPassword = localStorage.getItem('User-Password')
                      var SavedAs = localStorage.getItem('SavedAs-Name')
                   //find and establish the doc of the server u made
                   if(doc.data().Username == UserName){
                      if(doc.data().Password == UserPassword){
                          if(doc.data().SavedAs == SavedAs){
                  
                          
                            const {ClientName,FinalScore, OverallScore, Code, Password, SavedAs, Username,...otherProperties} = doc.data();
                            const personClone = {...otherProperties};
                            let allFactos = Object.keys(personClone)
                            //sort the array
                            allFactos = allFactos.sort((a,b) => a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
                        allFactos.forEach(async(Factor) => {
                  // 2nd step is to access sub collection with id of the doc that matches the code
                  var CurFactorCol = collection(db,'SavedResults/' + doc.id + '/'+ Factor);
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
                                  //console.log(AllUsernames.length)
                               }
                  
                               
                  
                  
                              }
                              
                           }
                  
                          })
                          
                         })







                         //loop thropugh each user and append to the users tr ratings, then appened that to the excel page
                         setTimeout(async function () { 
                           AllUsernames.forEach(async(user)=>{
                              console.log(user)
                              let EachUserRatingsTotalTR = document.createElement('tr')


                              //for overall score


                              var CurFactorCol = collection(db,'SavedResults/' + doc.id + '/Overall Score');
                              //search through the docs of the collection but pass through the host document
                              let SubDocs = await getDocs(CurFactorCol)
                              //look through the documents
                              SubDocs.forEach(async subDoc => {
                                         //skip over the host doc
                                         if(!subDoc.data().Host){
                                             if(!subDoc.data().Anchor){
                                                if(subDoc.data().Username == user){
                                                  let UserEachNameTD_OS = document.createElement('td')
                                                  let UserEachRatingTD_OS = document.createElement('td')
                                                  let UserEachNotesTD_OS = document.createElement('td')
                                                  UserEachNameTD_OS.innerText = await subDoc.data().Username 
                                                  UserEachRatingTD_OS.innerText =await subDoc.data().OverallScore
                                                  UserEachNotesTD_OS.innerText = await subDoc.data().OverallScoreNOTES
                                                
                                                  EachUserRatingsTotalTR.appendChild(UserEachNameTD_OS)
                                                  EachUserRatingsTotalTR.appendChild(UserEachRatingTD_OS)
                                                  EachUserRatingsTotalTR.appendChild(UserEachNotesTD_OS)

                                                }
                                             }
                                            }
                                          })






                             //for the other questions

                              
                  
                              const {ClientName,FinalScore, OverallScore, Code, Password, SavedAs, Username,...otherProperties} = doc.data();
                            const personClone = {...otherProperties};
                            let allFactors = Object.keys(personClone)
                            //sort the array
                            allFactors = allFactors.sort((a,b) => a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
                              allFactors.forEach(async(Factor) => {
                     // 2nd step is to access sub collection with id of the doc that matches the code
                     var CurFactorCol = collection(db,'SavedResults/' + doc.id + '/'+ Factor);
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
                      
                   }
                  
                   }
                   
                  })
                
                
                
                
                
                
              
                
                                
            }
        }
                    
    }
    


 
  })












                //downlaod table
                function exportTableToExcel() {
                  console.log(ClientNameText)
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
                    a.download = `${ClientNameText}.xls`;
                  
                    // Simulate a click on the anchor to trigger download
                    a.click();
                  
                    // Release the URL object to free up resources
                    URL.revokeObjectURL(url);
                  }
                
                
                
                
                  setTimeout(function() { exportTableToExcel();; }, 5000)


  

}

export default DownloadExcelSavedPopup
