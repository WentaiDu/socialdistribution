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
import axios from "axios";
import PrimarySearchAppBar from './Sidebar';
import { Link } from 'react-router-dom';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';



class PostList extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get(`${base_url}/author/${this.props.authorId}/posts/`)
      .then(res => {
        const posts = res.data;
        console.log(posts);

        this.setState(posts);
        console.log(this.state.posts);

    })
  }

 

  renderPosts(){
    const {posts} = this.state;
    return posts.length === 0
        ? (<ListItem>             
          <ListItemText primary="404 Not Found" secondary="" />
          </ListItem>)
        : (posts.map(item => (

          <ListItem key = {item.post_id}>
            <Link to={item.post_id}  style={{color:'black'}}>

            <ListItemText primary={item.title} secondary={item.description} />
            </Link>
          </ListItem> ))
          )

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
            {this.renderPosts()}
          </List>
        </Grid>
      )
    }
}

export default function Posts(props) {
    console.log(props);
    var authorId = props.match.params.author_id
    return(<PostList authorId = {authorId}/>);
}
