import React, { Component } from "react";
import "./App.css";
import Main from "./components/login/Main";
import Dashboard from "./components/dashboard/Dashboard";
// import SignUpForm from "./components/login/pages/SignUpForm";
// import SignInForm from "./components/login/pages/SignInForm";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    userData: null
  };
// event handler to handle the data entered by the user
  updateUserData = user => {
    this.setState({ userData: user });
  };
  
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {/* <Route path="/login" component={SignInForm} />
          <Route path="/sign" component={SignUpForm} /> */}
            <Route
              path="/dashboard"
              // component={Dashboard}
              render={props => (
                <Dashboard {...props} userData={this.state.userData} />
              )}
            />
            {/* <Route exact path="/settings" component={Setting} /> */}
            {/* <Route exact path="/account-statement" component={} /> */}
            <Route
            //to access the main page which contain signin and signup 
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
