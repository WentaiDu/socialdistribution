import * as React from 'react';
import Grid from "@mui/material/Grid";
import Like from "./postActionComponents/Like";
import Share from "./postActionComponents/Share";
import Comment from "./postActionComponents/CommentButton";
import CommentList from "./postActionComponents/Comment";
import LikeList from "./postActionComponents/LikeList";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ForumIcon from '@mui/icons-material/Forum';

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
            const temp2 = res.data;
            console.log(temp2);

            this.setState({
                commentClicked: this.state.commentClicked,
                alreadyLiked: this.state.alreadyLiked,
                likes: this.state.likes,
                comments: temp2,
            })
        })
      }

    onClickLike = () => {
        console.log("like clicked")
        const authorId = this.props.post.author.author_id;
        const postData = {
            type: "like",
            summary: "try",
            context: "http://127.0.0.1:8000/",
            author:  {
                "username": "1",
                "password": "pbkdf2_sha256$216000$f2jl8xXvHJJw$8+ulbnZxvcnE9dIXotuBleZi2Rk4bLeK3VW0xccqofo=",
                "author_type": "author",
                "author_id": "cec7aa33-1963-4dad-9ce7-4ca61178bba9",
                "host": "http://127.0.0.1:8000/",
                "displayName": "3",
                "url": "http://127.0.0.1:8000/authors/08923451-b5da-4043-a5f9-12b5289c9a25",
                "github": "http://github.com/3",
                "profileImage": "http://127.0.0.1:8000/media/user.jpg"
            },
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
            const comment = res.data;
            console.log(comment);
        })
      
    }

    onClickComment = () => {
        console.log("comment clicked")
        this.setState({
            commentClicked: !this.state.commentClicked,
            alreadyLiked: this.state.alreadyLiked,
            likes: this.state.likes,
            comments: this.state.comments,
        })

    }

    onClickShare = () => {
        console.log("share clicked")

    }

    render(){
        console.log(this.state);
        return (
                <Stack
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
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
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                >
            
            <FavoriteIcon size = "large"/>
            <LikeList likes = {this.state.likes}/>

            </Stack>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                >
            
            <ForumIcon size = "large"/>
            <CommentList comments = {this.state.comments}/>
            </Stack>

            </Stack>

        )
    }

}