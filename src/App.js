import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Axios from "axios";
import { useCookies } from 'react-cookie';
import Login from './services/auth.services.js';
import HomePage from './component/home.js';

function App() {
  const [cookies, setCookie] = useCookies();
  return (
    <div className="App">
          <header className="App-header">
              {typeof cookies.user === "undefined" && 
                  <Login />
              }
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
