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


const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function OneAuthor(props) {
  return (
    <ListItem>
      <ListItemAvatar>
      <Avatar alt={props.username} src={props.profileImage} />
      </ListItemAvatar>
      <ListItemText primary={props.username} secondary={props.author_id} />
    </ListItem>
  );
}

class AuthorList extends React.Component {


  renderOneAuthor(i) {
    return(
      <OneAuthor
        value={this.props.authors[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
      {this.renderOneAuthor(0)}
      </div>
    );
  }
}

class Controller extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  getState(){
    var authors;
    axios.get(`${base_url}/authors/`,)
      .then(res => {
        authors = res.data;
        this.setState(authors);
        console.log(authors);
    });
    console.log(authors);
    console.log(this.state.authors);
  }

  handleClick(i){
    console.log(i);
  }


  render() {
    this.getState();
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
        <AuthorList
          authors={this.authors}
          onClick={i => this.handleClick(i)}
        />
        </List>
      </Grid>
    );
  }

}

export default function Authors() {
  return (
    <Controller />
  )
}
