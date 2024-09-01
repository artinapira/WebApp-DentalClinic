import React from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>

            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/home" element={<Home/>}/>
                <Route path="/footer" element={<Footer />} />
              




            </Routes>
        </Router>

  );
}

export default App;
