import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Inbox from "./components/Inbox";
import Post from "./components/Post";
import Authors from "./components/Authors";
import Author from "./components/Author";
import Posts from "./components/PostList";
import Followers from "./components/Followers";
import PostDetail from "./components/PostDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Connection from "./components/connection";
import Try from "./components/try";

const URL = window.location.href;

function App() {

  // function redir (){
  //   URL.charAt(URL.length-1) !== "/"
  //   ? window.location.href= window.location.href + "/"
  //   : console.log("have /") ;
  // }

  // redir()

  return (
    <><React.Fragment>
      <AppBar position="fixed">
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment><Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Connection" exact component={Connection} />
          <Route path="/Signup" exact component={Signup} />
          <Route path="/Post" exact component={Post} />
          <Route path="/Author/:author_id/Inbox" exact component={Inbox} />
          <Route path="/Author/:author_id/posts/:post_id" component={PostDetail} />
          <Route path="/Author/:author_id/posts" component={Posts} />
          <Route path="/Author/:author_id/followers" exact component={Followers} />

          <Route path="/Author/:author_id" exact component={Author} />
          <Route path="/Authors" exact component={Authors} />
          <Route path="/try" exact component={Try} />

        </Switch>
      </Router></>
  );
}

export default App;
