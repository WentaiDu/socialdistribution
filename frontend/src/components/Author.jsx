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
import{ useContext } from 'react';
import axios from "axios";
import PrimarySearchAppBar from './Sidebar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

class MainPage extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
    }
  }

  componentDidMount() {

    axios.get(`${base_url}/author/${this.props.authorId}/`,
    {
      headers: {
        Authorization: "token " + this.props.token,
      },
    })
      .then(res => {
        const author = res.data;
        // console.log(author);
        this.setState(author);
        // console.log(this.state);
    })
  }

  renderPosts(){
    try {

        return (  Object.entries(this.state)
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

export default function Author(props) {
    const token = localStorage.getItem('jwtToken')
    // console.log(imb)
    console.log(props);
    var authorId = props.match.params.author_id
    return(<MainPage token = {token} authorId = {authorId}/>);
}
