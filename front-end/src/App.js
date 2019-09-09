import React from "react";
import "./App.css";
import Sidebar from './components/dashboard/sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
      </Router>
    </div>
  );
}

export default App;
