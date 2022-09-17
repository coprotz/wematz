import './App.css';
import Home from './pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './pages/posts/Posts';
import Nikah from './pages/nikah/Nikah';
import NikahView from './pages/nikah/NikahView';
import Meetings from './pages/meetings/Meetings';
import ViewMeeting from './pages/meetings/ViewMeeting';
import Madas from './pages/mada/Madas';
import Main from './pages/main/Main';
import Register from './pages/register/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>    
        <Routes>
          <Route path='/home' element={<Home/> }>                  
            <Route path='posts' element={<Posts/>}></Route>
            <Route path='madas' element={<Madas/>}></Route>
            <Route path='meetings' element={<Meetings/>}></Route>
            <Route path='nikah/:id' element={<NikahView/>}></Route>
            <Route path='nikah' element={<Nikah/>}></Route>            
          </Route>
          <Route path='meetings/:1' element={<ViewMeeting/>}></Route>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
