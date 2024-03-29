import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc, query} from 'firebase/firestore'
const db = getFirestore()


const Register = async () => {
    console.log('thould run once')
    //access database and setup data object for the document
    const dbUsers = collection(db, "Users")
    const dbUsersDocs = await getDocs(collection(db, "Users"))
    const data = {
        Username: document.getElementById('RegNameInput').value,
        Password: document.getElementById('RegPasswordInput').value
     };
     //check though database to see if password has already been used

     //get password
     let Password = document.getElementById('RegPasswordInput').value
     let Username = document.getElementById('RegNameInput').value
     //loop through db to see if a doc matches the password
     var UsernameCur = 0
     dbUsersDocs.forEach((doc) => {
        
        if(Username == doc.data().Username){
            
            UsernameCur++
            return
        }

     })
    
     if(UsernameCur == 0){
      
        await addDoc(collection(db, "Users"), {
         Username: document.getElementById('RegNameInput').value,
        Password: document.getElementById('RegPasswordInput').value
        })
        document.getElementById('LoginRegisterPOPUP').remove()
        document.getElementById('LoginRegisterPOPUP-background').remove()
        localStorage.setItem('User-Name',Username)
        localStorage.setItem('User-Password',Password)
        localStorage.setItem('logged-in','true')
        window.location.reload()
     }
     if(UsernameCur == 1){
        console.log(UsernameCur)
        alert('This Username is already in use')
     }
     
}



export default Register






