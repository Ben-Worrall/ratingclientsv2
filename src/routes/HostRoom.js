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
  let DocId = ""
   
  const queryDocid = await getDocs(collection(db, "Servers"))
  queryDocid.forEach(async(docs)=>{
    if(docs.data().UserName == localStorage.getItem('User-Name')){
      if(docs.data().UserPassword == localStorage.getItem('User-Password')){
        if(docs.data().code == document.getElementById('RoomPasswordText').innerText){
          DocId = docs.id
        }
      }
    }
  })






  //delete the server sub collections (factors)
  const querySnapshot = await getDocs(collection(db, "Servers", DocId, "Overall Score"));
    
  querySnapshot.forEach(async(docs) => {
   //get collections documents ids
     let DocRefId = docs.id
     console.log(DocRefId)
     //get sub collection
     let CurCollection = collection(db, "Servers", DocId, "Overall Score")
     //get doc from sub collection
     let curDoc = doc(CurCollection, DocRefId)
     await deleteDoc(curDoc)
   
 });



  //otherwise documents will still apear and only the server code will be deleted
  //access tlocalstorage to get the factors(collection names)
  var AllFactorsAr = JSON.parse(localStorage.getItem(`${document.getElementById('RoomPasswordText').innerText}factors`))
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




    navigate('/')
    
     
    
    
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

var div1 = document.createElement('div')
div1.id = ('white_contentOS')
div1.innerText = ""
div1.style.display = "none"

var div2 = document.createElement('div')
div2.id = ('background_contentOS')
div2.style.display = "none"
div2.onclick = blackClick


function blackClick(){
  
  console.log('test')
  div1.remove()
  div2.remove()
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

function NotesBlackClick(){
  
  console.log('test')
  div3.remove()
  div4.remove()
  div3.innerHTML = ""
}

















 async function ShowDetailOS (){

  if(document.getElementById('HostOSinput').value !== ""){
    //show the popup for OS
    document.getElementById('HostRoomApp').appendChild(div1)
    document.getElementById('HostRoomApp').appendChild(div2)
    div2.style.display = ""
    div1.style.display = ""
    

    //show results from each user
    // 1st step is to access the doc that matches the code
  const colRef = collection(db, "Servers");
  const docsSnap = await getDocs(colRef);
  //search through and find the doc with the code
  docsSnap.forEach(async doc => {
     
   //find and establish the doc of the server u made
   if(doc.data().code == localStorage.getItem('code')){

    
    // 2nd step is to access sub collection with id of the doc that matches the code
    var CurFactorCol = collection(db,'Servers/' + doc.id + '/Overall Score');
    //search through the docs of the collection but pass through the host document
    let SubDocs = await getDocs(CurFactorCol)
    //look through the documents
     SubDocs.forEach(async subDoc => {
       //skip over the host doc
       if(!subDoc.data().Host){
        console.log(subDoc.data().OverallScore, subDoc.data().Username, subDoc.data().OverallScoreNOTES)
             //div4.onclick = ShowNoteContent
          
        div1.innerHTML +=(`<div id="UsernameTextOS">${subDoc.data().Username}</div>`)
        div1.innerHTML +=(`<div id="RatingTextOS">${subDoc.data().OverallScore}</div>`)
        let button1 = document.createElement('button')
        button1.classList.add('NotesBNTResults1')
        button1.innerText = "Notes"
        button1.value = subDoc.data().Username
        
        div1.appendChild(button1)
        
        
        
        //document.getElementById(subDoc.data().Username + "_" + SubColId).style.display = "block"
        

       }

     })
     
     
     



   }

  })







  }


  let testing = document.getElementById('HostRoomApp')
        testing.addEventListener('click',async function(ev){
          var btn_option = document.getElementsByClassName("NotesBNTResults1");
        Object.keys(btn_option).forEach(async function(key){
            if(ev.target == btn_option[key]){
            console.log(ev.target.value)
            
            const colRef = collection(db, "Servers");
            const docsSnap = await getDocs(colRef);
            //search through and find the doc with the code
            docsSnap.forEach(async doc => {
               
             //find and establish the doc of the server u made
             if(doc.data().code == localStorage.getItem('code')){
               var CurFactorCol = collection(db,'Servers/' + doc.id + '/Overall Score');
               let SubDocs = await getDocs(CurFactorCol)
               //look through the documents
                SubDocs.forEach(async subDoc => {
                  if(subDoc.data().Username === ev.target.value){
                    div3.innerHTML = subDoc.data().OverallScoreNOTES
                    if(div3.innerHTML == ""){
                      div3.innerHTML = "No Notes"
                    }
                      //display the notes popup with the notes according to question and username
                     document.getElementById('HostRoomApp').appendChild(div3)
                     document.getElementById('HostRoomApp').appendChild(div4)
                     div3.style.display = ""
                     div4.style.display = ""
                    return
                  }
                    
                 
                })
     
              }
            })
          }
        })
      })
 }

 useEffect(()=>{
  localStorage.setItem(document.getElementById('RoomPasswordText').innerText+'LiveServer',   document.getElementById('RoomPasswordText').innerText)
   
}, [])
  
  
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