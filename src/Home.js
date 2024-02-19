import { Link, useParams} from "react-router-dom";
import CreateRoomHTML from "./routes/CreateRoom";
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import JoinRoom from "./routes/JoinRoom";
import { useBeforeunload } from 'react-beforeunload'
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc} from 'firebase/firestore'

const db = getFirestore()






 


const Home = () => {
  
  
  let navigate = useNavigate();
  


  //create room button function
  async function CreateRoomURL(){



   //generate random code

var randomCode 
var readyToUse
var CurStringCode
function GenerateCode(){
  //randomCode = Math.floor(1000 + Math.random() * 9000)
  randomCode = 1000
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
   
   
   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(
     <BrowserRouter>
       <JoinRoom />
     </BrowserRouter>,
     document.getElementById('root')
   )
   
 }

    return (
      <div id="Holder">
        <div id="LoginRegisterPOPUP">
             <div id="LoginHolderBNT">
                <p>Login:</p>
                <div className="infoClassLogRes"><div className="TextClassLogReg">Username:</div> <input className="InputClassLogReg"></input></div>
                <div className="infoClassLogRes"><div className="TextClassLogReg">Password:</div> <input className="InputClassLogReg"></input></div>
                <button>Login</button>
              </div>

              <div id="RegisterHolderBNT">
                <p>Register:</p>
                <div className="infoClassLogRes">Username: <input className="InputClassLogReg"></input></div>
                <div className="infoClassLogRes">Password: <input className="InputClassLogReg"></input></div>
                <button>Register</button>
              </div>
        </div>
        <div id="LoginRegisterPOPUP-background" ></div>


        <div id="ButtonHolder">
          
          
          <button className="BNT" onClick={CreateRoomURL}>CreateRoom</button>
          <button className="BNT" onClick={JoinRoomURL}>JoinRoom</button>
          <button id="SavedResultsHomeScreen" className="BNT">Saved Results</button>
        
        </div>
        </div>
  
    )
}


export default Home

