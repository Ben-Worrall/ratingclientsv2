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
import DownloadExcelFunc from '../functions/DownloadExcelSavedResult';
import { useDownloadExcel } from 'react-export-table-to-excel';
import EditValues from '../functions/EditValues';
import ShowDetailsSaved from '../functions/ShowDetailsSaved'
import ShowDetailsOSsaved from '../functions/ShowDetailsOSsaved';

const db = getFirestore()



const SavedResult = () => {
 let navigate = useNavigate()




  
 

  function GoHome(){
    localStorage.removeItem('UserName')
    localStorage.removeItem('code')
    localStorage.removeItem('SavedAs-Name')
    navigate('/')
    //window.location.reload()
  }

  //create popup
  let DownloadPopupDiv = document.createElement('div')
  DownloadPopupDiv.id = "DownloadPopupDiv"
  DownloadPopupDiv.style.display = "none"
  let ClientNameInput = document.createElement('input')
  ClientNameInput.placeholder = "Client's Name"
  ClientNameInput.id = "ClientNameInput"
  let DownloadExcel = document.createElement('button')
  DownloadExcel.innerText = "Download"
  DownloadExcel.id = "DownloadExcel"
  DownloadExcel.onclick = DownloadExcelFunc


  DownloadPopupDiv.appendChild(DownloadExcel)
  //popup background
  let DownloadPopupDivBG = document.createElement('div')
  DownloadPopupDivBG.id = "DownloadPopupDivBG"
  DownloadPopupDivBG.style.display = "none"
  DownloadPopupDivBG.onclick = DownloadPopupBG

  

  //function to show the download popups
  function DownloadPopup(){
    document.getElementById("SavedResultHolder").appendChild(DownloadPopupDiv)
  document.getElementById("SavedResultHolder").appendChild(DownloadPopupDivBG)
    document.getElementById('DownloadPopupDiv').style.display = ""
    document.getElementById('DownloadPopupDivBG').style.display = ""

    
  }
   //function to close the download popups
  function DownloadPopupBG(){
    document.getElementById('DownloadPopupDiv').style.display = "none"
    document.getElementById('DownloadPopupDivBG').style.display = "none"
    if(document.getElementById('ExcelTable')){
      document.getElementById('ExcelTable').remove()
    }
    
  }



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
    
  ShowDetailsSaved(e)

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

                          localStorage.setItem('code', doc.data().Code)
                          document.getElementById('ClientName-Text').value = doc.data().ClientName
                          document.getElementById('ResultFSinput').value = doc.data().FinalScore
                          document.getElementById('ResultOSinput').value = doc.data().OverallScore



                            //get everything except the following
                            //code, password, SavedAs, Username
                            const {FinalScore, OverallScore, ClientName, Code, Password, SavedAs, Username,...otherProperties} = doc.data();
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


function NotesBlackClick(){
  
  console.log('test')
  div3.style.display = "none"
  div4.style.display = "none"
  div3.innerHTML = ""
}








      async function ShowDetailOS (){

        ShowDetailsOSsaved()
        
       }








    //edit the valuies

    



    function EditValueFunc(e){

      EditValues(e)

    }





 
    const effectRan2 = useRef(false);
    useEffect(() => {
    document.getElementById('SavedResultHolder').appendChild(div1)
    document.getElementById('SavedResultHolder').appendChild(div2)
    document.getElementById('SavedResultHolder').appendChild(div3)
    document.getElementById('SavedResultHolder').appendChild(div4)
    return () => effectRan2.current = true;
  }, []);





    return(
      
        
        <div id='SavedResultHolder'>
          <div id='circle' style={{display:"none"}}></div>
          <div id='circleBackground' style={{display:"none"}}></div>


          <input id='EditValuePopup' style={{display:"none"}}>
          </input>
          <div id='EditValuePopupBG'  style={{display:"none"}}> </div>

        <div className='inputText'>Saved As</div>
        <input id='SavedAs-Text' ></input>
        <button className='EditBNT' onClick={EditValueFunc}>✎</button>

        <div className='inputText'>Client's Name</div>
        <input id='ClientName-Text'></input>
        <button className='EditBNT' onClick={EditValueFunc}>✎</button>
        
           
        <div id='RatingBoard-SavedPage'>
        
              <div style={{display:'flex'}}>
                  <div id='ResultOverallScoreDivBackground'>
                     <div id='ResultOverallScoreDiv'>
                     <p id='ResultOStext'>Overall Score </p>
                     <input id='ResultOSinput' placeholder='?' max={10} min={0} type='number' contentEditable='false'></input>
                     <p id='ResultOS10'>10</p>
                     <button id='DetailsBNTOS' onClick={ShowDetailOS}>Details</button>
                    </div>
                  </div>

                  <div id='ResultFinalScoreDivBackground'>
                      <div id='ResultFinalScoreDiv'>
                      <p id='ResultFStext'>Final Score </p>
                      <input id='ResultFSinput' placeholder='?' max={10} min={0} type='number' contentEditable='false'></input>
                      <p id='ResultFS10'>10</p>
                      
                      </div>
                  </div>
              </div>

        </div>
   
   
           <div id="ButtonHolder-SavedPage">
               <button id="HomeBNTSavedPage" onClick={GoHome}>Home</button>
               <button id='DownloadBNTSavedPage' onClick={DownloadPopup}>Download as excel file</button>
               <button id='DownloadAsExcel' style={{display:"none"}} ></button>
           </div>
           

        </div>
   
       
        
    )






}
export default SavedResult








