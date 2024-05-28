
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'

const db = getFirestore()


const ShowDetailsSaved = async (e) => {

    let SubColId = e.target.parentNode.firstChild.value
    console.log(e.target.parentNode.firstChild.value)
    document.getElementById('SavedWhite_content').style.display = ""
    document.getElementById('SavedBlack_overlay').style.display = ""


    //get stats from db collection



    const colRef = collection(db, "SavedResults");
    const docsSnap = await getDocs(colRef);
    //search through and find the doc with the code
    docsSnap.forEach(async doc => {
        var UserName = localStorage.getItem('User-Name')
        var UserPassword = localStorage.getItem('User-Password')
        var SavedAs = localStorage.getItem('SavedAs-Name')
     //find and establish the doc of the server u made
     if(doc.data().Username == UserName){
        if(doc.data().Password == UserPassword){
            if(doc.data().SavedAs == SavedAs){

   
// 2nd step is to access sub collection with id of the doc that matches the code
var CurFactorCol = collection(db,'SavedResults/' + doc.id + '/'+ SubColId);
//search through the docs of the collection but pass through the host document
let SubDocs = await getDocs(CurFactorCol)
//look through the documents
 SubDocs.forEach(async subDoc => {
            //skip over the host doc
            if(!subDoc.data().Host){
                if(!subDoc.data().Anchor){


                        //div4.onclick = ShowNoteContent
              
             document.getElementById('SavedWhite_content').innerHTML +=(`<div id="UsernameText">${subDoc.data().Username}</div>`)
             document.getElementById('SavedWhite_content').innerHTML +=(`<div id="RatingText">${subDoc.data().Rating}</div>`)
         
             document.getElementById('SavedWhite_content').innerHTML +=(
               `<button value="${ subDoc.data().Username + "_" + SubColId}" 
               class="SavedNotesBNTResults">
               Notes
               </button>`
               )
             
             
             //document.getElementById(subDoc.data().Username + "_" + SubColId).style.display = "block"
             
         
         
             //create a div for the notes for cur factor and each user
             let CurNoteDiv = document.createElement('div')
             CurNoteDiv.id = subDoc.data().Username + "_" + SubColId
             CurNoteDiv.style.display = "none"
             CurNoteDiv.classList = "SavedNotesClassListHost"
             CurNoteDiv.innerText = subDoc.data().Notes
             document.getElementById('root').appendChild(CurNoteDiv)



                }
              
             }
                         

                

            })
        }
     }

     }

    })







}

export default ShowDetailsSaved

