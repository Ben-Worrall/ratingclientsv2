import {useNavigate} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Home from '../Home';
import { useEffect } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'
import $ from 'jquery'
import DownloadExcelFunc from './DownloadExcelSavedResult';
import { useDownloadExcel } from 'react-export-table-to-excel';

const db = getFirestore()



const DeleteSavedResultPopup = async () => {

   
    //console.log(localStorage.getItem('SavedAsText'))
        //get the username
        //get users password
        //saved as
        var UserName = localStorage.getItem('User-Name')
        var UserPassword = localStorage.getItem('User-Password')
        var SavedAs = localStorage.getItem('SavedAsText')


        const colRef = collection(db, "SavedResults");
        const docsSnap = await getDocs(colRef);
        docsSnap.forEach(async doc => {
            //console.log(doc.data());
            if(doc.data().Username == UserName){
                if(doc.data().Password == UserPassword){
                    if(doc.data().SavedAs == SavedAs){


                        const querySnapshot = await getDocs(collection(db, "Servers", doc.id, "Overall Score"));
    
                        querySnapshot.forEach(async(docs) => {
                         //get collections documents ids
                           let DocRefId = docs.id
                           console.log(DocRefId)
                           //get sub collection
                           let CurCollection = collection(db, "Servers", doc.id, "Overall Score")
                           //get doc from sub collection
                           let curDoc = doc(CurCollection, DocRefId)
                           await deleteDoc(curDoc)
                         
                       });






                        //get everything except the following
                        //code, password, SavedAs, Username
                        const {Code, Password, SavedAs, Username,...otherProperties} = doc.data();
                        const personClone = {...otherProperties};
                        let ArrOfFactors = Object.keys(personClone)
                        //sort the array
                        ArrOfFactors = ArrOfFactors.sort((a,b) => a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
                        //console.log(ArrOfFactors)
                        //now that we have an array of factors, loop through and paste them in
                        for(let i =0; i < ArrOfFactors.length; i++){
                            var CurFactorCol = collection(db,'SavedResults/' + doc.id + '/'+ ArrOfFactors[i]);
                            //search through the docs of the collection but pass through the host document
                            let SubDocs = await getDocs(CurFactorCol)
                            SubDocs.forEach(async (subDoc) => {
                                //delete docs in all sub collections so sub collection gets deleted
                                 await deleteDoc(subDoc.ref)
                                //console.log(ArrOfFactors[i])
                                //console.log(subDoc.data())

                 
                              })
                        }
                        //delete server file
                        await deleteDoc(doc.ref)
                        //delete the buttons that corrospond to the file 
                        document.querySelectorAll('.SavedResBNT').forEach((MainBNT)=>{
                              if(MainBNT.innerText == SavedAs){
                                 let del = MainBNT.previousSibling
                                 let download = MainBNT.nextSibling
                                 MainBNT.remove()
                                 del.remove()
                                 download.remove()
                                 
                              }
                        })
                        //hide the popup
                        document.getElementById('DeletePopup').style.display = "none"
                        document.getElementById('DeletePopupBG').style.display = "none"
                        document.getElementById('SavedResBackground').style.display = ""
                        
                    }
                }
            }
            
        })
              
    
        

        
}
   
    










export default DeleteSavedResultPopup

