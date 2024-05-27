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
import { useRef } from 'react';
import GetResult from '../functions/GetResults';
import SaveAndCloseBNT from '../functions/SaveAndCloseRoom';
import ConfirmNoSave from '../functions/ConfirmNoSave';
import OverAllScoreDetails from '../functions/OverAllScoreDetails';
import GoHomeNoSave from '../functions/GoHomeNoSave';

const db = getFirestore()








const HostRoomHTML = () => {




  let navigate = useNavigate();

  function toSuccess(){
    navigate('/')
    
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
 


  //go home  without saving
    async function GoHome(){ 
    
     GoHomeNoSave()
    
    
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

  


  //details popup


  const effectRan = useRef(false);
  useEffect(() => {
    if (!effectRan.current) {


var div1 = document.createElement('div')
div1.id = ('white_contentOS')
div1.innerText = ""
div1.style.display = "none"

var div2 = document.createElement('div')
div2.id = ('background_contentOS')
div2.style.display = "none"
div2.onclick = blackClick

document.querySelector('#HostRoomApp').appendChild(div1)
document.querySelector('#HostRoomApp').appendChild(div2)

function blackClick(){
  
  console.log('test')
  div1.style.display = "none"
  div2.style.display = "none"
  div1.innerHTML = ""
}



//notes popup



var div3 = document.createElement('div')
div3.id = ('Notes_white_contentOS')
div3.innerText = ""
div3.style.display = "none"

var div4 = document.createElement('div')
div4.id = ("Notes_background_contentOS")
div4.style.display = "none"
div4.onclick = NotesBlackClick

document.querySelector('#HostRoomApp').appendChild(div3)
document.querySelector('#HostRoomApp').appendChild(div4)

function NotesBlackClick(){
  
  console.log('test')
  div3.style.display = "none"
  div4.style.display = "none"
  div3.innerHTML = ""
}



}
      
return () => effectRan.current = true;
}, []);











//show details for overall score popup

 async function ShowDetailOS (){

  OverAllScoreDetails()
 
 }



 useEffect(()=>{
  localStorage.setItem(document.getElementById('RoomPasswordText').innerText+'LiveServer',   document.getElementById('RoomPasswordText').innerText)
   
}, [])
  
  
    return(
       
        <div className='HostRoomApp' id='HostRoomApp' >
          <div id='CircleHostRoom' style={{display:"none"}}></div>
          <div id='CircleHostRoomBackground'  style={{display:"none"}}></div>

         
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
                     <button id='DetailsBNTOS' onClick={ShowDetailOS}>Details</button>
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
                <button id='HomeButton' onClick={toSuccess}>Home</button>
                <button  id='ToHomeAfterSave' style={{display:"none"}} onClick={toSuccess} ></button>
            </div>



            {/* set the code from the local storage to be the code that appeared */}
           
        </div>
 
    
    )
}

export default HostRoomHTML