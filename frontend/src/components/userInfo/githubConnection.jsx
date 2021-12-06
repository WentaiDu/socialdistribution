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
import { SingleActivity } from "./baseElement/baseElement";

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';



class GithubList extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      activity: []
    }
  }

  componentDidMount() {
      const name = this.props.author.github
    axios.get(`  https://api.github.com/users/${dragon11150221}/events`)
      .then(res => {
        console.log(res);
        const activity = res.data;
        console.log(activity);

        this.setState(activity);

    })
  }

 

  renderPosts = () =>{
    const {activity} = this.state;
    return activity.length === 0
        ? (<ListItem>
          <ListItemText primary="404 Not Found" secondary="" />
          </ListItem>)
        : (activity.map(item => (

          <ListItem key = {item.post_id}>
            {/* <Link to={"/author/"+this.props.authorId+"/posts/"+item.post_id} replace style={{color:'black'}}>

            <ListItemText primary={item.title} secondary={item.description} />
            </Link> */}
            <SingleActivity userId = {this.props.authorId} post = {item} />
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