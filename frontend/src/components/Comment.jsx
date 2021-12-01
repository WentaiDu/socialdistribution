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
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from "axios";
import PrimarySearchAppBar from './Sidebar';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

//

class CommentList extends React.Component {
  constructor(){
    super();
    this.state = {
      comment: []

    }
  }


  componentDidMount() {
    axios.get(`${base_url}/author/${this.props.authorId}/posts/${this.props.postId}/comments`,
    {
      headers: {
        Authorization: "token " + this.props.token,
      },
    })
      .then(res => {
        const comment = res.data;
        console.log(comment);
        this.setState( comment );
    })
  }


  renderComment(){
    const {comment} = this.state;
    return comment.length === 0
        ? (<CircularProgress />)
        : (comment.map(item => (

          <ListItem key = {item.comment_post}>
            <Link to= {"/author/"+item.comment_post +"/"} replace style={{color:'black'}}>

       
            <ListItemText primary={item.comment_post} secondary={item.comment} />
            </Link>
            <Button variant="contained">Contained</Button>
          </ListItem>)))

        };

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
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
            {this.renderComment()}
          </List>
        </Grid>
      )
    }
}

export default function Comment() {
  const token = localStorage.getItem('jwtToken')


  return(<CommentList token = {token} />);
}
