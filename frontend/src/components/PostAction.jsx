import * as React from 'react';
import Grid from "@mui/material/Grid";
import Like from "./postActionComponents/Like";
import Share from "./postActionComponents/Share";
import Comment from "./postActionComponents/CommentButton";
import CommentList from "./postActionComponents/Comment";

import axios from "axios";

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
            for(let item of temp){

                console.log(userID);
                console.log(item.author.author_id);

                if (item.author.author_id === userID){
                    this.setState({
                        commentClicked: this.state.commentClicked,
                        alreadyLiked: !this.state.alreadyLiked,
                    })
                    break;
                }
            }
        })
      }

    onClickLike = () => {
        console.log("like clicked")
        const authorId = this.props.post.author.author_id;
        const postData = {
            type: "like",
            summary: "try",
            author:        {
                "username": "Jinglong",
                "password": "pbkdf2_sha256$216000$5VAXRBnJ9D6k$mfXEgQYr4NWVFuPaqEV1OJrMk9v+VoY+RFrCTEgw1gQ=",
                "author_type": "author",
                "author_id": "bc03844a-8630-400b-a335-e840026bee4d",
                "host": "http://127.0.0.1:8000/",
                "displayName": "Jinglong",
                "url": "http://127.0.0.1:8000/author/bc03844a-8630-400b-a335-e840026bee4d",
                "github": "http://github.com/Jinglong",
                "profileImage": "/media/user.jpg"
            },
            object: URL,
        }
        axios.post(`${base_url}/author/${authorId}/inbox`, postData,
        {
          headers: {
            Authorization: "Token " + token,
            "X-CSRFToken":  token,

          },
        })
          .then(res => {
            const comment = res.data;
            console.log(comment);
        })
      
    }

    onClickComment = () => {
        console.log("comment clicked")
        this.setState({
            commentClicked: !this.state.commentClicked,
            alreadyLiked: this.state.alreadyLiked,
        })

    }

    onClickShare = () => {
        console.log("share clicked")

    }

    renderCommentList = () =>{
        console.log("render comment")

        if (this.state.commentClicked){
            return (
                <CommentList />
            )
        }
        else{
            return null;
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
            {this.renderCommentList()}
            </Grid>

        )
    }

}