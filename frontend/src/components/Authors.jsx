import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import axios from "axios";
import './style/author.css'
import CircularProgress from '@mui/material/CircularProgress';
import { SingleAuthor } from "./baseElement/baseElement";
import { OnlineSingleAuthor } from "./baseElement/connectionBaseElement";
import Box from '@mui/material/Box';


import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';


const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken')


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
      <BottomNavigationAction
        label="T18"
        value="4"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
    </Paper>
  );
}



export default function Authors() {
  const [value, setValue] = React.useState(0);

  function onClickChange(newValue){
    setValue(newValue)
  }


  function renderAuthors(){
    if(value == "0"){
      return(<AuthorList  />)
    }
    if(value == "1"){
      return(<AuthorList3  />)
    }
    if(value == "2"){
      return(<AuthorList2  />)
    }
    if(value == "3"){
      return(<AuthorList4  />)
    }
    if(value == "4"){
      return(<AuthorList5  />)
    }
  }

  
  return(<div style={{backgroundColor:'#20B2AA',width:'100%',padding:'20px'}}>
  {renderAuthors()}
  <Box sx={{ width: "100%", height: 50 }}>

  <LabelBottomNavigation onClickChange ={onClickChange} />
  </Box>
  </div>)
}


class AuthorList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authors: []
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

          <ListItem key = {item.id} style={{width:'100%'}}>
                <SingleAuthor author = {item} badge = {"local"}/>
          </ListItem>)))

        };

    render(){
      return (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          color
        >
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }}
            className='list_author'
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
                  <OnlineSingleAuthor author = {item} badge = {"T10"}/>
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
              bgcolor: 'background.paper',
            }}
            className='list_author'

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
                      <OnlineSingleAuthor author = {item} badge = {"T1"}/>
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
          color
        >
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }}
            className='list_author'

          >
            {this.renderAuthors()}
          </List>
        </Grid>
      )
    }
}


class AuthorList5 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authors: [],
      data:[]
    }
  }


  componentDidMount() {
    axios.get('https://cmput404-socialdistributio-t18.herokuapp.com/authors',{})
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
                      <OnlineSingleAuthor author = {item} badge = {"T18"}/>
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
          color
        >
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }}
            className='list_author'

          >
            {this.renderAuthors()}
          </List>
        </Grid>
      )
    }
}


class AuthorList4 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authors: [],
      data:[]
    }
  }


  componentDidMount() {
    axios.get('https://cmput404-socialdistributio-t18.herokuapp.com/authors/',{})
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
                      <OnlineSingleAuthor author = {item} badge = {"T12"}/>
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
          color
        >
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }}
            className='list_author'

          >
            {this.renderAuthors()}
          </List>
        </Grid>
      )
    }
}