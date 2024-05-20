
import { useEffect } from 'react';
import { useRef } from 'react';
import React from 'react';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot, addDoc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
const db = getFirestore()


const SubmitAnswer = async () => { 
     
    console.log('should run once in submit answer func')
    
    document.getElementById('circleRatingRoom').style.display = ""
    document.getElementById('circleRatingRoomBackground').style.display = ""
   //console.log('test')
   //go through the factors and for each factor do the following (0)
   //get the factor name (1)
   //get the factor rating (2)
   //get users name (3)
   //get the code of the server (4)
   //connect those 3 and put them in a new doc and send to the factor collection that corresponds to the factor name in the server u are connected to
   
   
    let AllFactors = Array.from( document.querySelectorAll('.Userfactor') )
    console.log(AllFactors)



   
    
    var OverallScore = Number(document.getElementById('OSinput').value)
    if(OverallScore == null){
        OverallScore = 0
     }else if(OverallScore > 10){
        OverallScore = 10
     } else if(OverallScore < 0){
        OverallScore = 0
     }




    const colRefOS = collection(db, "Servers");
          const docsSnapOS = await getDocs(colRefOS);
          docsSnapOS.forEach(async doc => {
              if(doc.data().code == localStorage.getItem('code')){
          console.log('found a server, we in')
              
            


           //add overall score to overall score collection
           var CurFactorColOS = collection(db,'Servers/' + doc.id + '/'+ "Overall Score");
           var AlreadySubmittedOS = false
           const SubDocsSnapOS = await getDocs(CurFactorColOS)
           
           SubDocsSnapOS.forEach(async (SubDoc) => {
           
               
               if(!SubDoc.data().Host){

                var UserOSnotes
               //if user alreayd suibmitted
               if(SubDoc.data().User_Name == localStorage.getItem("User-Name")){
                   if(SubDoc.data().User_Password == localStorage.getItem("User-Password")){
                        AlreadySubmittedOS = true
                        
                        if((localStorage.getItem(localStorage.getItem('code')+"NoteTextOS"))){
                            UserOSnotes = (localStorage.getItem(localStorage.getItem('code')+"NoteTextOS"))
                        }else if((localStorage.getItem(localStorage.getItem('code')+"NoteTextOS")) == ""){
                            UserOSnotes = "No Notes"
                        } else{
                            UserOSnotes = "No Notes"
                        }

                        
                        const data = {
                           OverallScore: OverallScore,
                           OverallScoreNOTES: UserOSnotes,
                           Username: localStorage.getItem('UserName'),
                           User_Name: localStorage.getItem("User-Name"),
                           User_Password: localStorage.getItem("User-Password"),
                       };
                       console.log('already results')
                       await updateDoc(SubDoc.ref, data)
                       return
                   }
               }

            }


              
            })

                           //user submits for first time
                           if(AlreadySubmittedOS == false){
                            console.log('no results in server')
         
         
         
                            
                                await addDoc(CurFactorColOS, {
                                    OverallScore: OverallScore,
                                    OverallScoreNOTES: (localStorage.getItem(String(localStorage.getItem('code'))+"NoteTextOS")),
                                    Username: localStorage.getItem('UserName'),
                                     User_Name: localStorage.getItem("User-Name"),
                                     User_Password: localStorage.getItem("User-Password"),
                                });
         
         
                         }

        }
    })








    
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
         }else if(FactorVal > 10){
            FactorVal = 10
         } else if(FactorVal < 0){
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

                //check if user already submitted, if so then just update, else submit results
                let AlreadySubmitted = false

                const SubDocsSnap = await getDocs(CurFactorCol)

                SubDocsSnap.forEach(async (SubDoc) => {
                    
                    if(SubDoc.data().User_Name == localStorage.getItem("User-Name")){
                        if(SubDoc.data().User_Password == localStorage.getItem("User-Password")){
                            AlreadySubmitted = true
                            
                           
                          //console.log('already got results in server')
                          //console.log(SubDoc.data())
                           if(localStorage.getItem(localStorage.getItem('code')+"NoteText"+CurFac)){
                            //console.log('got notes')
                            //console.log(doc.data())
                            const data = {
                                Notes: localStorage.getItem(localStorage.getItem('code')+"NoteText"+CurFac),
                                Rating: FactorVal,
                                Username: localStorage.getItem('UserName'),
                                User_Name: localStorage.getItem("User-Name"),
                                User_Password: localStorage.getItem("User-Password"),
                                
                            };
                            
                            await updateDoc(SubDoc.ref, data)
                            console.log(SubDoc)



                           } else if(!localStorage.getItem(localStorage.getItem('code')+"NoteText"+CurFac)){
                            //console.log('no notes')
                            //console.log(doc.data())
                            const data = {
                                Notes: "No Notes",
                                Rating: FactorVal,
                                Username: localStorage.getItem('UserName'),
                                User_Name: localStorage.getItem("User-Name"),
                                User_Password: localStorage.getItem("User-Password"),
                                
                            };
                            
                            await updateDoc(SubDoc.ref, data)
                            console.log(SubDoc)



                           }
                          
                          
                          return
                        }
                    }
                })
                


                   


                
                if(AlreadySubmitted == false){
                    console.log('no results in server')



                    if((document.getElementById("NoteText"+CurFac))){
                    
                        await addDoc(CurFactorCol, {
                            Notes: document.getElementById("NoteText"+CurFac).value,
                            Rating: FactorVal,
                            Username: localStorage.getItem('UserName'),
                            User_Name: localStorage.getItem("User-Name"),
                            User_Password: localStorage.getItem("User-Password")
                            
                        });
                    } else if(!document.getElementById("NoteText"+CurFac)){
                        await addDoc(CurFactorCol, {
                            Notes: "No Notes",
                            Rating: FactorVal,
                            Username: localStorage.getItem('UserName'),
                            User_Name: localStorage.getItem("User-Name"),
                            User_Password: localStorage.getItem("User-Password")
                        });
                    }



                }

                
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





if(localStorage.getItem(localStorage.getItem('code')+"NoteText"+CurFac)){
                    
                            const data = {
                                Notes: localStorage.getItem(localStorage.getItem('code')+"NoteText"+CurFac),
                                Rating: FactorVal,
                                Username: localStorage.getItem('UserName'),
                                User_Name: localStorage.getItem("User-Name"),
                                User_Password: localStorage.getItem("User-Password")
                                
                            };
                            const docRef =  getDoc(db,'Servers/' + doc.id + '/'+ factor.children[0].value + '/'+ SubDoc.id)
                            //await updateDoc(docRef.ref, data)
                            console.log(docRef)
                        } else if(!localStorage.getItem(localStorage.getItem('code')+"NoteText"+CurFac)){
                            const data = {
                                Notes: "No Notes",
                                Rating: FactorVal,
                                Username: localStorage.getItem('UserName'),
                                User_Name: localStorage.getItem("User-Name"),
                                User_Password: localStorage.getItem("User-Password")
                            };
                            const docRef = getDoc(db,'Servers/' + doc.id + '/'+ factor.children[0].value + '/'+ SubDoc.id)
                            //await updateDoc(docRef.ref, data)
                            console.log(docRef)
                        }


















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