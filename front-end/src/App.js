import React from "react";
import "./App.css";
import Search from './components/search'
import Sidebar from "./components/dashboard/sidebar";
import Main from "./components/login/Main";
import Dashboard from "./components/dashboard/Dashboard";
import PaymentModal from "./components/dashboard/PaymentModal";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Search from "./components/search";
function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard />
        {/* <Main /> */}
        {/* <Search /> */}
        {/* <Main /> */}
        {/* <Sidebar /> */}

      </Router>
    </div>
  );
}

export default App;
