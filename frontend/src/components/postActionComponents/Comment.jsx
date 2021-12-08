import * as React from 'react';

import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { getAuthorInfo,getUserInfo } from ".././baseElement/toolFuntions";
import Like from ".././postActionComponents/Like";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken')
const userID = localStorage.getItem('userID');


class Comment extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      name: "new user",
      alreadyLiked:false,
    }
    this.getInfo();

  }

  
  componentDidMount() {
    const url = this.props.item;

    console.log(url)
    // axios.get(`${url}/likes/`,
    // {
    //   headers: {
    //     Authorization: "Token " + token,
    //   },
    // })
    //   .then(res => {
    //     const temp = res.data;
    //     console.log(temp);

    //     this.setState((prevState, props) => {
    //       prevState.likes = temp
    //       return prevState;
    //    });
    //     for(let item of temp){

    //         console.log(userID);
    //         console.log(item.author.author_id);

    //         if (item.author.author_id === userID){

    //             this.setState((prevState, props) => {
    //               prevState.alreadyLiked = true;
    //               return prevState;
    //            });
    //             break;
    //         }
    //     }
    // })
  }

  onClickLike = async () => {
    // console.log("like clicked")
    // const authorId = this.props.post.author.author_id;
    // var temp = await getUserInfo().catch(err=>{
    //   console.log("bugbugbug")
    // });
    // var user = temp.data;

    // console.log(user);
    // const summaryTxt = user.displayName + " Likes your post";
    // const postData = {
    //     type: "like",
    //     summary: summaryTxt,
    //     context: "http://127.0.0.1:8000/",
    //     author: user,
    //     object: this.props.post.source,
    // }
    // axios.post(`${base_url}/author/${authorId}/inbox`, postData,
    // {
    //   headers: {
    //     Authorization: "Token " + token,
    //     "X-CSRFToken":  token,

    //   },
    // })
    //   .then(res => {
    //     const like = res.data;
    //     console.log(like);

    //   this.setState((prevState, props) => {
    //     prevState.alreadyLiked = true
    //     return prevState;
    //  });
    // })
  
  }

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

      <Card variant="outlined">
      <Stack direction="row" spacing={2}>
      <li>@ {this.state.name}: {this.props.item.comment}</li> <Like onClickLike = {this.onClickLike} alreadyLiked = {this.state.alreadyLiked}/>
       </Stack></Card>

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
