import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import { Box, Link, Typography, TextField} from "@material-ui/core";
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from "@mui/material/Card";
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
export default function Inbox() {
    const token = localStorage.getItem('jwtToken')
    const id = localStorage.getItem('userID')
    const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    useEffect(()=>{
            axios.get(`${base_url}/author/${id}/inbox/`,
            {
              headers: {
                Authorization: "token " + token,
              },
            })
              .then(res => {
                console.log(res.data);
            })
              .catch(e =>{
                console.log(e)
              })
    })
    return (
        <Stack spacing={2} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      );
    // return inboxList.length === 0
    //     ? (<ListItem>
    //       <ListItemText primary="404 Not Found" secondary="" />
    //       </ListItem>)
    //     : (inboxList.map(item => (

    //       <ListItem key = {item.post_id}>
    //         {/* <Link to={"/author/"+this.props.authorId+"/posts/"+item.post_id} replace style={{color:'black'}}> */}

    //         <ListItemText primary={item.title} secondary={item.description} />
    //       </ListItem> ))
    //       )
}