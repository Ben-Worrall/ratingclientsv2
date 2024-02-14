
import { useEffect } from 'react';
import { useRef } from 'react';
import React from 'react';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
const db = getFirestore()


const SubmitAnswer = async () => { 
     
    console.log('should run once in submit answer func')
    

   //console.log('test')
   //go through the factors and for each factor do the following (0)
   //get the factor name (1)
   //get the factor rating (2)
   //get users name (3)
   //get the code of the server (4)
   //connect those 3 and put them in a new doc and send to the factor collection that corresponds to the factor name in the server u are connected to
   
   
    let AllFactors = Array.from( document.querySelectorAll('.Userfactor') )
    console.log(AllFactors)
    
    


    
     async function asyncFunction(factor, resolve){
        //console.log(document.getElementById("NoteText"+factor.children[0].value).innerText)
        
        // (1)   factor.children[0].value
        // (2)   factor.children[1].children[0].value
        // (3)   localStorage.getItem('UserName')
        // (4)   localStorage.getItem('code')
        //got what we need now
         var FactorVal = factor.children[1].children[0].value
         if(FactorVal == null){
            FactorVal = 0
         }


        // 1st step is to access the doc that matches the code(4)
        const colRef = collection(db, "Servers");
        const docsSnap = await getDocs(colRef);
        docsSnap.forEach(async doc => {
            if(doc.data().code == localStorage.getItem('code')){
                //gotten doc (     doc.id      )
                // 2nd step is to access sub collection with id of (1)
                var CurFactorCol = collection(db,'Servers/' + doc.id + '/'+ factor.children[0].value);
                let CurFac = factor.children[0].value
                if((document.getElementById("NoteText"+CurFac))){
                    
                    await addDoc(CurFactorCol, {
                        Notes: document.getElementById("NoteText"+CurFac).innerText,
                        Rating: FactorVal,
                        Username: localStorage.getItem('UserName')
                        
                    });
                } else if(!document.getElementById("NoteText"+CurFac)){
                    await addDoc(CurFactorCol, {
                        Notes: "No Notes",
                        Rating: FactorVal,
                        Username: localStorage.getItem('UserName')
                        
                    });
                }
                
                
                // 3rd step is to add a new doc to that collection we accessed, with the data from (2) and (3)
                

                
            }
            
        })

        resolve()
    }



function ChangeToSuccess(){
    document.getElementById('ToSuccess').click()
}

    //make sure they go one by one and then use .then()
    const FuncDone = Promise.all(AllFactors.map((factor) => {
        return new Promise((resolve)=>{
            asyncFunction(factor, resolve)
        })

    }))

    FuncDone.then(  function(){ console.log('should be done now'); }).then(
        //delay function by a bit to make sure the db was updated
        setTimeout(ChangeToSuccess,5000)
        
    )
    //console.log('should be done now')
    //document.getElementById('ToSuccess').click();

    
    
    //successfully loaded all results to server, then take user to home screen
    
        
   return 



}

export default SubmitAnswer




/* 



AllFactors.forEach(async (factor)=>{
        console.log(document.getElementById("NoteText"+factor.children[0].value).innerText)
        
        // (1)   factor.children[0].value
        // (2)   factor.children[1].children[0].value
        // (3)   localStorage.getItem('UserName')
        // (4)   localStorage.getItem('code')
        //got what we need now
         var FactorVal = factor.children[1].children[0].value
         if(FactorVal == null){
            FactorVal = 0
         }


        // 1st step is to access the doc that matches the code(4)
        const colRef = collection(db, "Servers");
        const docsSnap = await getDocs(colRef);
        docsSnap.forEach(async doc => {
            if(doc.data().code == localStorage.getItem('code')){
                //gotten doc (     doc.id      )
                // 2nd step is to access sub collection with id of (1)
                var CurFactorCol = collection(db,'Servers/' + doc.id + '/'+ factor.children[0].value);
                let CurFac = factor.children[0].value
                let NoteText = document.getElementById("NoteText"+CurFac).innerText
                // 3rd step is to add a new doc to that collection we accessed, with the data from (2) and (3)
                //alert(document.getElementById("NoteText"+factor.children[0].value).innerText)
                await addDoc(CurFactorCol, {
                    Notes: NoteText,
                    Rating: FactorVal,
                    Username: localStorage.getItem('UserName')
                    
                });

                
            }
            
        })
    
        
        
    })





*/