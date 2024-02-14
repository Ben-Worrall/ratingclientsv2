import React from 'react';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
const db = getFirestore()



const GetResult = () => {
  
  
 //get factors


 let factors = JSON.parse(localStorage.getItem('factors'))
 //sort factors into right order

 factors = factors.sort((a,b) => a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))






 //for the details 
 let div5 = document.createElement('div')
 div5.id = ('white_content')
 div5.innerText = ""
 


 //for the black overlay of the details
 let div6 = document.createElement('div')
 div6.id=('black_overlay')
 div6.onclick = BlackClick
 div6.style.display = "none"
 


 


 //for the blacvk overlay of the details
 let div7 = document.createElement('div')
 div7.id=('black_overlay_NOTES')
 div7.onclick = BlackClickNotes
 div7.style.display = "none"




//when user clicks on the black overlay, then close the details div
function BlackClick(){

  //hide the black details overlay
  document.getElementById('black_overlay').style.display = "none"
  //remove the details page
  document.getElementById('white_content').remove()
  ////remove the note divs
  document.querySelectorAll('.NotesClassListHost').forEach((noteDiv)=>{
    noteDiv.remove()
  })
  
}
//when user clicks on the black overlay, then close the notes div and the black overlay and show the details page and the details blackovelay
function BlackClickNotes(){
  //show the details balck overlay
  document.getElementById('black_overlay').style.display = "block"
    //hide the black notes overlay
    document.getElementById('black_overlay_NOTES').style.display = "none"
   
    //hide the notes
    document.querySelectorAll('.NotesClassListHost').forEach((noteDiv)=>{
      noteDiv.style.display = "none"
    })
  
}









  //for each factor, add the buttons, factors, etc


  factors.forEach(async (SubColId) => {
   

  //create the display for the factors and their ratings

  //add each factor to the page and remove the button
    document.getElementById('ShowResultBNT').style.display = "none"
    //add factor results for each factor
    let factor = document.createElement('div')
    factor.classList.add('Resultfactor')
             
  //the question that the host
  let factorText = document.createElement('input')
  factorText.classList.add('ResultfactorText')
  factorText.value = SubColId
  factorText.spellcheck = "false"
  factorText.readOnly = true
  
  //for the the rating
  let factorRating = document.createElement('div')
  factorRating.classList.add('ResultfactorRating')
  
  
  //tallied up all the ratings for each factor
  let div1 = document.createElement('div')
  div1.classList.add('ResultratingFor')
  //div1.innerText 
  factorRating.appendChild(div1)
  
  
  
  
  
  //just a slash
  //let div2 = document.createElement('div')
  //div2.classList.add('Resultslash')
  //div2.innerText = "/"
  //factorRating.appendChild(div2)
  
  
  // what the rating is out of (10) can make host edit it later maybe
  let div3 = document.createElement('div')
  div3.classList.add('ResultratingOutOf')
  div3.innerText = "10"
  div3.spellcheck = "false"
  div3.contentEditable = "false"
  factorRating.appendChild(div3)

  //for the details button
  let div4 = document.createElement('button')
  div4.classList.add('ResultDetailBnt')
  div4.innerText = "Details"
  div4.spellcheck = "false"
  div4.contentEditable = "false"
  div4.addEventListener('click', function(){
    ShowDetails()
  })
  factorRating.appendChild(div4)


  

  





  
  async function ShowDetails(){
    div5.innerHTML = ""
    //get the details according to which factor was pressed
   
    //get factor name of which button was pressed
    //console.log(button.parentNode.parentNode.firstChild.innerText)
    
    
     //get collection of the factor 
  // 1st step is to access the doc that matches the code
  const colRef = collection(db, "Servers");
  const docsSnap = await getDocs(colRef);
  //search through and find the doc with the code
  docsSnap.forEach(async doc => {
     
   //find and establish the doc of the server u made
   if(doc.data().code == localStorage.getItem('code')){

    
    // 2nd step is to access sub collection with id of the doc that matches the code
    var CurFactorCol = collection(db,'Servers/' + doc.id + '/'+ SubColId);
    //search through the docs of the collection but pass through the host document
    let SubDocs = await getDocs(CurFactorCol)
    //look through the documents
     SubDocs.forEach(async subDoc => {
       //skip over the host doc
       if(!subDoc.data().Host){
             //div4.onclick = ShowNoteContent
          
        div5.innerHTML +=(`<div id="UsernameText">${subDoc.data().Username}</div>`)
        div5.innerHTML +=(`<div id="RatingText">${subDoc.data().Rating}</div>`)

        div5.innerHTML +=(
          `<button value="${ subDoc.data().Username + "_" + SubColId}" 
          class="NotesBNTResults">
          Notes
          </button>`
          )
        
        
        //document.getElementById(subDoc.data().Username + "_" + SubColId).style.display = "block"
        


        //create a div for the notes for cur factor and each user
        let CurNoteDiv = document.createElement('div')
        CurNoteDiv.id = subDoc.data().Username + "_" + SubColId
        CurNoteDiv.style.display = "none"
        CurNoteDiv.classList = "NotesClassListHost"
        CurNoteDiv.innerText = subDoc.data().Notes
        document.getElementById('HostRoomMainDisplay').appendChild(CurNoteDiv)

       }

     })
     
     
     



   }

  })


    
    //then append them to div5 (the notes sheet)

    
    //append the details 
    
    document.getElementById('HostRoomMainDisplay').appendChild(div5)
    div6.style.display = ""
  }







     //now that it has been established
     //access teh sub collections to get the data
     

     // 1st step is to access the doc that matches the code
     const colRef = collection(db, "Servers");
     const docsSnap = await getDocs(colRef);
     //search through and find the doc with the code
     docsSnap.forEach(async doc => {
        
      //find and establish the doc of the server u made
      if(doc.data().code == localStorage.getItem('code')){
        var UserRatings = 0
        var UserRatingsLength = 0
        var UserNames = 0


         // 2nd step is to access sub collection with id of the doc that matches the code
         var CurFactorCol = collection(db,'Servers/' + doc.id + '/'+ SubColId);
         //search through the docs of the collection but pass through the host document
         let SubDocs = await getDocs(CurFactorCol)
         //look through the documents
          SubDocs.forEach(async subDoc => {
            //skip over the host doc
            if(!subDoc.data().Host){
              UserRatings = UserRatings + Number(subDoc.data().Rating)
              UserRatingsLength = UserRatingsLength+1
            }

          })

          //then add the ratings average to the div factors at the top and appened them together
          div1.innerText = Math.round((UserRatings/UserRatingsLength) * 10) / 10
          factor.appendChild(factorText)
          factor.appendChild(factorRating)
          document.getElementById('ShowResultDisplay').style.display = "block"
          document.getElementById('ShowResultDisplay').style.justifyContent = ""
          document.getElementById('ShowResultDisplay').style.alignItems = ""
          document.getElementById('ShowResultDisplay').appendChild(factor)


      }

    })

 

  })

  document.getElementById('HostRoomMainDisplay').appendChild(div6)
  document.getElementById('HostRoomMainDisplay').appendChild(div7)

     
    
//for notes buttons
//display the notes according to the corresponding ids
var wrapper = document.getElementById("HostRoomMainDisplay")

wrapper.addEventListener("click", function(ev){
  var btn_option = document.getElementsByClassName("NotesBNTResults");
  Object.keys(btn_option).forEach(function(key){
    if(ev.target == btn_option[key]){
      console.log(btn_option[key].getAttribute("value"))
      document.getElementById(btn_option[key].getAttribute("value")).style.display = "block"
      document.getElementById('black_overlay_NOTES').style.display = "block"
      document.getElementById('black_overlay').style.display = "none"
     
    }
  })
})
    
    
    
 

}


export default GetResult










/* 


 // 1st step is to access the doc that matches the code
      const colRef = collection(db, "Servers");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach(async doc => {
          if(doc.data().code == localStorage.getItem('code')){
              
              // 2nd step is to access sub collection with id of 
              var CurFactorCol = collection(db,'Servers/' + doc.id + '/'+ SubColId);
              //search through the docs of the collection but pass through the host document
              let SubDocs = await getDocs(CurFactorCol)
              //look through the documents
               SubDocs.forEach(async subDoc => {
                  if(!subDoc.data().Host){
                    //(subDoc.data().Username)   each users username
                    //(subDoc.data().Rating)     each users rating
                    //console.log("factor: " + SubColId + " || " + "Username: " + subDoc.data().Username + " || " + "Rating: " + subDoc.data().Rating)

                    
                    //send through all the data to " UserData "
                    UserNames.push(subDoc.data().Username)
                    UserRatings.push(subDoc.data().Rating)
                    console.log(UserNames)
                    console.log(UserRatings)
                    
                  }
              })
              

          }








//add each factor to the page and remove the button
  document.getElementById('ShowResultBNT').style.display = "none"
  //add factor results for each factor
  let factor = document.createElement('div')
  factor.classList.add('factor')
           
//the question that the host
let factorText = document.createElement('div')
factorText.classList.add('factorText')
factorText.innerText = SubColId
factorText.spellcheck = "false"

//for the the rating
let factorRating = document.createElement('div')
factorRating.classList.add('factorRating')


//tallied up all the ratings for each factor
let div1 = document.createElement('div')
div1.classList.add('ratingFor')
div1.innerText = 9
factorRating.appendChild(div1)
console.log(UserRatings)




//just a slash
let div2 = document.createElement('div')
div2.classList.add('slash')
div2.innerText = "/"
factorRating.appendChild(div2)


// what the rating is out of (10) can make host edit it later maybe
let div3 = document.createElement('div')
div3.classList.add('ratingOutOf')
div3.innerText = "10"
div3.spellcheck = "false"
div3.contentEditable = "false"
factorRating.appendChild(div3)





//everything ot each other then append that to the rating board
//append factor to the rating board
factor.appendChild(factorText)
factor.appendChild(factorRating)
document.getElementById('ShowResultDisplay').style.display = "block"
document.getElementById('ShowResultDisplay').style.justifyContent = ""
document.getElementById('ShowResultDisplay').style.alignItems = ""
document.getElementById('ShowResultDisplay').appendChild(factor)














*/
