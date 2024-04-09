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
import SaveAndCloseBNT from '../functions/SaveAndCloseRoom';
import ConfirmNoSave from '../functions/ConfirmNoSave';
const db = getFirestore()








const HostRoomHTML = () => {
  let navigate = useNavigate();

  function toSuccess(){
    navigate('/')
    window.location.reload()
    console.log('should change')
}


  function closeSave(){
    document.getElementById('BackgroundSaveClose').remove()
    document.getElementById('SaveAndClosePOPUP').remove()
  }


  const beforeUnloadListener = async (event) => {
    alert('closing')
   
};

window.addEventListener("beforeunload", beforeUnloadListener);

     //get final results
     function ShowResults(){
      GetResult()
     }
  
     

  //confirm going home without saving
 


  //go home  
    async function GoHome(){ 
      
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
     
    localStorage.removeItem("code")
    localStorage.removeItem("factors")
    localStorage.removeItem("DocId")
    navigate('/')
    window.location.reload()
     
    
    
  }



  //save and close room function
  function SaveGoHomeBNT(){
    //console.log('test')
    //show popup
    let div111 = document.createElement('div')
    div111.id = "SaveAndClosePOPUP"
    //background for popup
    let div222 = document.createElement('div')
    div222.id = "BackgroundSaveClose"
    div222.onclick = closeSave
    //choose name for project save
    let div333 = document.createElement('input')
    div333.id = "SaveCloseName"
    div333.placeholder = "Save as"
    //clients name
    let div444 = document.createElement('input')
    div444.id = "SaveCloseClientsName"
    div444.placeholder = "Client's Name"
    //save button
    let div555 = document.createElement('button')
    div555.id = "SaveCloseButton"
    div555.innerHTML = "Save & Close"
    div555.onclick = SaveAndCloseBNT




    div111.appendChild(div333)
    div111.appendChild(div444)
    div111.appendChild(div555)
    document.getElementById('HostRoomMainDisplay').appendChild(div111)
    document.getElementById('HostRoomMainDisplay').appendChild(div222)
    

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
                   

                   <div style={{display:'flex'}}>
                  <div id='HostOverallScoreDivBackground'>
                     <div id='HostOverallScoreDiv'>
                     <p id='HostOStext'>Overall Score </p>
                     <input id='HostOSinput' placeholder='?' max={10} min={0} type='number' contentEditable='false'></input>
                     <p id='HostOS10'>10</p>
                    </div>
                  </div>

                  <div id='HostFinalScoreDivBackground'>
                      <div id='HostFinalScoreDiv'>
                      <p id='HostFStext'>Final Score </p>
                      <input id='HostFSinput' placeholder='?' max={10} min={0} type='number' contentEditable='false'></input>
                      <p id='HostFS10'>10</p>
                      </div>
                  </div>
                  </div>






                    <div id='ResultBNTholder'>
                      <button id='ShowResultBNT' onClick={ShowResults}>
                        Show Final Results
                      </button>
                    </div>
                

                 </div>




                
            </div>


            <div id="ButtonHolder-WaitingRoom">
                <button id="CloseRoomButton"  onClick={ConfirmNoSave}>Close Room</button>
                <button id="goHomNoSave" style={{display:"none"}}  onClick={GoHome}>Close Room</button>
                <button id="SaveCloseRoomButton"  onClick={SaveGoHomeBNT}>Save & Close Room</button>
                <button  id='ToHomeAfterSave' style={{display:"none"}} onClick={toSuccess} ></button>
            </div>



            {/* set the code from the local storage to be the code that appeared */}
           
        </div>
 
    
    )
}

export default HostRoomHTML