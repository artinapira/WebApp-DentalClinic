import React from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import { Services } from './Pages/Services'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
    return (
   <><div className="App">
        <Services />
      </div><Router>

          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Footer" element={<Footer />} />





          </Routes>
        </Router></>


  );
}

export default App;
