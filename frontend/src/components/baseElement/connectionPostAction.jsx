import * as React from 'react';
import Grid from "@mui/material/Grid";
import Like from "../postActionComponents/Like";
import Share from "../postActionComponents/Share";
import Comment from "../postActionComponents/CommentButton";
import LikeList from "../postActionComponents/LikeList";
import {TextField} from "@material-ui/core";
import Button from '@mui/material/Button';

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
      Authorization: "Basic "+ b64EncodeUnicode("Lara:CMPUT404")
  }
}

const T1PostCommentAuthor = {
  "id": "string",
  "host": "string",
  "displayName": "string",
  "url": "string",
  "github": "string",
  "profileImage": "string",
  "profileColor": "string"
}

const T10PostCommentAuthor = {    
  "id": "string",
"host": "string",
"displayName": "string",
"url": "string",
"github": "string",
"profileImage": "string",
"profileColor": "string"}

const T10PostComments = {
  "type": "string",
  "author": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "post": "string",
  "comment": "string",
  "contentType": "string",
  "id": "string"
}

const T10Head = {
  headers: {
      Authorization: "Basic "+ b64EncodeUnicode("Lara:CMPUT404")
  }
}
const T12Head = {
  headers: {
      Authorization: "Basic "+ b64EncodeUnicode("Lara:CMPUT404")
  }
}
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
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
            postCommentAuthor: {},
        }

        if (this.props.badge == "T1"){
          console.log("T1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          this.state.PostInboxLike = T1PostInboxLike;
          this.state.PostComments = T1PostComments;
          this.state.postCommentAuthor =T1PostCommentAuthor;
          this.state.head = T1Head;
        }
        if (this.props.badge == "T10"){
          console.log("T10!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          this.state.PostInboxLike = T1PostInboxLike;
          this.state.PostComments = T10PostComments;
          this.state.postCommentAuthor =T10PostCommentAuthor;

          this.state.head = T10Head;
        }
        if (this.props.badge == "T12"){
          console.log("T12!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          this.state.PostInboxLike = T1PostInboxLike;
          this.state.PostComments = T1PostComments;
          this.state.postCommentAuthor =T1PostCommentAuthor;

          this.state.head = T12Head;
        }
    }

    async componentDidMount() {
        const authorId = this.props.post.author.id;
        var postId = this.props.post.id;
        console.log(authorId)
        console.log(postId)
        if (this.props.badge == "T10"){
          var temp = postId.split('/')
          for (let i in temp){
            if(temp[i] == "posts"){
              temp[i] = "post"
            }
          }
          await new delay(1002)

          postId = temp.join("/")
          axios.get(`${postId}/likes`,this.state.head)
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
        postId = this.props.post.id;
        await new delay(1002)
        axios.get(`${postId}/comments`,this.state.head)
          .then(res => {
            const temp2 = res.data.data;
            console.log(temp2);

            this.setState((prevState, props) => {
              prevState.comments = temp2
              return prevState;
           });
            
        })
        await delay(1002)

        }
        else if (this.props.badge == "T12"){
          
          axios.get(`${postId}/likes`,this.state.head)
          .then(res => {
            const temp = res.data.data;
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

        axios.get(`${postId}/comments`,this.state.head)
          .then(res => {
            const temp2 = res.data.data;
            console.log(temp2);

            this.setState((prevState, props) => {
              prevState.comments = temp2
              return prevState;
           });
            
        })
        

        }
          else{
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

        axios.get(`${postId}/comments/`,this.state.head)
          .then(res => {
            const temp2 = res.data.comments;
            console.log(temp2);

            this.setState((prevState, props) => {
              prevState.comments = temp2
              return prevState;
           });
            
        })
        }

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
        var postData = {
          "type": "Like",
            summary: summaryTxt,
            context: base_url,
            author: {},
            object: this.props.post.source,
        }
        if (this.props.badge == "T12"){
          postData = {
            "type": "Like",
              summary: summaryTxt,
              "@context": base_url,
              author: {},
              object: this.props.post.source,
          }
        }

        for (let key of Object.keys(this.state.PostInboxLike.author)){
          console.log(key)
          console.log(user[key])
          postData["author"][key] = user[key];
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


      console.log(friend);
      axios.post(`${base_url}/author/${friend.author.author_id}/inbox`, postData,
      {
        headers: {
          Authorization: "Token " + token,
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
      const postId = this.props.post.id;
      const authorId = this.props.post.author.id;

      if (this.state.showAddComment){

        return (
        <OnlineAddComment onClickClose = {this.onClickClose}  postId = {postId} authorId = {authorId} head = {this.state.head} 
        commentAuthor = {this.state.postCommentAuthor} commentFrame = {this.state.postComments} badge = {this.props.badge}/>
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
      try{
        var authorName = this.props.item.author.displayName;
        this.setState({
          name: authorName
        })      
      }
      catch(e){

      }
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



class OnlineAddComment extends React.Component{
  constructor(props){
      super(props);
      this.state={
          author:  {},
          comment:"",
          contentType:"text/markdown",
      }
  }


  handleForm = e => {
      const target = e.target;

      const value = target.type === "checkbox"
      ? target.checked
      : target.value;

      const name = target.name;
      console.log(name)
      console.log(value)
      this.setState({
          [name]:value
      })
  }

  handlePost = async () => {
      console.log(this.state);
      if (this.state.comment === ""){
          return null;
      }

      
      console.log("like clicked")
      var temp = await getUserInfo().catch(err=>{
        console.log("bugbugbug")
      });
      var user = temp.data;

      console.log(user);

      var postData;
      if (this.props.badge == "T10"){
         postData = {
          "type": "comment",
          "author": user,
          "post": this.props.postId,
          "comment": this.state.comment,
          "contentType": "text/markdown",
          "id": this.props.postId
        }

      }
      // else if (this.props.badge == "T12"){

      // }
      else{
         postData = this.state;
      
        for (let key of Object.keys(this.props.commentAuthor)){
          postData["author"][key] = user[key];
        }
      }

      if (this.props.badge == "T12"){
        postData["type"] = "comment"
        postData["id"] = this.props.postId

      axios
        .post(`${this.props.postId}/comments`, postData,    this.props.head)
        .then((res) => {
          console.log(res.data);
        })
        .catch(e => {
            console.log(e);
        }); 
      }
      else{
        axios
        .post(`${this.props.postId}/comments/`, postData,    this.props.head)
        .then((res) => {
          console.log(res.data);
        })
        .catch(e => {
            console.log(e);
            axios
            .post(`${this.props.postId}/comments`, postData,    this.props.head)
            .then((res) => {
              console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            }); 
        }); 
      }


        
      this.props.onClickClose();

      } 

  render(){
      const {comment} = this.state;
      return(

          <Stack
          direction="row"
          divider={<Divider orientation="vertical"/>}
          spacing={1}
          >
          <TextField
              required
              name="comment"
              label="comment"
              fullWidth
              variant="standard"
              value={comment}
              onChange={this.handleForm}
          />


          <Button
              type="submit"
              variant="contained"
              sx={{
                  width: 100,
                  m:'auto',
                  borderRadius: 15,
                  backgroundColor: "#00428b",
              }}
              onClick={this.handlePost}
          >
              Submit
          </Button>
          </Stack>
      )
  }
}
