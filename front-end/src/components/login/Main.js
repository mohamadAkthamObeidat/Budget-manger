import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <div className="App__Aside">
          {" "}
          <img
            className="back-img"
            src={require("../../Assets/Background.jpg")}
          />{" "}
          <p className="logo"> Budget </p>
          <p className="logo1"> Manager </p>
        </div>
        <div className="App__Form">
          {/* <div className="PageSwitcher">
            <NavLink
              to="/login"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/sign"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              Sign Up
            </NavLink>
          </div> */}

          <div className="FormTitle">
            <NavLink
              to="/login"
              activeClassName="FormTitle__Link--Active"
              className="FormTitle__Link"
            >
              Sign In
            </NavLink>
            or
            <NavLink
              to="/sign"
              activeClassName="FormTitle__Link--Active"
              className="FormTitle__Link"
            >
              Sign Up
            </NavLink>
          </div>
          <Switch>
            <Route
              path="/login"
              render={props => (
                <SignInForm
                  {...props}
                  updateUserData={this.props.updateUserData}
                />
              )}
            />
            <Route
              path="/sign"
              render={props => (
                <SignUpForm
                  {...props}
                  updateUserData={this.props.updateUserData}
                />
              )}
            />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
