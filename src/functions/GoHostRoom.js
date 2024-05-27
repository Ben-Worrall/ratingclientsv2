
import { useNavigate } from 'react-router-dom';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc, where} from 'firebase/firestore'
const db = getFirestore()




 //when user presses start on the "start room" button
 var factorListAr = []

const GoHostRoom = async () => {


    
    document.getElementById('CircleCreateRoom').style.display = ""
    document.getElementById('CircleCreateRoomBackground').style.display = ""

    let docId 
    

    //add server code in the form of a document
    const dbRef = collection(db, "Servers")
    
    const data = {
      code: Number(document.getElementById('RoomPasswordText').innerHTML),
      UserName: localStorage.getItem('User-Name'),
      UserPassword: localStorage.getItem('User-Password')
   };

   for(let i = 0; i < document.querySelectorAll('.factor').length; i++){
    let Factor = document.querySelectorAll('.factor')[i].childNodes[0].value.toString()
    if(Factor !== ""){
      data[Factor] = Factor
    }
    
   }
   addDoc(dbRef, data).then(function(docRef) {
    
    docId = docRef.id
    localStorage.setItem('DocId', docRef.id)

}).then(async function (){

//find the document that the code was saved to
const docRef = doc(db, "Servers", docId);

//now that we have the document, add a collection for each factor
//send codes to 
let AllFactorText = document.querySelectorAll('.factor')

//for overall score
const colRef = collection(docRef , "Overall Score")
    await addDoc(colRef, {
        Host: "Host"
       });

//for all the questions
for(let i = 0; i < AllFactorText.length; i++){
 let value = AllFactorText[i].childNodes[0].value.toString()
   //if the factor isnt empty then move on
    if(value !== ""){
      factorListAr.push(value)
      
    const colRef = collection(docRef , value)
    await addDoc(colRef, {
        Host: "Host"
       });
    console.log(AllFactorText.length)
    console.log(value)
       
   }
 
}



})
.then(function(){
  let Code = document.getElementById('RoomPasswordText').innerText
//push the factors to local storage
localStorage.setItem(`${Code}factors`, JSON.stringify(factorListAr))
//send code to local storage

//send code to local storage for hostroom to access
localStorage.setItem('code', Code)


}).then(function(){

    
    window.location.href = ('/routes/HostRoom/')
    //window.location.reload()
  
  
  })
  
   


     
   
}


export default GoHostRoom