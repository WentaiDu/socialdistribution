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
import MainPage from "./components/Mainpage";
import { Switch, Route } from "react-router-dom";
import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
import Connection from "./components/connection";
import { BrowserRouter } from 'react-router-dom';
import UserInfo from './components/userInfo/UserInfo';
import './components/userInfo/userInfo.css'
import SimpleDialog from"./components/Friend";
import Header from "./components/userInfo/header";

import CommentList from "./components/postActionComponents/Comment";
import Mess from "./components/Friend/index";

// const history = createBrowserHistory()

// history.push('/test')

// const URL = window.location.href;



function App() {

  const userID = localStorage.getItem('userID')
  console.log(userID);
  if (userID == "null" || userID == undefined){
    return(
      <>
      <BrowserRouter forceRefresh={true}>
      <Header />
        <Switch>
        <Route path="/Friend" exact component={Login} />
            <Route path="/Main" exact component={Login} />
  
            <Route path="/Author/:author_id/posts/:post_id/comments" exact component={Login} />
            <Route path="/" exact component={Login} />
            <Route path="/Connection" exact component={Login} />
            <Route path="/Signup" exact component={Signup} />
            <Route path="/Post" exact component={Login} />
            <Route path="/Author/:author_id/Inbox" exact component={Login} />
            <Route path="/Author/:author_id/posts/:post_id" component={Login} />
            <Route path="/Author/:author_id/posts" component={Login} />
            <Route path="/Author/:author_id/followers" exact component={Login} />
  
            <Route path="/Author/:author_id" exact component={Login} />
            <Route path="/Authors" exact component={Login} />
            <Route path="/UserInfo" exact component={Login} />
            <Route path="/Mess" exact component={Login} />
        </Switch>
      </BrowserRouter></>
    )
  }
  else{
    return (
      <>
       <BrowserRouter forceRefresh={true}>
        <Header />
          <Switch>
          
          <Route path="/Friend" exact component={SimpleDialog} />
            <Route path="/Main" exact component={MainPage} />
  
            <Route path="/Author/:author_id/posts/:post_id/comments" exact component={CommentList} />
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
            <Route path="/UserInfo" exact component={UserInfo} />
            <Route path="/Mess" exact component={Mess} />
  
          </Switch>
        </BrowserRouter></>
    );
  }

}

export default App;
