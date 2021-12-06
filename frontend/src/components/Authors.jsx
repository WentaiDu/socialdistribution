import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useState } from "react";

import Button from '@mui/material/Button';
import PostAction from "./PostAction";
import { SinglePost } from "./baseElement/baseElement";
import CircularProgress from '@mui/material/CircularProgress';
import { SingleAuthor } from "./baseElement/baseElement";

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken')

export default function Authors() {

  return(<div>
  <AuthorList  />
  <AuthorList2  />
  <AuthorList3 />
  </div>)
}


class AuthorList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authors: []
      // authors: [{author_id:1,username:"dragon",profileImage:"/media/user.jpg"}]
    }
  }

  componentDidMount() {
    axios.get(`${base_url}/authors/`,    
    {
      headers: {
        // "X-CSRFToken": this.props.token
        Authorization:"Token " + token,

      },
    })
      .then(res => {
        const authors = res.data;
        console.log(authors);
        this.setState( authors );
    })

  }

  renderAuthors(){
    const {authors} = this.state;
    console.log(authors)
    return authors.length === 0
        ? (<CircularProgress />)
        : (authors.map(item => (

          <ListItem key = {item.id}>
                <SingleAuthor author = {item}/>
          </ListItem>)))

        };

    render(){
      return (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
            {this.renderAuthors()}
          </List>
        </Grid>
      )
    }
}


class AuthorList2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authors: [],
      data:[]
    }
  }


  componentDidMount() {
    axios.get(`https://social-distribution-t10.herokuapp.com/api/authors/?size=99`,
    {
      headers: {
          "X-CSRFToken": "nNXYy5zg9rWT4t8vdJfhg5bbtvbSHMPMVIltbT14UCOMdga0MbJYJQmkfWEAU18L"      
      
      },
    })
      .then(res => {
        console.log(res);

        this.setState(res.data);
        console.log(this.state);

    })
  }

  renderAuthors(){
      try{
          const authorList = this.state.data;
          return authorList.length === 0
              ? (<CircularProgress />)
              : (authorList.map(item => (
      
                <ListItem key = {item.author_id}>
                      <SingleAuthor author = {item} badge = {"T10"}/>
                </ListItem>)))
      
              }
      
      
      catch(e){
          return null
      }
  }

    render(){
      return (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
            {this.renderAuthors()}
          </List>
        </Grid>
      )
    }
}

class AuthorList3 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authors: [],
      data:[]
    }
  }


  componentDidMount() {
    axios.get('https://social-distance-api.herokuapp.com/authors/',
    {
      headers: {
          "X-CSRFToken": "nNXYy5zg9rWT4t8vdJfhg5bbtvbSHMPMVIltbT14UCOMdga0MbJYJQmkfWEAU18L"      
      
      },
    })
      .then(res => {
        console.log(res);

        this.setState(res.data);
        console.log(this.state);

    })
  }

  renderAuthors(){
      try{
          const authorList = this.state.items;
          return authorList.length === 0
              ? (<CircularProgress />)
              : (authorList.map(item => (
      
                <ListItem key = {item.author_id}>
                      <SingleAuthor author = {item} badge = {"T1"}/>
                </ListItem>)))
      
              }
      
      
      catch(e){
          return null
      }
  }

    render(){
      return (
        <Grid
          container
          direction="column"
        >
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
            {this.renderAuthors()}
          </List>
        </Grid>
      )
    }
}