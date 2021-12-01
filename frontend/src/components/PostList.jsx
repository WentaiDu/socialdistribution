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
        ? (<ListItem>
          <ListItemText primary="404 Not Found" secondary="" />
          </ListItem>)
        : (posts.map(item => (

          <ListItem key = {item.post_id}>
            {/* <Link to={"/author/"+this.props.authorId+"/posts/"+item.post_id} replace style={{color:'black'}}>

            <ListItemText primary={item.title} secondary={item.description} />
            </Link> */}
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
              maxWidth: 360,
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
  
    var authorId = props.match.params.author_id
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
  >      <RenderAddAddButton/>   <div><PostList token = {token} authorId = {authorId} /></div></Grid> );
}
