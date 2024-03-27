import { Link, useParams} from "react-router-dom";
import CreateRoomHTML from "./routes/CreateRoom";
import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import JoinRoom from "./routes/JoinRoom";
import { useBeforeunload } from 'react-beforeunload'
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc} from 'firebase/firestore'
import Register from "./functions/Register";
import Login from "./functions/Login";
import LogOut from "./functions/LogOut";
import ShowResultsSavedPopup from "./functions/ShowResultsSavedPopup";
import SavedResult from "./routes/SavedResult";




const db = getFirestore()






 


const Home =  () => {
  const initialized = useRef(false)

  useEffect(()=>{
    
    if (!initialized.current) {
      
      if(localStorage.getItem('logged-in') == "true"){
        console.log(document.getElementById('LoginRegisterPOPUP'))
        console.log(document.getElementById('LoginRegisterPOPUP-background'))
        document.getElementById('LoginRegisterPOPUP').style.display = "none"
        document.getElementById('LoginRegisterPOPUP-background').style.display = "none"
        document.getElementById('ShowUsername').value = ((localStorage.getItem('User-Name')))


      }
      initialized.current = true
      
    }
    
  }, [])
 
  
  
  let navigate = useNavigate();
  


  //create room button function
  async function CreateRoomURL(){



   //generate random code

var randomCode 
var readyToUse
var CurStringCode
function GenerateCode(){
  randomCode = Math.floor(1000 + Math.random() * 9000)
  //randomCode = 1000
}

//generate random code from database
GenerateCode()
const GetRandomCode = async () => {

    
    
  //query the random code and then get that code from the database

  const querySnapshot = await getDocs(collection(db, "AvailableCodes"));
  querySnapshot.forEach((doc) => {
  if(doc.data()[randomCode] = randomCode){
    readyToUse = doc.data()[randomCode]
  }
  localStorage.setItem('code', readyToUse)
 
 });

 CurStringCode = String(readyToUse)
 //delete the code from the database after accessing it
 const deleteFields = doc(db, "AvailableCodes", "bTqLQ7U8f7ScZu6uXXjj")
 await updateDoc(deleteFields, {[CurStringCode]: deleteField()})
 

}


GetRandomCode()

setTimeout(navigate('/routes/CreateRoom/'), 2000)
setTimeout(function(){const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CreateRoomHTML />
  </BrowserRouter>,
  document.getElementById('root')
)}, 2050)




  }
  
  
  async function JoinRoomURL(){
    navigate('/routes/JoinRoom/')
    window.location.reload()
   
 }

 function ToSavedResult(){
  navigate('/routes/SavedResult')
  window.location.reload()
 }








async function CheckCodes(){



  for(let i = 0; i < localStorage.length; i++){
  
    var PossibleCode = localStorage.key(i).substring(0,4)
    let curLocalStorageKey = localStorage.key(i)
    if(isNaN(Number(PossibleCode)) == false){
      //console.log(Number(PossibleCode))
      const colRef = collection(db, "Servers");
   const docsSnap = await getDocs(colRef);
   let expectedServerAlive = false
   docsSnap.forEach(doc => {
       //console.log(doc.data());
       //if server doc.code matches with gamecode 
       if(doc.data().code == Number(PossibleCode)){
        console.log('servers are still live')
        expectedServerAlive = true
  
       }
     })
     if(expectedServerAlive == false){
      localStorage.removeItem(curLocalStorageKey)
     }
    } 
    
    
    
   }




}

CheckCodes()

if(localStorage.getItem("code")){
  localStorage.removeItem("code")
}
if(localStorage.getItem("UserName")){
  localStorage.removeItem("UserName")
}











    return (
      <div id="Holder">

        <input id="ShowUsername"></input>
        <button id="SavedResultsHomeScreen" onClick={ShowResultsSavedPopup}>Saved Results</button>

        <button id="LogOutBNT" onClick={LogOut}>Log Out</button>
        <div id="LoginRegisterPOPUP">
             <div id="LoginHolderBNT">
                <p style={{margin:"1%", fontWeight:"bold"}}>Login:</p>
                <div className="infoClassLogReg">
                  <div className="TextClassLogReg">Username:</div> 
                  <input className="InputClassLogReg" id="LoginNameInput"></input>
                </div>

                <div className="infoClassLogReg">
                  <div className="TextClassLogReg">Password:</div> 
                  <input className="InputClassLogReg" id="LoginPasswordInput"></input>
                </div>
                <button id="LoginBNT-logres" onClick={Login}>Login</button>
              </div>

              <div id="RegisterHolderBNT">
                <p style={{margin:"1%", fontWeight:"bold"}}>Register:</p>
                <div className="infoClassLogReg">
                  <div className="TextClassLogReg">Username:</div> 
                  <input className="InputClassLogReg" id="RegNameInput"></input>
                </div>

                <div className="infoClassLogReg">
                  <div className="TextClassLogReg">Password:</div>
                  <input className="InputClassLogReg" id="RegPasswordInput"></input>
                </div>
                <button id="RegisterBNT-logres" onClick={Register}>Register</button>
              </div>
        </div>
        <div id="LoginRegisterPOPUP-background" ></div>


        <div id="ButtonHolder">
          
          
          <button className="BNT" onClick={CreateRoomURL}>CreateRoom</button>
          <button className="BNT" onClick={JoinRoomURL}>JoinRoom</button>
          <button  id='ToSavedResult' style={{display:"none"}} onClick={ToSavedResult} ></button>
        
        </div>
        </div>
  
    )
}


export default Home

