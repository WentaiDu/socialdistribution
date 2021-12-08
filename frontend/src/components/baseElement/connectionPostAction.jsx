import * as React from 'react';
import Grid from "@mui/material/Grid";
import Like from "../postActionComponents/Like";
import Share from "../postActionComponents/Share";
import Comment from "../postActionComponents/CommentButton";
import LikeList from "../postActionComponents/LikeList";
import AddComment from "../postActionComponents/AddComment";

import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ForumIcon from '@mui/icons-material/Forum';
import { getUserInfo,b64EncodeUnicode ,getAuthorInfo} from "./toolFuntions";
import DialogFriendlist from "../Friend/index";
import CircularProgress from '@mui/material/CircularProgress';
import Card from "@mui/material/Card";


const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken');
const URL = window.location.href;
const userID = localStorage.getItem('userID');


const T1PostComments = {
  "author": {
    "id": "string",
    "host": "string",
    "displayName": "string",
    "url": "string",
    "github": "string",
    "profileImage": "string",
    "profileColor": "string"
  },
  "comment": "string",
  "contentType": "text/markdown"
}
const T1PostInboxLike = {
  "type": "Like",
  "summary": "string",
  "author": {
    "id": "string",
    "host": "string",
    "displayName": "string",
    "url": "string",
    "github": "string"
  },
  "object": "string"
}
const T1Head = {


  headers: {
      Authorization: "Basic "+ b64EncodeUnicode("dragon2:Dragon123!")
  }
}



export default class ConnectionPostAction extends React.Component{
    constructor(props){
        super(props);
        console.log(props);

        this.state = {
            alreadyLiked: false,
            likes: [],
            comments: [],
            showAddComment: false,
            friendListOpen: false,
            PostInboxLike: {},
            head: "",
            PostComments: {},
        }

        if (this.props.badge == "T1"){
          this.state.PostInboxLike = T1PostInboxLike;
          this.state.PostComments = T1PostComments;
          this.state.head = T1Head;
        }
    }

    componentDidMount() {
        const authorId = this.props.post.author.id;
        const postId = this.props.post.id;
        console.log(authorId)
        console.log(postId)
        axios.get(`${postId}/likes/`,this.state.head)
          .then(res => {
            const temp = res.data;
            console.log(temp);

            this.setState((prevState, props) => {
              prevState.likes = temp
              return prevState;
           });
            for(let item of temp){

                console.log(userID);
                console.log(item.author.id);

                if (item.author.id.includes(userID)){
 
                    this.setState((prevState, props) => {
                      prevState.alreadyLiked = true;
                      return prevState;
                   });
                    break;
                }
            }
        })

        axios.get(`${postId}/comments/`,
        {
          headers: {
            Authorization: "Token " + token,
          },
        })
          .then(res => {
            const temp2 = res.data.comments;
            console.log(temp2);

            this.setState((prevState, props) => {
              prevState.comments = temp2
              return prevState;
           });
            
        })
      }

    onClickLike = async () => {
      const authorId = this.props.post.author.id;

        console.log("like clicked")
        var temp = await getUserInfo().catch(err=>{
          console.log("bugbugbug")
        });
        var user = temp.data;

        console.log(user);
        const summaryTxt = user.displayName + " Likes your post";
        const postData = {
          "type": "Like",
            summary: summaryTxt,
            context: "http://127.0.0.1:8000/",
            author: {},
            object: this.props.post.source,
        }

        for (let key of Object.keys(this.state.PostInboxLike.author)){
          console.log(key)
          console.log(user[key])
          postData[key] = user[key];
        }
        postData.author["type"] = "author";

        axios.post(`${authorId}/inbox/`, postData, this.state.head)
          .then(res => {
            const like = res.data;
            console.log(like);

          this.setState((prevState, props) => {
            prevState.alreadyLiked = true
            return prevState;
         });
        })
      
    }

    onClickComment = () => {

        if (this.state.showAddComment){
          this.setState((prevState, props) => {  
            prevState.showAddComment = false;
            return prevState;
         });  
        

        }
        else{
          this.setState((prevState, props) => {  
            prevState.showAddComment = true;
            return prevState;
         });  
        }


    }

    handleShare = (friend) =>{
      let postData =this.props.post
      postData.author = JSON.stringify(postData.author);
      const authorId = this.props.post.author.id;


      console.log(friend);
      axios.post(`${authorId}/inbox/`, postData,
      {
        headers: {
          Authorization: "Token " + token,
          "X-CSRFToken":  token,

        },
      })
        .then(res => {
          const like = res.data;
          console.log(like);

        this.setState((prevState, props) => {
          prevState.alreadyLiked = !prevState.alreadyLiked
          return prevState;
       });
      })
    }

    onClickShare = () => {
        console.log("share clicked")
        this.setState((prevState, props) => {
          prevState.friendListOpen = true
          return prevState;
       });  

    }
  
    cancelFriendList = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      this.setState((prevState, props) => {
        prevState.friendListOpen = false
        return prevState;
     }); 
  };

    onClickClose = () =>{

      this.setState((prevState, props) => {
        prevState.showAddComment = false        
        return prevState;
     }); 
    }
    renderAddComment = () =>{
      const postId = this.props.post.post_id;
      const authorId = this.props.post.author.id;

      if (this.state.showAddComment){

        return (
        <AddComment onClickClose = {this.onClickClose}  postId = {postId} authorId = {authorId}/>
        )
      }
      return null;

    }

    render(){
        console.log(this.state);
        return (
              <Stack
              direction="column"
              divider={<Divider orientation="horizontal"/>}
              spacing={2}
              className='actions'
              >
            <DialogFriendlist open = {this.state.friendListOpen}  onClickEnd = {this.cancelFriendList} handleShare = {this.handleShare}/>

            <Grid
            container
            direction="row"
            justifyContent="start"
            alignItems="start"
            >
            <Like onClickLike = {this.onClickLike} alreadyLiked = {this.state.alreadyLiked} />
            <Comment onClickComment = {this.onClickComment} />
            <Share onClickShare = {this.onClickShare} />
            </Grid>
            {this.renderAddComment()}


            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                >
            
            <FavoriteIcon size = "large" />
            <LikeList likes = {this.state.likes}/>

            </Stack>


            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                >
            
            <ForumIcon size = "large" />
            <CommentList comments = {this.state.comments}/>
            </Stack>
                </Stack>




        )
    }

}



class SingleComment extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      name: "anonymous",
      alreadyLiked:false,
    }
    this.getInfo();
  }

  
  componentDidMount() {
    const url = this.props.item;

    console.log(url)
  }

  onClickLike = async () => {
  }

  getInfo = async () => {
    try{
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
    catch(e){

    }

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

class CommentList extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
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

          <SingleComment item = {item} />
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
