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
            const {code ,...otherProperties} = doc.data();
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
             let div5 = document.createElement('div')
             div5.classList.add('UserNoteContent')
             div5.contentEditable = "true"
             div5.style.textAlign = "left"
             div5.id = "NoteText"+ArrOfFactors[i]
             div5.innerHTML += '&nbsp;'
         
         
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
        localStorage.clear()
        navigate('/routes/JoinRoom/')
    window.location.reload()

    }
    function GoHome(){
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }
    function toSuccess(){
        navigate('/routes/SuccessfullySubmitted')
        window.location.reload()
    }

    async function Submit(){
        
        //SubmitAnswer()
        SubmitAnswer()
        
      

    }
    







    return (
        <div className="App">
            <div id='UserRatingRoom'>
            
        <div id="RoomPassword">
            <div id="RoomPasswordTextOnly">Room Password:</div>
            <div id="RoomPasswordText">{localStorage.getItem('code')}</div>
            
        </div>


        <div id='RatingBoard'>
           
        </div>


        <div id="ButtonHolder-CreateRoom">
            <button id="HomeBNT" onClick={GoHome}>Home</button>
            <button id='BackBNT' onClick={GoBack}>Back</button>
            <button id='SubmitBNT' onClick={Submit}>Submit</button>
            <button  id='ToSuccess' onClick={toSuccess} ></button>
        </div>
        </div>

    </div>
    )


}

export default UserJoinedRoom







