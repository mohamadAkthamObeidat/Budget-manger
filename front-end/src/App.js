import React from "react";
import "./App.css";
import Sidebar from "./components/dashboard/sidebar";
import Main from "./components/login/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Search from './components/search'
function App() {
  return (
    <div className="App">
     
      <Router>
        <Search/>
        <Main />
        {/* <Sidebar /> */}
    
      </Router>
    </div>
  );
}

export default App;
