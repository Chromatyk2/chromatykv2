import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from './component/home.js';
import Axios from "axios";

function App() {
  return (
    <div className="App">
          <header className="App-header">
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<HomePage />} />
                  </Routes>
              </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
