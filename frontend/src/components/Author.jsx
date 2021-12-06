import * as React from 'react';

import axios from "axios";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { SingleAuthor } from "./baseElement/baseElement";

const token = localStorage.getItem('jwtToken')

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export class OneAuthorPage extends React.Component {
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
        // "X-CSRFToken":  this.props.token,
        Authorization:"Token " + token,

      },
    })
      .then(res => {
        const value = res.data;

        console.log(value);
        this.setState( value );
    }).catch(e => {
        console.log("get failed")
    })

  }

    render(){
      console.log(this.state)
      return (
        <Stack   direction="column"
        justifyContent="center"
        alignItems="center"   
        spacing={2}>
        <SingleAuthor author = {this.state}/>
        </Stack>
      )
    }
}

export default function Author(props) {
    // console.log(imb)
    console.log(props);
    var authorId = props.match.params.author_id
    return(<OneAuthorPage authorId = {authorId}/>);
}
