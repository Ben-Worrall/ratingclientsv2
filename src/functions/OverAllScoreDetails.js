
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'

const db = getFirestore()





const OverAllScoreDetails = async () => {
    if(document.getElementById('HostOSinput').value !== ""){
        //show the popup for OS
        document.getElementById('HostRoomApp').appendChild(document.getElementById('white_contentOS'))
        document.getElementById('HostRoomApp').appendChild(document.getElementById('background_contentOS'))
        document.getElementById('background_contentOS').style.display = ""
        document.getElementById('white_contentOS').style.display = ""
        
    
        //show results from each user
        // 1st step is to access the doc that matches the code
      const colRef = collection(db, "Servers");
      const docsSnap = await getDocs(colRef);
      //search through and find the doc with the code
      docsSnap.forEach(async doc => {
         
       //find and establish the doc of the server u made
       if(doc.data().code == localStorage.getItem('code')){
    
        
        // 2nd step is to access sub collection with id of the doc that matches the code
        var CurFactorCol = collection(db,'Servers/' + doc.id + '/Overall Score');
        //search through the docs of the collection but pass through the host document
        let SubDocs = await getDocs(CurFactorCol)
        //look through the documents
         SubDocs.forEach(async subDoc => {
           //skip over the host doc
           if(!subDoc.data().Host){
            console.log(subDoc.data().OverallScore, subDoc.data().Username, subDoc.data().OverallScoreNOTES)
                 //document.getElementById("Notes_background_contentOS").onclick = ShowNoteContent
              
            document.getElementById('white_contentOS').innerHTML +=(`<div id="UsernameTextOS">${subDoc.data().Username}</div>`)
            document.getElementById('white_contentOS').innerHTML +=(`<div id="RatingTextOS">${subDoc.data().OverallScore}</div>`)
            let button1 = document.createElement('button')
            button1.classList.add('NotesBNTResults1')
            button1.innerText = "Notes"
            button1.value = subDoc.data().Username
            
            document.getElementById('white_contentOS').appendChild(button1)
            
            
            
            //document.getElementById(subDoc.data().Username + "_" + SubColId).style.display = "block"
            
    
           }
    
         })
         
         
         
    
    
    
       }
    
      })
    
    
    
    
    
    
    
      }
    
    
      let testing = document.getElementById('HostRoomApp')
            testing.addEventListener('click',async function(ev){
              var btn_option = document.getElementsByClassName("NotesBNTResults1");
            Object.keys(btn_option).forEach(async function(key){
                if(ev.target == btn_option[key]){
                console.log(ev.target.value)
                
                const colRef = collection(db, "Servers");
                const docsSnap = await getDocs(colRef);
                //search through and find the doc with the code
                docsSnap.forEach(async doc => {
                   
                 //find and establish the doc of the server u made
                 if(doc.data().code == localStorage.getItem('code')){
                   var CurFactorCol = collection(db,'Servers/' + doc.id + '/Overall Score');
                   let SubDocs = await getDocs(CurFactorCol)
                   //look through the documents
                    SubDocs.forEach(async subDoc => {
                      if(subDoc.data().Username === ev.target.value){
                        document.getElementById('Notes_white_contentOS').innerHTML = subDoc.data().OverallScoreNOTES
                        if(document.getElementById('Notes_white_contentOS').innerHTML == ""){
                          document.getElementById('Notes_white_contentOS').innerHTML = "No Notes"
                        }
                          //display the notes popup with the notes according to question and username
                         document.getElementById('HostRoomApp').appendChild(document.getElementById('Notes_white_contentOS'))
                         document.getElementById('HostRoomApp').appendChild(document.getElementById("Notes_background_contentOS"))
                         document.getElementById('Notes_white_contentOS').style.display = ""
                         document.getElementById("Notes_background_contentOS").style.display = ""
                        return
                      }
                        
                     
                    })
         
                  }
                })
              }
            })
          })
}

export default OverAllScoreDetails
