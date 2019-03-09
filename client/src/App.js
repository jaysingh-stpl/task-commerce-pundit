import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import { setCurrentUser } from "./actions/authAction";
import jwt_decode from "jwt-decode";
import store from "./store/store";
import setAuthToken from "./utils/setAuthToken";
import Home from "./components/home/Home";
import NotFound from "./components/error/404";

// check for token
if (localStorage.token) {
  // Set auth token header auth
  setAuthToken(localStorage.token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    localStorage.clear();
    window.location.href = "/";
  }
}
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
