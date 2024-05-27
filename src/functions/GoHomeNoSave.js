
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'

const db = getFirestore()




const GoHomeNoSave = async () =>{



        
   
    document.getElementById('CircleHostRoom').style.display = ""
    document.getElementById('CircleHostRoomBackground').style.display = ""
  // quits the website or refreshes then get put code back in data base and delete the server

 //get code
 
  let x = document.getElementById('RoomPasswordText').innerText
  let y = String(x)
  let z = Number(y)
  //put the server code back
  const docRef = doc(db, "AvailableCodes", "bTqLQ7U8f7ScZu6uXXjj")
  await updateDoc(docRef, {[y]: z})
  //delete the server from the Servers collection
  let DocId = ""
   
  const queryDocid = await getDocs(collection(db, "Servers"))
  queryDocid.forEach(async(docs)=>{
    if(docs.data().UserName == localStorage.getItem('User-Name')){
      if(docs.data().UserPassword == localStorage.getItem('User-Password')){
        if(docs.data().code == document.getElementById('RoomPasswordText').innerText){
          DocId = docs.id
        }
      }
    }
  })






  //delete the server sub collections (factors)
  const querySnapshot = await getDocs(collection(db, "Servers", DocId, "Overall Score"));
    
  querySnapshot.forEach(async(docs) => {
   //get collections documents ids
     let DocRefId = docs.id
     console.log(DocRefId)
     //get sub collection
     let CurCollection = collection(db, "Servers", DocId, "Overall Score")
     //get doc from sub collection
     let curDoc = doc(CurCollection, DocRefId)
     await deleteDoc(curDoc)
   
 });



  //otherwise documents will still apear and only the server code will be deleted
  //access tlocalstorage to get the factors(collection names)
  var AllFactorsAr = JSON.parse(localStorage.getItem(`${document.getElementById('RoomPasswordText').innerText}factors`))
  for(let i = 0; i< AllFactorsAr.length; i++){
    //get the collection
    const querySnapshot = await getDocs(collection(db, "Servers", DocId, AllFactorsAr[i]));
    
     querySnapshot.forEach(async(docs) => {
      //get collections documents ids
        let DocRefId = docs.id
        console.log(DocRefId)
        //get sub collection
        let CurCollection = collection(db, "Servers", DocId, AllFactorsAr[i])
        //get doc from sub collection
        let curDoc = doc(CurCollection, DocRefId)
        await deleteDoc(curDoc)
      
    });

   
  }

  //delete the server document
  await deleteDoc(doc(db, "Servers", DocId))




  window.location.href = ('/')
    



}


export default GoHomeNoSave

