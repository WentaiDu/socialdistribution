import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useState } from "react";
import Box from '@mui/material/Box';

import { SinglePost } from "./baseElement/baseElement";

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const token = localStorage.getItem('jwtToken')
const userID = localStorage.getItem('userID')


const jwtToken = localStorage.getItem('jwtToken');


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function LabelBottomNavigation(props) {
  const [value, setValue] = React.useState('recents');
  console.log(props);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.onClickChange(newValue)
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

    <BottomNavigation sx={{ width: "100%" }} value={value} onChange={handleChange}>

      <BottomNavigationAction
        label="Local"
        value="0"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="T01"
        value="1"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="T10"
        value="2"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="T12"
        value="3"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
    </Paper>
  );
}




export default function MainPage(props) {
  const [value, setValue] = React.useState("0");


  function onClickChange(newValue){
    setValue(newValue)
  }


  function renderPosts(){
    if(value == "0"){
      return(<PostList  />)
    }
    if(value == "1"){
      return(<PostList3  />)
    }
    if(value == "2"){
      return(<PostList2  />)
    }
    if(value == "3"){
      return(<PostList4  />)
    }
  }


  return(
      <Stack 
      direction="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor= '#20B2AA'
              spacing={2}>
        <span>
        {renderPosts()}
        </span>
        <Box sx={{ width: "100%", height: 50 }}>

        <LabelBottomNavigation onClickChange ={onClickChange} />
        </Box>

        </Stack>

        );
  // return(<div style={{backgroundColor:'#20B2AA',width:'100%',padding:'20px'}}>
  // </div>)
}


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
        const posts = Object.values(this.state);
        console.log(posts)
        
        return posts.length === 0
            ? null
            : (posts.map(item => (
    
              <ListItem key = {item.post_id} >

                <SinglePost post = {item} />
              </ListItem> ))
              )
    
        }
      
      catch(e){
          console.log(e)
          return <CircularProgress/>;
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
              // width: '100%',
              width: 1000,
              // maxWidth: 1000,
              // minWidth: 1000,
              bgcolor: '#F5F5F5',
            }}
          >         
            {this.renderPosts()}
          </List>
        </Grid>
      )
    }
}

class PostList2 extends React.Component {
    constructor(props){
      super(props);
      console.log(props);
      this.state = {
        posts: [],
      }
    }
  

    componentDidMount() {
      axios.get(`https://social-distribution-t10.herokuapp.com/api/authors/?size=99`,
      {
        headers: {
            "X-CSRFToken": "nNXYy5zg9rWT4t8vdJfhg5bbtvbSHMPMVIltbT14UCOMdga0MbJYJQmkfWEAU18L"      
        
        },
      })
        .then( async (res )=> {
          const temp = res.data;
          console.log(temp);
          var result = [];
          for (let item of temp.data){
            await new delay(1002);

            console.log(item)
            var currentLink = item.url + "/posts/"
            console.log(currentLink)
            axios.get(currentLink,
                {
                  headers: {
                      "X-CSRFToken": "nNXYy5zg9rWT4t8vdJfhg5bbtvbSHMPMVIltbT14UCOMdga0MbJYJQmkfWEAU18L"      
                  
                  },
                })
                  .then(res => {
                  var value = res.data.data;
                  console.log(value);
                  for (let item of value){
                    result.push(item)
                  }
                })
                .catch( e => {
                    console.log(e)
                }).then(() => {
                  console.log(result);
                  this.setState({posts:result,})
                })

          }

  
      })
    }
  
   
  
    renderPosts = () =>{
     const posts = this.state.posts
        console.log(this.state);
        try{
          return posts.length === 0
              ?  <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            ><CircularProgress/></Stack>
              : (posts.map(item => (
      
                <ListItem key = {item.post_id}>
                  <SinglePost post = {item} badge = {"T10"}/>
                </ListItem> ))
                )
      
          }
        
        catch(e){
            console.log(e)
            return  <CircularProgress/>;
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
                // width: '100%',
                // maxWidth: 1000,
                // minWidth: 1000,
                width: 1000,
                bgcolor: 'background.paper',
              }}
            >         
              {this.renderPosts()}
            </List>
          </Grid>
        )
      }
  }
  

  class PostList3 extends React.Component {
    constructor(props){
      super(props);
      console.log(props);
      this.state = {
        posts: [],
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
          const temp = res.data;
          console.log(temp);
          var result = [];
          for (let item of temp.items){
            console.log(item)
            var currentLink = item.url + "/posts/"
            console.log(currentLink)
            axios.get(currentLink,
                {
                  headers: {
                      "X-CSRFToken": "nNXYy5zg9rWT4t8vdJfhg5bbtvbSHMPMVIltbT14UCOMdga0MbJYJQmkfWEAU18L"      
                  
                  },
                })
                  .then(res => {
                  var value = res.data.items;
                  console.log(value);
                  for (let item of value){
                    result.push(item)
                  }
                })
                .catch( e => {
                    console.log(e)
                }).then(() => {
                  console.log(result);
                  this.setState({posts:result,})
                })

          }

  
      })
    }
  
   
  
    renderPosts = () =>{
     const posts = this.state.posts
        console.log(this.state);
        try{
          return posts.length === 0
              ? null
              : (posts.map(item => (
      
                <ListItem key = {item.post_id}>
                  <SinglePost userId = {this.props.authorId} post = {item} badge = {"T1"}/>
                </ListItem> ))
                )
      
          }
        
        catch(e){
            console.log(e)
            return  <CircularProgress/>;
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
                // width: '100%',
                // maxWidth: 1000,
                // minWidth: 1000,
                width: 1000,
                bgcolor: 'background.paper',
              }}
            >         
              {this.renderPosts()}
            </List>
          </Grid>
        )
      }
  }



  
  class PostList4 extends React.Component {
    constructor(props){
      super(props);
      console.log(props);
      this.state = {
        posts: [],
      }
    }
  

    componentDidMount() {
      axios.get('https://glowing-palm-tree1.herokuapp.com/service/authors/', {})
        .then(res => {
          const temp = res.data;
          console.log(temp);
          var result = [];
          for (let item of temp.data){
            console.log(item)
            var currentLink = item.url + "/posts/"
            console.log(currentLink)
            axios.get(currentLink,{})
                  .then(res => {
                  var value = res.data.data;
                  console.log(value);
                  for (let item of value){
                    result.push(item)
                  }
                })
                .catch( e => {
                    console.log(e)
                }).then(() => {
                  console.log(result);
                  this.setState({posts:result,})
                })

          }

  
      })
    }
  
   
  
    renderPosts = () =>{
     const posts = this.state.posts
        console.log(this.state);
        try{
          return posts.length === 0
              ? null
              : (posts.map(item => (
      
                <ListItem key = {item.post_id}>
                  <SinglePost userId = {this.props.authorId} post = {item} badge = {"T12"}/>
                </ListItem> ))
                )
      
          }
        
        catch(e){
            console.log(e)
            return <CircularProgress/>;
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
                // width: '100%',
                // maxWidth: 1000,
                // minWidth: 1000,
                width: 1000,
                bgcolor: 'background.paper',
              }}
            >         
              {this.renderPosts()}
            </List>
          </Grid>
        )
      }
  }