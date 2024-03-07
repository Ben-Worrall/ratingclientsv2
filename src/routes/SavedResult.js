import {useNavigate} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/SavedResult.css'
import Home from '../Home';
import { useEffect } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'
import $ from 'jquery'

const db = getFirestore()



const SavedResult = () => {
 

  function BlackClickNotes(){
    document.getElementById('SavedWhite_content').style.display = ""
    document.getElementById('SavedBlack_overlay').style.display = ""
    document.getElementById('SavedBlack_overlay_NOTES').style.display = "none"
    document.querySelectorAll('.SavedNotesClassListHost').forEach(function(note){
      note.style.display = "none"
    })
  }







 //show details function
 async function SavedShowDetails(e){
    
    let SubColId = e.target.parentNode.firstChild.value
    console.log(e.target.parentNode.firstChild.value)
    document.getElementById('SavedWhite_content').style.display = ""
    document.getElementById('SavedBlack_overlay').style.display = ""


    //get stats from db collection



    const colRef = collection(db, "SavedResults");
    const docsSnap = await getDocs(colRef);
    //search through and find the doc with the code
    docsSnap.forEach(async doc => {
        var UserName = localStorage.getItem('User-Name')
        var UserPassword = localStorage.getItem('User-Password')
        var SavedAs = localStorage.getItem('SavedAs-Name')
     //find and establish the doc of the server u made
     if(doc.data().Username == UserName){
        if(doc.data().Password == UserPassword){
            if(doc.data().SavedAs == SavedAs){


// 2nd step is to access sub collection with id of the doc that matches the code
var CurFactorCol = collection(db,'SavedResults/' + doc.id + '/'+ SubColId);
//search through the docs of the collection but pass through the host document
let SubDocs = await getDocs(CurFactorCol)
//look through the documents
 SubDocs.forEach(async subDoc => {
            //skip over the host doc
            if(!subDoc.data().Host){
                if(!subDoc.data().Anchor){


                        //div4.onclick = ShowNoteContent
              
             document.getElementById('SavedWhite_content').innerHTML +=(`<div id="UsernameText">${subDoc.data().Username}</div>`)
             document.getElementById('SavedWhite_content').innerHTML +=(`<div id="RatingText">${subDoc.data().Rating}</div>`)
         
             document.getElementById('SavedWhite_content').innerHTML +=(
               `<button value="${ subDoc.data().Username + "_" + SubColId}" 
               class="SavedNotesBNTResults">
               Notes
               </button>`
               )
             
             
             //document.getElementById(subDoc.data().Username + "_" + SubColId).style.display = "block"
             
         
         
             //create a div for the notes for cur factor and each user
             let CurNoteDiv = document.createElement('div')
             CurNoteDiv.id = subDoc.data().Username + "_" + SubColId
             CurNoteDiv.style.display = "none"
             CurNoteDiv.classList = "SavedNotesClassListHost"
             CurNoteDiv.innerText = subDoc.data().Notes
             document.getElementById('root').appendChild(CurNoteDiv)



                }
              
             }
                         

                

            })
        }
     }

     }

    })












 }

 




//when user clicks on the black overlay, then close the details div
 function SavedBlackClick(){

    //hide the black details overlay
    document.getElementById('SavedBlack_overlay').style.display = "none"
    //remove the details page
    document.getElementById('SavedWhite_content').style.display = "none"
    document.getElementById('SavedWhite_content').innerHTML = ""
    ////remove the note divs
    document.querySelectorAll('.NotesClassListHost').forEach((noteDiv)=>{
      noteDiv.remove()
    })
    
  }








    //display the ratings on the page like host getting results in host room
    const effectRan = useRef(false);
    useEffect(() => {
        if (!effectRan.current) {
          console.log("effect applied - only on the FIRST mount");


           //for the details 
          let detailsDiv = document.createElement('div')
          detailsDiv.id = ('SavedWhite_content')
          detailsDiv.innerText = ""
          detailsDiv.style.display = "none"
          
         
          //for the black overlay of the details
          let detailsDivBlackBg = document.createElement('div')
          detailsDivBlackBg.id=('SavedBlack_overlay')
          detailsDivBlackBg.onclick = SavedBlackClick
          detailsDivBlackBg.style.display = "none"
          
         
         
          //for the blacvk overlay of the details
          let NotesBG = document.createElement('div')
          NotesBG.id=('SavedBlack_overlay_NOTES')
          NotesBG.onclick = BlackClickNotes
          NotesBG.style.display = "none"
         
          document.getElementById('root').appendChild(detailsDiv)
          document.getElementById('root').appendChild(detailsDivBlackBg)
          document.getElementById('root').appendChild(NotesBG)






        //get the username
        //get users password
        //saved as
        var UserName = localStorage.getItem('User-Name')
        var UserPassword = localStorage.getItem('User-Password')
        var SavedAs = localStorage.getItem('SavedAs-Name')
        
    
        async function addFactorsAuto(){
        
            const colRef = collection(db, "SavedResults");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach(async doc => {
                //console.log(doc.data());
                if(doc.data().Username == UserName){
                    if(doc.data().Password == UserPassword){
                        if(doc.data().SavedAs == SavedAs){

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

                                //create div for the full factor
                                let SavedFactor = document.createElement('div')
                                SavedFactor.classList.add('SavedFactor')


                                
                                //input for the full factor (factor text)
                                let SavedFactorText = document.createElement('input')
                                SavedFactorText.value = ArrOfFactors[i]
                                SavedFactorText.classList.add('SavedFactorText')
                                SavedFactorText.readOnly = "true"



                                //the average rating for that factor
                                let SavedAvgRating = document.createElement('div')
                                //access all the ratings from the sub collection of the current document with the factor sub collection
                                SavedAvgRating.classList.add('SavedResultRatingFor')
                                // 2nd step is to access sub collection with id of the doc
                                var CurFactorCol = collection(db,'SavedResults/' + doc.id + '/'+ ArrOfFactors[i]);
                                //search through the docs of the collection but pass through the host document
                                let SubDocs = await getDocs(CurFactorCol)
                                //look through the documents
                                var SavedUserRatings = 0
                                var SavedUserRatingsLength = 0
                                 SubDocs.forEach(async subDoc => {
                                   //skip over the host doc
                                   if(!subDoc.data().Host){
                                    if(!subDoc.data().Anchor){
                                        SavedUserRatings = SavedUserRatings + Number(subDoc.data().Rating)
                                        SavedUserRatingsLength = SavedUserRatingsLength + 1
                                    }
                                    
                                   }
                    
                                 })
                                 
                                SavedAvgRating.innerText = Math.round((SavedUserRatings / SavedUserRatingsLength) * 10) / 10





                                //rating it out of 10
                                let outOf10 = document.createElement('div')
                                outOf10.classList.add('SavedResultRatingOutOf')
                                outOf10.innerText = "10"
                                outOf10.spellcheck = "false"
                                outOf10.contentEditable = "false"



                                //for the details button
                                let detailBNT = document.createElement('button')
                                detailBNT.classList.add('SavedResultDetailBnt')
                                detailBNT.onclick = SavedShowDetails
                                detailBNT.innerText = "Details"
                                detailBNT.spellcheck = "false"
                                detailBNT.contentEditable = "false"
                               
                                
                                
                                  
                                SavedFactor.appendChild(SavedFactorText)
                                SavedFactor.appendChild(SavedAvgRating)
                                SavedFactor.appendChild(outOf10)
                                SavedFactor.appendChild(detailBNT)
                                document.getElementById('RatingBoard-SavedPage').appendChild(SavedFactor)



                            }
                        }
                    }
                }
                
            })
                  
            
            
        }
        
        addFactorsAuto()






        






    }





    var wrapper = document.getElementById("root")
    wrapper.addEventListener("click", function(ev){
      console.log('clicked on item')
      var btn_option = document.getElementsByClassName("SavedNotesBNTResults");
      Object.keys(btn_option).forEach(function(key){
        if(ev.target == btn_option[key]){
          console.log(btn_option[key].getAttribute("value"))
          document.getElementById(btn_option[key].getAttribute("value")).style.display = ""
          document.getElementById('SavedBlack_overlay_NOTES').style.display = ""
          document.getElementById('SavedBlack_overlay').style.display = "none"
         
        }
      })
    })


    document.getElementById('SavedAs-Text').value = localStorage.getItem('SavedAs-Name')



        return () => effectRan.current = true;
      }, []);
    












    return(
        <div id='SavedResultHolder'>
        <input id='SavedAs-Text'></input>
         
        
           
        <div id='RatingBoard-SavedPage'>
           
        </div>
   
   
           <div id="ButtonHolder-SavedPage">
               <button id="HomeBNTSavedPage" >Home</button>
               <button id='BackBNTSavedPage' >Download as excel file</button>
           </div>

        </div>
   
       
        
    )






}
export default SavedResult








