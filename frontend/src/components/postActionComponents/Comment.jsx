import * as React from 'react';

import Grid from '@mui/material/Grid';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { getAuthorInfo } from ".././baseElement/toolFuntions";

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
//


class Comment extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      name: "new user"
    }
    this.getInfo();

  }

  // componentDidMount() {
  //   console.log(this.props.item.comment_author)
  //   var temp = getAuthorInfo(this.props.item.comment_author).catch(err=>{
  //     console.log("bugbugbug")
  //   });
  //   var author = temp.data;
  //   if (author != undefined){
  //     this.setState( {
  //       name: author.displayName
  //     })
  //   }
  //   console.log(author)
  //   // const name = "author.data.displayName";
  //   // console.log(name);

  // }

  getInfo = async () => {
    const authorId = this.props.item.comment_author;
    var temp = await getAuthorInfo(authorId).catch(err=>{
      console.log("bugbugbug")
    });
    var author = temp.data;

    console.log(author);

    this.setState({
      name: author.displayName
    })

  }
  render(){

    return(
      <li>@ {this.state.name}: {this.props.item.comment} </li>

    )
  }



}

export default class CommentList extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }

  renderComments = () =>{
    try{

    const comments = this.props.comments;
    console.log(comments);
    if (comments === undefined) {
      return null
    } 
    
 
      console.log(comments)
      return comments.length === 0
      ? null
      : (comments?.map(item => (

        <Comment item = {item} />
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
