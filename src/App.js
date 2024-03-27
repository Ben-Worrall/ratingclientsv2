
import './App.css';
import {  BrowserRouter as Router,
  Routes,
  Route,useNavigate
  } from "react-router-dom";
import JoinRoute from './routes/JoinRoom'
import Home from './Home'
import CreateRoomHTML from "./routes/CreateRoom";
import HostRoomHTML from "./routes/HostRoom";
import UserJoinedRoom from './routes/UserJoinedRoom';
import Success from './routes/SuccessfullySubmitted';
import SavedResult from "./routes/SavedResult";
import storeCode from "./firebase/generateAllCodes"
//generateall the game codes
//storeCode()

//loop through the max amount of possible paths, and run the "createing path function"


function App() {
  
  return (
    
    

    <Router>

       <div className="App">
      
   
     <Routes>
        <Route exact path='/' element={<Home/>} />
          <Route exact path='/routes/JoinRoom' element={<JoinRoute/>} />
          <Route exact path='/routes/CreateRoom' element={<CreateRoomHTML/>} />
          <Route exact path='/routes/HostRoom' element={<HostRoomHTML/>} />
          <Route exact path='/routes/UserJoinedRoom' element={<UserJoinedRoom/>} />
          <Route exact path='/routes/SuccessfullySubmitted' element={<Success/>} />
          <Route exact path='/routes/SavedResult' element={<SavedResult/>} />
      </Routes>
     </div>
    </Router>
      
    
  );
}
/*
<Route exact path='/' element={<Home/>} />
          <Route exact path='/routes/JoinRoom' element={<JoinRoute/>} />
          <Route exact path='/routes/CreateRoom' element={<CreateRoomHTML/>} />
          <Route exact path='/routes/HostRoom' element={<HostRoomHTML/>} />
          <Route exact path='/routes/UserJoinedRoom' element={<UserJoinedRoom/>} />
          <Route exact path='/routes/SuccessfullySubmitted' element={<Success/>} />

*/

 

 export default App;

