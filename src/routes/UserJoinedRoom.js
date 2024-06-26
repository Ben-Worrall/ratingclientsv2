import { useNavigate } from 'react-router-dom';
import './styles/UserJoinedRoom.css'
import React from 'react';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import SubmitAnswer from '../functions/submitAnswers';
import Success from './SuccessfullySubmitted';

const db = getFirestore()






const UserJoinedRoom =  () => {
    let navigate = useNavigate();
    const effectRan = useRef(false);
    useEffect(() => {
        if (!effectRan.current) {
          console.log("effect applied - only on the FIRST mount");

       //for overall score
        document.getElementById('OSinput').addEventListener('input', function(e){
            localStorage.setItem(localStorage.getItem('code') + 'OverallScore' , e.target.value)
            if (this.value.length > 3) {
                this.value = this.value.slice(0,3); 
            }
        })
        if(localStorage.getItem(localStorage.getItem('code')+ 'OverallScore' )){
            document.getElementById('OSinput').value = localStorage.getItem(localStorage.getItem('code')+ 'OverallScore' )
        }





//access database of server with server code
let GameCode = localStorage.getItem('code')
    
async function addFactorsAuto(){

    const colRef = collection(db, "Servers");
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach(doc => {
        //console.log(doc.data());
        //if server doc.code matches with gamecode 
        if(doc.data().code == GameCode){
            //get all the values from the doc excpet for the gamecode
            //values are used for the sub collection Ids
            //but add the factors to the Users page (values)
            const {code, UserName, UserPassword ,...otherProperties} = doc.data();
            const personClone = {...otherProperties};
            //console.log(personClone)


            //turn all the values (factor names) into an array to access
            let ArrOfFactors = Object.keys(personClone)
            //sort the array out in alphabetical and numerical order
            ArrOfFactors = ArrOfFactors.sort((a,b) => a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))

           
              //for each factor
            for(let i =0; i<ArrOfFactors.length; i++){
                 
              

                //for each factor
                //add it to the users page for him/her to rate
                 //create "rating question" (factor)
                let factor = document.createElement('div')
                factor.classList.add('Userfactor')
                         
             //the question that user is rating off of
             let factorText = document.createElement('input')
             factorText.classList.add('UserfactorText')
             factorText.value = ArrOfFactors[i]
             factorText.spellcheck = "false"
             factorText.readOnly = true
             
             
             //for the user to rate
             let factorRating = document.createElement('div')
             factorRating.classList.add('UserfactorRating')
         
         
             //for  question mark (user will be able edit and rate)
             let div1 = document.createElement('input')
             div1.classList.add('UserratingFor')
             div1.placeholder = "?"
             div1.contentEditable = "true"
             div1.min = 0
             div1.max = 10
             div1.type = "number"
             div1.addEventListener('input', function(e){
                localStorage.setItem(GameCode + e.target.parentNode.parentNode.firstChild.value , e.target.value)
                
             })
             div1.oninput = function () {
                if (this.value.length > 3) {
                    this.value = this.value.slice(0,3); 
                }
            }
            
                if(localStorage.getItem(GameCode + ArrOfFactors[i])){
                    div1.value = localStorage.getItem(GameCode + ArrOfFactors[i])
                }
            
            
             factorRating.appendChild(div1)
         
         
         
         
         
             //just a slash
             //let div2 = document.createElement('div')
             //div2.classList.add('slash')
             //div2.innerText = "/"
             //factorRating.appendChild(div2)
         
         
             // what the rating is out of (10) can make host edit it later maybe
             let div3 = document.createElement('div')
             div3.classList.add('UserratingOutOf')
             div3.innerText = "10"
             div3.spellcheck = "false"
             div3.contentEditable = "false"
             factorRating.appendChild(div3)
         


             //for the note button
             let div4 = document.createElement('button')
             div4.classList.add('UserNoteBNT')
             div4.innerText = "Notes"
             div4.spellcheck = "false"
             div4.contentEditable = "false"
             div4.onclick = ShowNoteContent
             factorRating.appendChild(div4)

             




             //for the notes (inside note button)
             let div5 = document.createElement('textarea')
             div5.classList.add('UserNoteContent')
             div5.style.textAlign = "left"
             div5.id = "NoteText"+ArrOfFactors[i]
             if(localStorage.getItem(document.getElementById('RoomPasswordText').innerText + "NoteText"+ArrOfFactors[i])){
                    div5.innerHTML = localStorage.getItem(document.getElementById('RoomPasswordText').innerText + "NoteText"+ArrOfFactors[i])
             }else{
                div5.innerHTML += '&nbsp;'
             }

             div5.addEventListener('input', (e)=>{
                console.log(e.target.value)
                console.log(document.getElementById('RoomPasswordText').innerText + e.target.id)
                localStorage.setItem(document.getElementById('RoomPasswordText').innerText + e.target.id, e.target.value)
             })
         
         
             //for the blacvk overlay of the notes
             let div6 = document.createElement('div')
             div6.classList.add('UserNoteContent_overlay')
             div6.onclick = BlackClick
             div6.id = "OverlayForNote"+ArrOfFactors[i]


             function ShowNoteContent(){
    
            //show the factors
                document.getElementById('UserRatingRoom').appendChild(div6)
                document.getElementById('UserRatingRoom').appendChild(div5)
                document.getElementById("NoteText"+ArrOfFactors[i]).style.display = ""
                document.getElementById("OverlayForNote"+ArrOfFactors[i]).style.display = ""
              }


             //when user clicks on the black overlay, then close the details div
             function BlackClick(){
                //first save the notes to that certain factor


                //then remove the factors
               document.getElementById("NoteText"+ArrOfFactors[i]).style.display = "none"
               document.getElementById("OverlayForNote"+ArrOfFactors[i]).style.display = "none"
             }










          
         
         
             //everything ot each other then append that to the rating board
             //append factor to the rating board
             factor.appendChild(factorText)
             factor.appendChild(factorRating)
             document.getElementById('RatingBoard').appendChild(factor)
         
                         }
         
                     } 
                 })
          
    
    
}

addFactorsAuto()


        }
      
        return () => effectRan.current = true;
      }, []);
    
    
    
   
    
   
   
    



    
    function GoBack(){
        localStorage.removeItem('UserName')
        localStorage.removeItem('code')
        navigate('/routes/JoinRoom/')
   

    }
    function GoHome(){
        localStorage.removeItem('UserName')
        localStorage.removeItem('code')
        navigate('/')
        
    }
    function toSuccess(){
        navigate('/routes/SuccessfullySubmitted')
        
    }

    async function Submit(){
        
        //SubmitAnswer()
        SubmitAnswer()
        
      

    }
    


    








    function ShowNoteContentOS(){
    




        
         //for the notes (inside note button)
         let div5 = document.createElement('textarea')
         div5.classList.add('UserNoteContent')
         div5.style.textAlign = "left"
         div5.id = "NoteTextOS"
         if(localStorage.getItem(document.getElementById('RoomPasswordText').innerText + "NoteTextOS")){
                div5.innerHTML = localStorage.getItem(document.getElementById('RoomPasswordText').innerText + "NoteTextOS")
         }else{
            div5.innerHTML += '&nbsp;'
         }

         div5.addEventListener('input', (e)=>{
            console.log(e.target.value)
            console.log(document.getElementById('RoomPasswordText').innerText + e.target.id)
            localStorage.setItem(document.getElementById('RoomPasswordText').innerText + e.target.id, e.target.value)
         })
     
     
         //for the blacvk overlay of the notes
         let div6 = document.createElement('div')
         div6.classList.add('UserNoteContent_overlay')
         div6.onclick = BlackClick
         div6.id = "OverlayForNoteOS"



             //when user clicks on the black overlay, then close the details div
             function BlackClick(){
                //first save the notes to that certain factor


                //then remove the factors
               document.getElementById("NoteTextOS").remove()
               document.getElementById("OverlayForNoteOS").remove()
             }

 //show the factors
 document.getElementById('UserRatingRoom').appendChild(div6)
 document.getElementById('UserRatingRoom').appendChild(div5)
    
 document.getElementById("NoteTextOS").style.display = ""
 document.getElementById("OverlayForNoteOS").style.display = ""

    
        
    }










    return (
        <div className="App">
            <div id='UserRatingRoom'>

            <div id="circleRatingRoom" style={{display:"none"}}></div>
            <div id="circleRatingRoomBackground" style={{display:"none"}}></div>


            
        <div id="RoomPassword">
            <div id="RoomPasswordTextOnly">Room Password:</div>
            <div id="RoomPasswordText">{localStorage.getItem('code')}</div>
            
        </div>


        <div id='RatingBoard'>
         
         <div id='OverallScoreDivBackground'>
            <div id='OverallScoreDiv'>
                <p id='OStext'>Overall Score: </p>
                <input id='OSinput' placeholder='?' max={10} min={0} type='number'></input>
                <p id='OS10'>10</p>
                <button id='UserNoteBNTOS' onClick={ShowNoteContentOS}>Notes</button>
            </div>
         </div>
         











        </div>




        <div id="ButtonHolder-CreateRoom">
            <button id="HomeBNT" onClick={GoHome}>Home</button>
            <button id='BackBNT' onClick={GoBack}>Back</button>
            <button id='SubmitBNT' type='submit' onClick={Submit}>Submit</button>
            
            <button  id='ToSuccess' onClick={toSuccess} ></button>
        </div>
        </div>

    </div>
    )


}

export default UserJoinedRoom







