
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



const DownloadExcelSavedPopup = async () => {
    
  if(document.getElementById('ClientNameInputPopup').value == ""){
    alert(`Input can't be empty`)
  }else{








    


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

                //create table for excel
                let ExcelTable = document.createElement('table')
                ExcelTable.id = "ExcelTable"
                ExcelTable.style.display = "none"
                document.getElementById('Holder').appendChild(ExcelTable)






                  //get the client's name
        let ClientName = document.getElementById('ClientNameInputPopup').value
        let ClientNameTR = document.createElement('tr')
        let ClientNameTD = document.createElement('td')
        let ClientNameTDText = document.createElement('td')
        ClientNameTDText.innerText = "Client"
        ClientNameTD.innerText = ClientName
        ClientNameTR.appendChild(ClientNameTDText)
        ClientNameTR.appendChild(ClientNameTD)
        ExcelTable.appendChild(ClientNameTR)
        //console.log(ClientName)



        const {Code, Password, SavedAs, Username,...otherProperties} = doc.data();
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
                        let EachFactorTR = document.createElement('tr')
                        EachFactorNameTD.innerText = Factor
                        EachFactorTDavg.innerText = "Score: " + Math.round((SavedUserRatings / SavedUserRatingsLength) * 10) / 10
                        EachFactorTR.appendChild(EachFactorNameTD)
                        EachFactorTR.appendChild(EachFactorTDavg)
                        ExcelTable.appendChild(EachFactorTR)


                        
                        
                        // 2nd step is to access sub collection with id of the doc that matches the code
                        var CurFactorCol = collection(db,'SavedResults/' + doc.id + '/'+ Factor);
                        //search through the docs of the collection but pass through the host document
                        let SubDocs2 = await getDocs(CurFactorCol)
                        //look through the documents
                         SubDocs2.forEach(async subDoc => {
                                    //skip over the host doc
                                    if(!subDoc.data().Host){
                                        if(!subDoc.data().Anchor){
                        
                        
                                      
                                      //console.log(Factor.childNodes[0].value)
                                      console.log(subDoc.data().Username)
                                      console.log(subDoc.data().Rating)
                                      console.log(subDoc.data().Notes)
                                      let EachFactorName = document.createElement('td')
                                      let EachFactorUserNameTD = document.createElement('td')
                                      let EachFactorUserRatingTD = document.createElement('td')
                                      let EachFactorUserNotesTD = document.createElement('td')
                                      let EachFactorUserTR = document.createElement('tr')
                        
                                      EachFactorName.innerText = Factor
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
                                                  
                        
                        
                        








});













                
                
                
                
                
                
               
                    
                
                                
            }
        }
                    
    }
    })


 
                //downlaod table
                function exportTableToExcel() {
                  console.log(document.getElementById('ClientNameInputPopup').value)
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
                    a.download = `${document.getElementById('ClientNameInputPopup').value}.xls`;
                  
                    // Simulate a click on the anchor to trigger download
                    a.click();
                  
                    // Release the URL object to free up resources
                    URL.revokeObjectURL(url);
                  }
                
                
                
                
                  setTimeout(function() { exportTableToExcel();; }, 5000)


  }
}


export default DownloadExcelSavedPopup
