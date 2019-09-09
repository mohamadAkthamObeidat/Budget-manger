import React from "react";
import "./App.css";
import Sidebar from "./components/dashboard/sidebar";
import Main from "./components/login/Main";
import Dashboard from './components/dashboard/Dashboard'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard />
        {/* <Main /> */}
        {/* <Sidebar /> */}
      </Router>
    </div>
  );
}

export default App;
