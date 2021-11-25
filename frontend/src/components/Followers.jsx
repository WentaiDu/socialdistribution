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



export default class Followers extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    // authorId = props.match.params.author_id

    this.state = {
        followers: []

      // authors: [{author_id:1,username:"dragon",profileImage:"/media/user.jpg"}]
    }
  }

  // constructor(async_param){
  //   if (typeof async_param === 'undefined') {
  //     throw new Error('Cannot be called directly');
  //   }
  //   console.log(async_param.data);
  //   this.state = {};
  // }
    // const showingList = authorList.map((item) => (
    //   <ListItem key = {item.author_id}>
    //       <ListItemAvatar>
    //       <Avatar alt={item.username} src={item.profileImage} />
    //       </ListItemAvatar>
    //       <ListItemText primary={item.username} secondary={item.author_id} />
    //     </ListItem>
    // ));

    // static async build (){
    //   let res = await axios.get(`${base_url}/authors/`,);
    //   // authorList = res.data.authors;
    //   // this.setState(authorList);
    //   // console.log(this.state);
    //   return new AuthorList(res);
    // }

  componentDidMount() {
    axios.get(`${base_url}/author/${this.props.match.params.author_id}/followers`)
      .then(res => {
        const followers = res.data;
        console.log(followers);
        this.setState( followers );
    })
  }

  renderAuthors(){
    const {followers} = this.state;
    return followers.length === 0
        ? (<CircularProgress />)
        : (followers.map(item => (

          <ListItem key = {item.author_id}>
            <Link to= {"/author/"+item.author_id +"/"} replace style={{color:'black'}}>

            <ListItemAvatar>
            <Avatar alt={item.username} src={item.profileImage} />
            </ListItemAvatar>
            <ListItemText primary={item.username} secondary={item.author_id} />
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
            {this.renderAuthors()}
          </List>
        </Grid>
      )
    }
}
