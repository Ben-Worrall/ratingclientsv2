
import { useNavigate } from 'react-router-dom';
import './styles/SuccessfullySubmitted.css'
import React from 'react';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot, addDoc } from 'firebase/firestore'
import { useEffect } from 'react';
import { useRef } from 'react';

const Success = () => {
    let navigate = useNavigate()



    function GoHome(){
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }


    return(
         <div id='SuccessApp'>
            <div id='SuccessApp-Text'>Successfully Submitted</div>
            <button id='SuccessApp-Button' onClick={GoHome}>Home</button>
         </div>
    )
}
export default Success