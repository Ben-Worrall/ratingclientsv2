
import './App.css';
import {  HashRouter as Router,
  Routes,
  Route,useNavigate
  } from "react-router-dom";
import JoinRoute from './routes/JoinRoom'
import Home from './Home'
import CreateRoomHTML from "./routes/CreateRoom";

import HostRoomHTML from "./routes/HostRoom";
import UserJoinedRoom from './routes/UserJoinedRoom';
import Success from './routes/SuccessfullySubmitted';

//generateall the game codes
//storeCode()

//loop through the max amount of possible paths, and run the "createing path function"


function App() {
  const navigate = useNavigate();
  return (
    
    

    <Router>

       <div className="App">
      
   
        <Routes>

  
          <Route  path="/">
            < Home/>
          </Route>
          <Route  path="/routes/JoinRoom">
            < JoinRoute/>
          </Route>
          <Route  path="/routes/CreateRoom">
            < CreateRoomHTML/>
          </Route>
          <Route  path="/routes/HostRoom">
            <HostRoomHTML />
          </Route>
          <Route  path="/routes/UserJoinedRoom">
            <UserJoinedRoom />
          </Route>
          <Route  path="/routes/SuccessfullySubmitted">
            < Success/>
          </Route>
         

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

