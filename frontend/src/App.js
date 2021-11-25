import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Post from "./components/Post";
import Test from "./components/Test";
import Authors from "./components/Authors";
import Author from "./components/Author";
import Posts from "./components/PostList";
import PostDetail from "./components/PostDetail";
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
          <Route path="/Authors" exact component={Authors} />
          <Route path="/Author/:author_id/posts/:post_id" component={PostDetail} />
          <Route path="/Author/:author_id/posts" component={Posts} />
          <Route path="/Author/:author_id" exact component={Author} />

        </Switch>
      </Router></>
  );
}

export default App;
