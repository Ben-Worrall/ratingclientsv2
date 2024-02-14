
import './App.css';
import {  BrowserRouter as Router,
  Routes,
  Route,
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
  
  return (
    <Router>
       <div className="App">
        <Routes>

          <Route exact path='https://ben-worrall.github.io/ratingclientsv2/' element={<Home/>} />
          <Route exact path='https://ben-worrall.github.io/ratingclientsv2/routes/JoinRoom' element={<JoinRoute/>} />
          <Route exact path='https://ben-worrall.github.io/ratingclientsv2/routes/CreateRoom' element={<CreateRoomHTML/>} />
          <Route exact path='https://ben-worrall.github.io/ratingclientsv2/routes/HostRoom' element={<HostRoomHTML/>} />
          <Route exact path='https://ben-worrall.github.io/ratingclientsv2/routes/UserJoinedRoom' element={<UserJoinedRoom/>} />
          <Route exact path='https://ben-worrall.github.io/ratingclientsv2/routes/SuccessfullySubmitted' element={<Success/>} />
          

        </Routes>
        </div>

    </Router>
      
    
  );
}


 

 export default App;

