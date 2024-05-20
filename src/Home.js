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





async function CheckCodes(){

  console.log('run checkcodes()')
 
   
     if(localStorage.getItem('code')){
      
       const colRef = collection(db, "Servers");
    const docsSnap = await getDocs(colRef);
    let expectedServerAlive = false
    docsSnap.forEach(doc => {
        //console.log(doc.data());
        //if server doc.code matches with gamecode 
        if(doc.data().code == localStorage.getItem('code')){
         console.log('servers are still live')
         expectedServerAlive = true
   
        }
      })
      if(expectedServerAlive == false){
       localStorage.removeItem('code')
       console.log('no server is ther')
      }
     } 
 
 
 }
 
 //CheckCodes()





 //check if server is still alive
 //if not then terminate the localstorage with regard to old server
 var CurStorage = [];
 for (var i = 0; i<localStorage.length; i++) {
     CurStorage[i] = localStorage.key(i);
 }


for(let i =0; i < CurStorage.length; i++){
  
  var safeCodes = []

  if(Number(CurStorage[i].slice(0, 4))){
    //console.log(CurStorage[i].slice(0, 4))

    const querySnapshot = await getDocs(collection(db, "Servers"));
    
     querySnapshot.forEach(async(docs) => {
      if(docs.data().code == CurStorage[i].slice(0, 4)){
        console.log('code: ', CurStorage[i].slice(0, 4)  , 'is still alive')
        safeCodes.push( CurStorage[i].slice(0, 4))
      }
     })
     
     //console.log('code not there! MUST TERMINATE CODE: ', CurStorage[i].slice(0, 4))
     if(safeCodes.includes(CurStorage[i].slice(0, 4))){
        console.log('code is alive and wont be deleted', CurStorage[i].slice(0, 4))
     }else{
        console.log('terminate code: ',CurStorage[i].slice(0, 4))
        localStorage.removeItem(CurStorage[i])
     }
  }
}







 


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
    //window.location.reload()
   
 }

 function ToSavedResult(){
  navigate('/routes/SavedResult')
  //window.location.reload()
 }









//option for user to go back to any open server




//div popup for servers
let ServersPopup = document.createElement('div')
ServersPopup.id = "ServersPopup"
let ServersPopupText = document.createElement('div')
ServersPopupText.innerText = "Live Servers"
ServersPopupText.id = "ServersPopupText"
ServersPopup.appendChild(ServersPopupText)

//div popup background for servers
let ServersPopupBackground = document.createElement('div')
ServersPopupBackground.id = "ServersPopupBackground"
ServersPopupBackground.onclick = ServersBGclick





async function HostRoomURL(){
 //spinning circle for popup
 let LoadingCircle = document.createElement('div')
 LoadingCircle.id = "SavedPopupCircle"


 ServersPopup.appendChild(LoadingCircle)

  //show popups
  document.getElementById('Holder').appendChild(ServersPopup)
  document.getElementById('Holder').appendChild(ServersPopupBackground)
     

  //get data to see if user has any that are live
  //access servers collection search through the lives servers using the username and password
    const querySnapshot = await getDocs(collection(db, "Servers"));
    querySnapshot.forEach((doc) => {
      if(doc.data().UserName == localStorage.getItem('User-Name')){
        if(doc.data().UserPassword == localStorage.getItem('User-Password')){
          let button = document.createElement('button')
          button.classList.add('LiveServerButton')
          button.innerText = `Live Server - Code: ${doc.data().code}`
          button.value = doc.data().code
          button.onclick = liveServerOnclick
          document.getElementById('ServersPopup').appendChild(button)



          if(ServersPopup.contains(LoadingCircle)){
            ServersPopup.removeChild(LoadingCircle)
          }
        }
      }
      
  })
  if(document.getElementById('ServersPopup').getElementsByClassName('LiveServerButton')[0]) {
    return 
  }else{


    if(ServersPopup.contains(LoadingCircle)){
      ServersPopup.removeChild(LoadingCircle)
    }
    

    let Text = document.createElement('div')
    Text.innerText = "You Have No Live Servers"
    Text.style.margin = "2vh"
    Text.style.fontSize = "110%"
    Text.style.fontWeight = "bold"
    Text.style.color = "red"
    document.getElementById('ServersPopup').appendChild(Text)
   
  }


  
}


function ServersBGclick(){
  document.querySelectorAll('.LiveServerButton').forEach(e => e.remove())
  var liToKill = document.getElementById('ServersPopup').childNodes[1];
  if(liToKill){
    liToKill.parentNode.removeChild( liToKill )
  }
 
  document.getElementById('Holder').removeChild(document.getElementById('ServersPopup'))
  document.getElementById('Holder').removeChild(document.getElementById('ServersPopupBackground'))
  
}


async function liveServerOnclick(e){
  console.log(e.target.value)
  localStorage.setItem('code', e.target.value)



  //get all the factors and add it to localstorage

  let factorListAr = []

  const querySnapshot = await getDocs(collection(db, "Servers"));
  querySnapshot.forEach((doc) => {
    if(doc.data().UserName == localStorage.getItem('User-Name')){
      if(doc.data().UserPassword == localStorage.getItem('User-Password')){
        if(doc.data().code == e.target.value){
          const {code, UserName, UserPassword ,...otherProperties} = doc.data();
            const personClone = {...otherProperties};
            


            //turn all the values (factor names) into an array to access
            let ArrOfFactors = Object.keys(personClone)
            ArrOfFactors = ArrOfFactors.sort((a,b) => a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))

           
              //for each factor
            for(let i =0; i<ArrOfFactors.length; i++){
              factorListAr.push(ArrOfFactors[i])
            }

        }

      }
    }
  })

  
  localStorage.setItem(`${e.target.value}factors`, JSON.stringify(factorListAr))




  navigate('/routes/HostRoom/')
}









//show the register option
function Show_Register(){
  document.getElementById('RegisterHolderBNT').style.display = ""
  document.getElementById('Login-Option').style.display = ""
  document.getElementById('Register-Option').style.display = "none"
  document.getElementById('LoginHolderBNT').style.display = "none"



}
//show the login option
function Show_Login(){
  document.getElementById('LoginHolderBNT').style.display = ""
  document.getElementById('Register-Option').style.display = ""
  document.getElementById('Login-Option').style.display = "none"
  document.getElementById('RegisterHolderBNT').style.display = "none"
}











    return (
      <div id="Holder">

        <div id="circleSavedResPopupDownload" style={{display:"none"}}></div>
        <div id="circleBackgroundSavedResPopupDownload" style={{display:"none"}}></div>



        <input id="ShowUsername"></input>
        <button id="SavedResultsHomeScreen" onClick={ShowResultsSavedPopup}>Saved Results</button>
        <button id="LogOutBNT" onClick={LogOut}>Log Out</button>





        <div id="LoginRegisterPOPUP-background" ></div>
        <div id="LoginRegisterPOPUP">

        
          <div id="LoginHolderBNT">
                <p style={{margin:"1%", fontWeight:"bold",  fontSize: "150%", textDecoration:"underline"}}>Login:</p>
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
            <button id="Register-Option" onClick={Show_Register}>Register</button>
             





            <div id="RegisterHolderBNT" style={{display:"none"}}>
                <p style={{margin:"1%", fontWeight:"bold", fontSize: "150%", textDecoration:"underline"}}>Register:</p>
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
            <button id="Login-Option" onClick={Show_Login} style={{display:"none"}}>Login</button>











        </div>



           





        









        <div id="ButtonHolder">
          
          
          <button className="BNT" onClick={CreateRoomURL}>CreateRoom</button>
          <button className="BNT" onClick={JoinRoomURL}>JoinRoom</button>
          <button className="BNT" onClick={HostRoomURL}>HostRoom</button>
          <button  id='ToSavedResult' style={{display:"none"}} onClick={ToSavedResult} ></button>
        
        </div>
        </div>
  
    )
}


export default Home









/*





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











*/