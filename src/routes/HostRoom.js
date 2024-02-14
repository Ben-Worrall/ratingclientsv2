import {useNavigate} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/HostRoom.css'
import Home from '../Home';

import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'
import $ from 'jquery'
import LOADED from '../functions/HostGetCode';
import { useEffect } from 'react';
import GetResult from '../functions/GetResults';
const db = getFirestore()








const HostRoomHTML = () => {



  const beforeUnloadListener = async (event) => {
    alert('closing')
   
};

window.addEventListener("beforeunload", beforeUnloadListener);

     //get final results
     function ShowResults(){
      GetResult()
     }
  
     
  //go home button  
    let navigate = useNavigate();
    
    async function GoHomeBNT(){ 
      
      
    window.removeEventListener("beforeunload", beforeUnloadListener);

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
     
    localStorage.clear()
    navigate('/')
    window.location.reload()
     
    
    
  }


  
   
  
    return(
       
        <div className='HostRoomApp' id='HostRoomApp' >

         
         {/*  display room code  */}
         
            <div id="RoomPassword">
                <div id="RoomPasswordTextOnly">Room Password:</div>
                <div id="RoomPasswordText" >{localStorage.getItem('code')}</div>
                
            </div>

            {/*  display participants  */}
            <div id='HostRoomMainDisplay'>

                 <div id='ShowResultDisplay'>
                  
                  
                    <button id='ShowResultBNT' onClick={ShowResults}>
                      Show Final Results
                    </button>

                

                 </div>




                
            </div>


            <div id="ButtonHolder-WaitingRoom">
                <button id="CloseRoomButton"  onClick={GoHomeBNT}>Close Room</button>
                
            </div>



            {/* set the code from the local storage to be the code that appeared */}
           
        </div>
 
    
    )
}

export default HostRoomHTML