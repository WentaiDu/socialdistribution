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
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

//

export default class LikeList extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }

  renderLikes(){
    const likes = this.props.likes;
    console.log(likes);
    return likes.length === 0
        ? null
        : (likes.map(item => (

            <Link to= {"/author/"+item.author.author_id +"/"} replace style={{color:'black'}}>
            <Avatar
                alt={item.author.profileImage} src={item.author.profileImage}
                />
            <ListItemText primary={item.author.displayName}/>
            </Link>)))

        };

    render(){
      return (
        <Grid
          container
          direction="row"
          justifyContent="left"
          alignItems="center"
        >

            {this.renderLikes()}

        </Grid>

      )
    }
}
