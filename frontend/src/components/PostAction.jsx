import * as React from 'react';
import Grid from "@mui/material/Grid";
import Like from "./postActionComponents/Like";
import Share from "./postActionComponents/Share";
import Comment from "./postActionComponents/CommentButton";
import CommentList from "./postActionComponents/Comment";
import LikeList from "./postActionComponents/LikeList";
import AddComment from "./postActionComponents/AddComment";

import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ForumIcon from '@mui/icons-material/Forum';
import { getUserInfo } from "./baseElement/toolFuntions";

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken');
const URL = window.location.href;
const userID = localStorage.getItem('userID');

export default class PostAction extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);

        this.state = {
            commentClicked: false,
            alreadyLiked: false,
            likes: [],
            comments: [],
            showAddComment: false,
        }
    }

    componentDidMount() {
        const authorId = this.props.post.author.author_id;
        const postId = this.props.post.post_id;
        axios.get(`${base_url}/author/${authorId}/posts/${postId}/likes/`,
        {
          headers: {
            Authorization: "Token " + token,
          },
        })
          .then(res => {
            const temp = res.data;
            console.log(temp);

            this.setState({
                commentClicked: this.state.commentClicked,
                alreadyLiked: this.state.alreadyLiked,
                likes: temp,
                comments: this.state.comments,
            })
            for(let item of temp){

                console.log(userID);
                console.log(item.author.author_id);

                if (item.author.author_id === userID){
                    this.setState({
                        commentClicked: this.state.commentClicked,
                        alreadyLiked: !this.state.alreadyLiked,
                        likes: this.state.likes,
                        comments: this.state.comments,
                        showAddComment: false,
                    })
                    break;
                }
            }
        })

        axios.get(`${base_url}/author/${authorId}/posts/${postId}/comments/`,
        {
          headers: {
            Authorization: "Token " + token,
          },
        })
          .then(res => {
            const temp2 = res.data.comments;
            console.log(temp2);

            this.setState({
                commentClicked: this.state.commentClicked,
                alreadyLiked: this.state.alreadyLiked,
                likes: this.state.likes,
                comments: temp2,
            })
        })
      }

    onClickLike = async () => {
        console.log("like clicked")
        const authorId = this.props.post.author.author_id;
        var temp = await getUserInfo().catch(err=>{
          console.log("bugbugbug")
        });
        var user = temp.data;

        console.log(user);
        const summaryTxt = user.displayName + " Likes your post";
        const postData = {
            type: "like",
            summary: summaryTxt,
            context: "http://127.0.0.1:8000/",
            author: user,
            object: this.props.post.source,
        }
        axios.post(`${base_url}/author/${authorId}/inbox`, postData,
        {
          headers: {
            Authorization: "Token " + token,
            "X-CSRFToken":  token,

          },
        })
          .then(res => {
            const like = res.data;
            console.log(like);
            this.setState({
              commentClicked: this.state.commentClicked,
              alreadyLiked: !this.state.alreadyLiked,
              likes: this.state.likes,
              comments: this.state.comments,
              showAddComment: false,
          })
        })
      
    }

    onClickComment = () => {
      
        console.log("comment clicked")
        if (this.state.showAddComment){
          this.setState({
            commentClicked: !this.state.commentClicked,
            alreadyLiked: this.state.alreadyLiked,
            likes: this.state.likes,
            comments: this.state.comments,
            showAddComment: false,

        })  
        }
        else{
          this.setState({
            commentClicked: !this.state.commentClicked,
            alreadyLiked: this.state.alreadyLiked,
            likes: this.state.likes,
            comments: this.state.comments,
            showAddComment: true,

        })
        }


    }

    onClickShare = () => {
        console.log("share clicked")

    }

    onClickClose = () =>{

      this.setState({
        commentClicked: !this.state.commentClicked,
        alreadyLiked: this.state.alreadyLiked,
        likes: this.state.likes,
        comments: this.state.comments,
        showAddComment: false,
      })
    }
    renderAddComment = () =>{
      const postId = this.props.post.post_id;
      const authorId = this.props.post.author.author_id;

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
              >
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
            <Like onClickLike = {this.onClickLike} alreadyLiked = {this.state.alreadyLiked}/>
            <Comment onClickComment = {this.onClickComment}/>
            <Share onClickShare = {this.onClickShare}/>
            </Grid>
            {this.renderAddComment()}


            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                >
            
            <FavoriteIcon size = "large"/>
            <LikeList likes = {this.state.likes}/>

            </Stack>


            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                >
            
            <ForumIcon size = "large"/>
            <CommentList comments = {this.state.comments}/>
            </Stack>
                </Stack>




        )
    }

}