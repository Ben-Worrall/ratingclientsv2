import React from "react";
import { txtDB } from "../firebase/firebaseConfig";
import { collection, Firestore, getDocs, getFirestore, Query, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import WaitingRoomHTML from "../routes/HostRoom";
import ReactDOM from 'react-dom/client';


const db = getFirestore()

//generate random code

var randomCode 
function GenerateCode(){
  randomCode = Math.floor(1000 + Math.random() * 9000)
}

//find random code within the collection and take it out of the data base for now 
//(will add it back when this current "game is shut down")



const GetRandomCode = async () => {

 
  //GenerateCode()
    /*
    const querySnapshot = await getDocs(collection(db, "AvailableCodes"));
     querySnapshot.forEach((doc) => {
      
      //console.log(doc.data().GameCode) access a random code like 4723
      if(doc.data().GameCode ==  randomCode){
        //console.log(doc.data().GameCode)
      }
      
    });
    */
   



    
  //get url of the room



  
    
 



}
export default GetRandomCode



