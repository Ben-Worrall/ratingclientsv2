

import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc, query} from 'firebase/firestore'
const db = getFirestore()


const Login = async () => {
    console.log('thould run once')
    //access database and setup data object for the document
    const dbUsers = collection(db, "Users")
    const dbUsersDocs = await getDocs(collection(db, "Users"))
    //get password and username
    let Password = document.getElementById('LoginPasswordInput').value
    let Username = document.getElementById('LoginNameInput').value

    var access =0
    
    dbUsersDocs.forEach((doc) => {
        
        if(Username == doc.data().Username){
            if(Password == doc.data().Password){
                alert('Logged in')
                access++
                document.getElementById('LoginRegisterPOPUP').style.display = "none"
                document.getElementById('LoginRegisterPOPUP-background').style.display = "none"
                localStorage.setItem('User-Name',Username)
                localStorage.setItem('User-Password',Password)
                return
            } 
            
        }

     })
     if(access == 0){
        alert('wrong username or password')
     }
     
}



export default Login



