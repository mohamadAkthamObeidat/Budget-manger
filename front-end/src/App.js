import React, { Component } from "react";
import "./App.css";
import Main from "./components/login/Main";
import Dashboard from "./components/dashboard/Dashboard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    userData: null
  };

  updateUserData = user => {
    this.setState({ userData: user });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              path="/dashboard"
              render={props => (
                <Dashboard {...props} userData={this.state.userData} />
              )}
            />

            <Route
              path="/"
              render={props => (
                <Main {...props} updateUserData={this.updateUserData} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
