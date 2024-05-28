import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'

const db = getFirestore()





const ShowDetailsOSsaved = async () => {

   





    if(document.getElementById('RatingBoard-SavedPage').value !== ""){
        //show the popup for OS

        var div1 = document.getElementById('white_contentOS')
        var div2 = document.getElementById('background_contentOS')
        var div3 = document.getElementById('Notes_white_contentOS')
        var div4 = document.getElementById('Notes_background_contentOS')




        document.getElementById('SavedResultHolder').appendChild(div1)
        document.getElementById('SavedResultHolder').appendChild(div2)
        div2.style.display = ""
        div1.style.display = ""
        
    
        //show results from each user
        // 1st step is to access the doc that matches the code
      const colRef = collection(db, "SavedResults");
      const docsSnap = await getDocs(colRef);
      //search through and find the doc with the code
      docsSnap.forEach(async doc => {
       
       //find and establish the doc of the server u made
       if(doc.data().Code == localStorage.getItem('code')){
    
        console.log('testing OS')
        // 2nd step is to access sub collection with id of the doc that matches the code
        var CurFactorCol = collection(db,'SavedResults/' + doc.id + '/Overall Score');
        //search through the docs of the collection but pass through the host document
        let SubDocs = await getDocs(CurFactorCol)
        //look through the documents
         SubDocs.forEach(async subDoc => {
         
           //skip over the host doc
           if(!subDoc.data().Anchor){
            console.log(subDoc.data().OverallScore, subDoc.data().Username, subDoc.data().OverallScoreNOTES)
                 //div4.onclick = ShowNoteContent
                
            div1.innerHTML +=(`<div id="UsernameTextOS">${subDoc.data().Username}</div>`)
            div1.innerHTML +=(`<div id="RatingTextOS">${subDoc.data().OverallScore}</div>`)
            let button1 = document.createElement('button')
            button1.classList.add('NotesBNTResults1')
            button1.innerText = "Notes"
            button1.value = subDoc.data().Username
            
            div1.appendChild(button1)
            
            
            
            //document.getElementById(subDoc.data().Username + "_" + SubColId).style.display = "block"
            
    
           }
    
         })
         
         
         
    
    
    
       }
    
      })
    
    
    
    
    
    
    
      }
    
    
      let testing = document.getElementById('SavedResultHolder')
            testing.addEventListener('click',async function(ev){
              var btn_option = document.getElementsByClassName("NotesBNTResults1");
            Object.keys(btn_option).forEach(async function(key){
                if(ev.target == btn_option[key]){
                console.log(ev.target.value)
                
                const colRef = collection(db, "SavedResults");
                const docsSnap = await getDocs(colRef);
                //search through and find the doc with the code
                docsSnap.forEach(async doc => {
                   
                 //find and establish the doc of the server u made
                 if(doc.data().Code == localStorage.getItem('code')){
                   var CurFactorCol = collection(db,'SavedResults/' + doc.id + '/Overall Score');
                   let SubDocs = await getDocs(CurFactorCol)
                   //look through the documents
                    SubDocs.forEach(async subDoc => {
                      if(subDoc.data().Username === ev.target.value){
                        div3.innerHTML = subDoc.data().OverallScoreNOTES
                          //display the notes popup with the notes according to question and username
                         document.getElementById('SavedResultHolder').appendChild(div3)
                         document.getElementById('SavedResultHolder').appendChild(div4)
                         div3.style.display = ""
                         div4.style.display = ""
                         if(div3.innerHTML == ""){
                          div3.innerHTML = "No Notes"
                         }
                        return
                      }
                        
                     
                    })
         
                  }
                })
              }
            })
          })











}

export default ShowDetailsOSsaved
