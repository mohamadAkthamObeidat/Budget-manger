import React, { Component } from "react";
import { Link, NavLink, Switch, Route } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <div className="App__Aside"></div>
        <div className="App__Form">
          <div className="PageSwitcher">
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
          </div>

          <div className="FormTitle">
            <NavLink
              to="/login"
              activeClassName="FormTitle__Link--Active"
              className="FormTitle__Link"
            >
              Sign In
            </NavLink>{" "}
            or{" "}
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
              path="/"
              render={props => (
                <SignInForm
                  {...props}
                  updateUserData={this.props.updateUserData}
                />
              )}
            />
            <Route path="/sign" component={SignUpForm} />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
