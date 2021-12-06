import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Grid from '@mui/material/Grid';
import axios from "axios";

import { SingleActivity } from ".././baseElement/baseElement";
import { getAuthorInfo } from ".././baseElement/toolFuntions";
import CircularProgress from '@mui/material/CircularProgress';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';



export default class GithubList extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
    }
  }



    async componentDidMount() {

    const authorId = this.props.authorId;
    var temp = await getAuthorInfo(authorId).catch(err => {
      console.log("bugbugbug")
    });
    var author = temp.data;


    const name = author.github
    let nameList = name.split("/")
    let resultURL = nameList.pop();
    console.log(resultURL)
    var temp2 = await axios.get(`https://api.github.com/users/${resultURL}/events`)
      
    var activity = temp2.data;
    this.setState(activity);
    console.log(author);

    console.log(this.state);

    // temp2.then(res => {
    //     console.log(res);
    //     const activity = res.data;


    // })
  }

 

  renderPosts = () =>{
    const activity = Object.values(this.state);
    console.log(activity);
    try{
        return activity.length === 0
        ? null
        : (activity.map(item => (

          <ListItem key = {item.id}>
            {/* <Link to={"/author/"+this.props.authorId+"/posts/"+item.post_id} replace style={{color:'black'}}>

            <ListItemText primary={item.title} secondary={item.description} />
            </Link> */}
            <SingleActivity userId = {this.props.authorId} activity = {item} />
          </ListItem> ))
          )

      } 
    
    catch(e){
        console.log(e)
        return <CircularProgress />

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