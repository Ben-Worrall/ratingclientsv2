


import { useEffect } from 'react';
import { useRef } from 'react';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'
const db = getFirestore()



const EditValues = (e) => {
     document.getElementById('EditValuePopup').style.display = ""
     document.getElementById('EditValuePopupBG').style.display = ""
     document.getElementById('EditValuePopupBG').onclick = EditValuePopupBGfunc
    //console.log(e.target.previousSibling)
     //determine if its saved as or client name
      if(e.target.previousSibling.id == "ClientName-Text"){


      console.log('change clients name')
      document.getElementById('EditValuePopup').placeholder = "Client's Name"



      }else if(e.target.previousSibling.id == "SavedAs-Text"){


        document.getElementById('EditValuePopup').placeholder = "Saved As"
        console.log('change Saved As name')


      }

















          //background function for editing
    async function EditValuePopupBGfunc(){
      console.log('test')
      document.getElementById('EditValuePopup').style.display = "none"
      document.getElementById('EditValuePopupBG').style.display = "none"


      if(document.getElementById('EditValuePopup').value !== ""){


        //saved as
        if(document.getElementById('EditValuePopup').placeholder === "Saved As"){
          document.getElementById('SavedAs-Text').value = document.getElementById('EditValuePopup').value
          
          //update in collection
          const colRef = collection(db, "SavedResults");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach(async doc => {
              if(doc.data().Username == localStorage.getItem('User-Name')){
                if(doc.data().Password == localStorage.getItem('User-Password')){
                  if(doc.data().SavedAs == localStorage.getItem('SavedAs-Name')){
                    //updated SavedAs
                    await updateDoc(doc.ref, {
                      SavedAs: document.getElementById('SavedAs-Text').value
                    });

                  }
                }
              }
            })




          //update in localstorage
          localStorage.setItem('SavedAs-Name', document.getElementById('SavedAs-Text').value)



          //clients name
        } else if(document.getElementById('EditValuePopup').placeholder === "Client's Name"){
          document.getElementById('ClientName-Text').value = document.getElementById('EditValuePopup').value
         
          //update in collection
          const colRef = collection(db, "SavedResults");
          const docsSnap = await getDocs(colRef);
          docsSnap.forEach(async doc => {
            if(doc.data().Username == localStorage.getItem('User-Name')){
              if(doc.data().Password == localStorage.getItem('User-Password')){
                if(doc.data().SavedAs == localStorage.getItem('SavedAs-Name')){
                  //updated SavedAs
                  await updateDoc(doc.ref, {
                    ClientName: document.getElementById('ClientName-Text').value
                  });

                }
              }
            }
          })




          //update in localstorage
          localStorage.setItem('ClientName',document.getElementById('ClientName-Text').value)
        }


        
      }
      document.getElementById('EditValuePopup').value = ""

  }






















}



export default EditValues

