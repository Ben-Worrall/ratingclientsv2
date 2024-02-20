

import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc, query} from 'firebase/firestore'
const db = getFirestore()


const Login = async () => {
    console.log('thould run once')
    //access database and setup data object for the document
    const dbUsers = collection(db, "Users")
    const dbUsersDocs = await getDocs(collection(db, "Users"))
    //get password and username
    let password = document.getElementById('LoginPasswordInput').value
    let Username = document.getElementById('LoginNameInput').value

    var access =0
    
    dbUsersDocs.forEach((doc) => {
        
        if(Username == doc.data().Username){
            if(password == doc.data().Password){
                alert('logged in')
                access++
                return
            } 
            
        }

     })
     if(access == 0){
        alert('wrong username or password')
     }
     
}



export default Login



