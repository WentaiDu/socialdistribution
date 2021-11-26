import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import axios from "axios";
import PrimarySearchAppBar from './Sidebar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// const token = localStorage.getItem('jwtToken');
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

class Post extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
    }
  }



  componentDidMount() {
    axios.get(`${base_url}/author/${this.props.authorId}/posts/${this.props.postId}/`,
    {
      headers: {
        Authorization: "token " + this.props.token,
      },
    })
      .then(res => {
        const post = res.data;
        console.log(post);
        this.setState(post);
        console.log(this.state);
    })
  }

  renderPosts(){
    try {
        const {post} = this.state;
        console.log(post);
        post.author = this.props.authorId;
        console.log(post);

        return (  Object.entries(post)
        .map(([key,value]) => (
            <Item>{key}: {value}</Item>)))
    }
    catch(e){
        console.log(e);
        return <CircularProgress />;
    }
}


    render(){
      return (
        <Stack spacing={1}>
            {this.renderPosts()}
        </Stack>
      )
    }
}

export default function PostDetail(props) {
    console.log(props);
    const token = localStorage.getItem('jwtToken')
    var authorId = props.match.params.author_id
    var postId = props.match.params.post_id
    return(<Post token ={token} authorId = {authorId} postId ={postId}/>);
}
