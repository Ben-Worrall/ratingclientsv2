import {useNavigate} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/SavedResult.css'
import Home from '../Home';

import ReactDOM from 'react-dom/client'
import { txtDB } from '../firebase/firebaseConfig';
import { getFirestore, updateDoc, doc, collection,getDocs, deleteField, deleteDoc, onSnapshot } from 'firebase/firestore'
import $ from 'jquery'

const db = getFirestore()



const SavedResult = () => {






    return(
        <div id='SavedResultHolder'>
         test
        </div>
    )


}
export default SavedResult








