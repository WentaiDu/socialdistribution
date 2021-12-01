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

const token = localStorage.getItem('jwtToken')
const userID = localStorage.getItem('userID')

class PostList extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
    }
  }

  componentDidMount() {
    axios.get(`${base_url}/public/`,
    {
      headers: {
        Authorization: "token " + token,
      },
    })
      .then(res => {
        console.log(res);

        this.setState(res.data);
        console.log(this.state);

    })
  }

 

  renderPosts = () =>{
      try{
        const posts = this.state.results;
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
    
        }
      
      catch(e){
          console.log(e)
          return null;
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
            {this.renderPosts()}
          </List>
        </Grid>
      )
    }
}



export default function MainPage(props) {
  const jwtToken = localStorage.getItem('jwtToken');
  const userID = localStorage.getItem('userID');
  console.log(jwtToken)
  console.log(userID)
  
    var authorId = props.match.params.author_id
    const [addPage, setAddPage] = useState(false);


    return(
        <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center"
  >      <div><PostList token = {token} authorId = {authorId} /></div></Grid> );
}
