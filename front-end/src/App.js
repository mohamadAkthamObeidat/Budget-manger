import React from "react";
import "./App.css";
<<<<<<< HEAD
=======
import Search from './components/search'
>>>>>>> Emad Resolve Conflicts
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
<<<<<<< HEAD
        <PaymentModal />
        <Dashboard />
        {/* <Main /> */}
        {/* <Search /> */}
        {/* <Main /> */}
        {/* <Sidebar /> */}
=======
        <Main />
        <Sidebar />
        <Search />
>>>>>>> Emad Resolve Conflicts
      </Router>
    </div>
  );
}

export default App;
