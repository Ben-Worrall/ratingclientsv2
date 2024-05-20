
import { NavLink, useNavigate } from 'react-router-dom';
import './styles/SuccessfullySubmitted.css'
import React from 'react';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot, addDoc } from 'firebase/firestore'
import { useEffect } from 'react';
import { useRef } from 'react';

const Success = () => {

    let navigate = useNavigate()


    function GoBackToEdit(){
        
        navigate('/routes/UserJoinedRoom')
        
    }



    function GoHome(){
        
        navigate('/')
        
    }



    return(

         <div id='SuccessApp'>

            <div id='SuccessApp-Text'>Successfully Submitted</div>
            <div id="button-holder">
            <button id='SuccessApp-Button' onClick={GoHome}>Home</button>
            <button id='GoBack-Button' onClick={GoBackToEdit}>Go Back</button>
            </div>
            
         </div>
    )
}
export default Success