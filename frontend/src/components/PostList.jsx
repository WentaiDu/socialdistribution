import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Grid from '@mui/material/Grid';
import axios from "axios";
import PrimarySearchAppBar from './Sidebar';
import { Link } from 'react-router-dom';
import AddPost from "./Post";
import { useState } from "react";

import Button from '@mui/material/Button';
import PostAction from "./PostAction";
import { SinglePost } from "./baseElement/baseElement";

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';



class PostList extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get(`${base_url}/author/${this.props.authorId}/posts/`,
    {
      headers: {
        Authorization: "token " + this.props.token,
      },
    })
      .then(res => {
        console.log(res);
        const posts = res.data;
        console.log(posts);

        this.setState(posts);
        console.log(this.state.posts);

    })
  }

 

  renderPosts = () =>{
    const {posts} = this.state;
    return posts.length === 0
        ? <li>You don't have post</li>
        : (posts.map(item => (

          <ListItem key = {item.post_id}>
            <SinglePost userId = {this.props.authorId} post = {item} />
          </ListItem> ))
          )

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
              // maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >         
            {this.renderPosts()}
          </List>
        </Grid>
      )
    }
}



export default function Posts(props) {
  const jwtToken = localStorage.getItem('jwtToken');
  const userID = localStorage.getItem('userID');
  console.log(jwtToken)
  console.log(userID)
  
    var authorId = props.author_id
    const [addPage, setAddPage] = useState(false);
    const token = localStorage.getItem('jwtToken')
    function RenderAddButton(){
      if (addPage){
        return(<AddPost onClick = {submitORCancelOnClick} authorId = {authorId}/>);
      }
      return null;
    }

    function RenderAddAddButton(){
      if (authorId == userID){
        return(
        
          <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          
        > <Button onClick = {addOnClick}> Add Post</Button><RenderAddButton/></Grid> 
        );
      }
      return null;
    }
    function addOnClick(){
      console.log("add click");
      setAddPage(true);
    }

    function submitORCancelOnClick(){
      console.log("end click");
      setAddPage(false);
    }

    return(
        <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center"
    >
   
            {/* <RenderAddAddButton/>   */}
   <div><PostList token = {token} authorId = {authorId} /></div></Grid> 
   );
}
