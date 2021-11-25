import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Post from "./components/Post";
import Test from "./components/Test";
import Authors from "./components/Authors";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';




function App() {
  return (
    <><React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment><Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Signup" exact component={Signup} />
          <Route path="/Post" exact component={Post} />
          <Route path="/Test" exact component={Test} />
        // <Route path="/Authors" exact component={Authors} />
        </Switch>
      </Router></>
  );
}

export default App;
