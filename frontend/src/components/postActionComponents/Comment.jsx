import * as React from 'react';

import Grid from '@mui/material/Grid';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { getUserInfo } from ".././baseElement/toolFuntions";

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
//

export default class LikeList extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }

  renderComments = () =>{
    try{
      var temp = getUserInfo(this.props.authorId).catch(err=>{
        console.log("bugbugbug")
      });
      var user = temp.data;

    const name = user.data.displayName;
    console.log(name);
    const comments = this.props.comments.comments;
    console.log(comments);
    if (comments === undefined) {
      return null
    } 
    
 
      console.log(comments)
      return comments.length === 0
      ? null
      : (comments?.map(item => (
        <li>: {item.comment} </li>
     )))

      }
    
    catch(e){
      console.log(e);
      return (<CircularProgress />)
    }
  }
    render(){
      return (
        <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        >

        {this.renderComments()}

        </Grid>

      )
    }
}
