
import { useAsyncError, useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import './styles/CreateRoom.css'
import Home from "../Home";
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import addFactor from '../functions/addQuestion.js'

import HostRoomHTML from './HostRoom.js';
//import ClearText from '../functions/CreateRoomFunc.js'
//import CloseFactor from '../functions/CreateRoomFunc.js'
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc, where} from 'firebase/firestore'
import { txtDB } from '../firebase/firebaseConfig';
import { useBeforeunload } from 'react-beforeunload' 
import GoHostRoom from '../functions/GoHostRoom.js';
const db = getFirestore()




//clear (edit factor) text 
function ClearText(e){
    e.innerText = ""
    e.focus()
}

//exit/close current factor 

function CloseFactor(e){
    console.log(e.parentNode.parentNode)
    e.parentNode.parentNode.remove()

}








const CreateRoomHTML= () => {
  
  
  
  
  


  
  //go home function
    let navigate = useNavigate();
    async function GoHomeBNT(){

      


      var curCode = document.getElementById('RoomPasswordText').innerText
      var StringCode = String(curCode)
      var NumCode = Number(StringCode)
      //put the server code back
      const CurData = {[StringCode]: NumCode}
      
       const docRef = doc(db, "AvailableCodes", "bTqLQ7U8f7ScZu6uXXjj")
      
        await updateDoc(docRef, CurData)
        localStorage.removeItem("code")
        
          navigate('/')
          
        

       //localStorage.clear()
       //navigate('/')
       //window.location.reload()
    
      
     }






     
     //go to host room after starting up
     async function GoHostRoomFunc(){
      console.log("go host room")
    
      GoHostRoom()
    
        
     }









    return (
        <div className="App">
        <div id='CircleCreateRoom' style={{display:"none"}}></div>
        <div id='CircleCreateRoomBackground' style={{display:"none"}}></div>
            
            <div id="RoomPassword">
                <div id="RoomPasswordTextOnly">Room Password:</div>
                <div id="RoomPasswordText">{localStorage.getItem('code')}</div>
                
            </div>






            
            

            <div id='RatingBoard'>
                <div id="AddFactorDiv">
                    <button className="AddFactorBNT" onClick={addFactor}>+</button>
                </div>
            </div>


            <div id="ButtonHolder-CreateRoom">
                <button id="StartRoomBNT" onClick={GoHostRoomFunc} >Start Room</button>
                <button id='CreateRoomBackBNT' onClick={GoHomeBNT}>Back</button>
            </div>

        </div>
    )
}





export default CreateRoomHTML