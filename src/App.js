import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import About from './components/about/About';
import Home from './components/Home';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  let [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg : message,
      type : type
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>       
      {/* <Alert alert={alert}/> */}

      <div className="container">
        <Routes>
          <Route path="/" element={<Home showalert={showAlert}/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>
        </Routes>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
