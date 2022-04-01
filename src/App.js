import React, { useEffect } from "react";
import "./App.css";
import { UserState } from "./context/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import RedirectPage from "./pages/RedirectPage";
function App() {
  const { user, setUser } = UserState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {<Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/home" /> : <LoginPage />}
        </Route>
        <Route exact path="/register">
          {user ? <Redirect to="/home" /> : <RegisterPage />}
        </Route>
        <Route exact path="/home">
          {user ? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/:shortUrl">
          {!user ? <RedirectPage /> : <RedirectPage />}
        </Route>
        {/* <Route path="/:shortUrl" exact component={RedirectPage} /> */}
      </Switch>
    </Router>
  );
}

export default App;
