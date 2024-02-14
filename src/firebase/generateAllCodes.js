import React from "react";
import { txtDB } from "../firebase/firebaseConfig";
import { ref } from "firebase/storage";
import { getFirestore, updateDoc, doc} from "firebase/firestore";

const db = getFirestore()


const storeCode = async () => {

    //const valRef = collection(txtDB, 'AvailableCodes')
    //addDoc(valRef, {1000: 1000})

    const data = {}

    for(let i = 1001; i < 10000; i++){
        
        data[i] = i
        
    }
    const docRef = doc(db, "AvailableCodes", "bTqLQ7U8f7ScZu6uXXjj")
    updateDoc(docRef, data)

    
    //bTqLQ7U8f7ScZu6uXXjj   .doc('bTqLQ7U8f7ScZu6uXXjj').update({test: "test"})
    
    
    //await addDoc(valRef, {txtVal: "test", textVal2: "test2", textVal3: "test3", textVal4: "test4"})
    alert('test')
}
export default storeCode