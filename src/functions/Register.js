import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, addDoc, getDoc, setDoc} from 'firebase/firestore'
const db = getFirestore()


const Register = () => {
    const dbUsers = collection(db, "Users")
    const data = {
        Username: document.getElementById('RegNameInput').value,
        Password: document.getElementById('RegPasswordInput').value
     };

}



export default Register






