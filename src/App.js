import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Routines from "./components/Routines";
import MyRoutines from "./components/MyRoutines";
import Activities from "./components/Activities";

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("username"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <div className="App">
        <Navbar token={token} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home currentUser={currentUser} />
            </Route>
            <Route path="/routines">
              <Routines />
            </Route>
            <Route path="/myroutines">
              <MyRoutines token={token} currentUser={currentUser} />
            </Route>
            <Route path="/activities">
              <Activities />
            </Route>
            <Route path="/login">
              <LoginForm setToken={setToken} setCurrentUser={setCurrentUser} />
            </Route>
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/logout">
              <Logout setCurrentUser={setCurrentUser} setToken={setToken} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
