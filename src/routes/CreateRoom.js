
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import './styles/CreateRoom.css'
import Home from "../Home";
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import addFactor from '../functions/addQuestion.js'

import HostRoomHTML from './HostRoom.js';
//import ClearText from '../functions/CreateRoomFunc.js'
//import CloseFactor from '../functions/CreateRoomFunc.js'
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc} from 'firebase/firestore'
import { txtDB } from '../firebase/firebaseConfig';
import { useBeforeunload } from 'react-beforeunload' 

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
  
  
  
  
  

  
  










  

    let navigate = useNavigate();
    async function GoHomeBNT(){

      


      var curCode = document.getElementById('RoomPasswordText').innerText
      var StringCode = String(curCode)
      var NumCode = Number(StringCode)
      //put the server code back
      const CurData = {[StringCode]: NumCode}
      
       const docRef = doc(db, "AvailableCodes", "bTqLQ7U8f7ScZu6uXXjj")
      
        await updateDoc(docRef, CurData)
        localStorage.clear()
        
         await navigate('/')
          
        


        
          await window.location.reload()
       
        
       
  
      

       //localStorage.clear()
       //navigate('/')
       //window.location.reload()
    
      
     }






     //when user presses start on the "start room" button
    var factorListAr = []
     
     async function GoHostRoom(){
      let docId 
      

      //add server code in the form of a document
      const dbRef = collection(db, "Servers")
      const data = {
        code: Number(document.getElementById('RoomPasswordText').innerHTML)
     };

     for(let i = 0; i < document.querySelectorAll('.factor').length; i++){
      let Factor = document.querySelectorAll('.factor')[i].childNodes[0].value.toString()
      if(Factor !== ""){
        data[Factor] = Factor
      }
      
     }
     addDoc(dbRef, data).then(function(docRef) {
      
      docId = docRef.id
      localStorage.setItem('DocId', docRef.id)

  }).then(async function (){

//find the document that the code was saved to
const docRef = doc(db, "Servers", docId);

//now that we have the document, add a collection for each factor
 //send codes to 
 let AllFactorText = document.querySelectorAll('.factor')




 for(let i = 0; i < AllFactorText.length; i++){
   let value = AllFactorText[i].childNodes[0].value.toString()
     //if the factor isnt empty then move on
      if(value !== ""){
        factorListAr.push(value)
        
      const colRef = collection(docRef , value)
      await addDoc(colRef, {
          Host: "Host"
         });
      console.log(AllFactorText.length)
      console.log(value)
         
     }
   
 }



  })
  .then(function(){

//push the factors to local storage
localStorage.setItem('factors', JSON.stringify(factorListAr))
//send code to local storage
let Code = document.getElementById('RoomPasswordText').innerText
//send code to local storage for hostroom to access
 localStorage.setItem('code', Code)

 
  }).then(function(){


    navigate('/routes/HostRoom/')
    window.location.reload()


  })
     


       
        

    
        
        
     }









    return (
        <div className="App">
            
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
                <button id="StartRoomBNT" onClick={GoHostRoom} >Start Room</button>
                <button id='CreateRoomBackBNT' onClick={GoHomeBNT}>Back</button>
            </div>

        </div>
    )
}





export default CreateRoomHTML