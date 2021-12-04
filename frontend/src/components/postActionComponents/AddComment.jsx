import * as React from 'react';
import {TextField} from "@material-ui/core";

import axios from "axios";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const token = localStorage.getItem('jwtToken');

export default class AddComment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            type:"comment",
            author:  {},
            comment:"",
            contentType:"text/markdown",
            published:"2015-03-09T13:07:04+00:00",
            id: "",
        }
    }


    handleForm = e => {
        const target = e.target;

        const value = target.type === "checkbox"
        ? target.checked
        : target.value;

        const name = target.name;
        console.log(name)
        console.log(value)
        this.setState({
            [name]:value
        })
    }

    handlePost = () => {
        console.log(this.state);
        axios
          .post(`${base_url}/author/${this.props.authorId}/posts`, this.state,    
          {
            headers: {
              Authorization: "token " + token,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((res) => {
          }); 
        this.props.onClickClose();

        } 

    render(){
        const {content} = this.state;
        return(

            <Stack
            direction="row"
            divider={<Divider orientation="vertical"/>}
            spacing={1}
            >
            <TextField
                required
                name="content"
                label="comment"
                fullWidth
                variant="standard"
                value={content}
                onChange={this.handleForm}
            />


            <Button
                type="submit"
                variant="contained"
                sx={{
                    width: 100,
                    m:'auto',
                    borderRadius: 15,
                    backgroundColor: "#00428b",
                }}
                onClick={this.handlePost}
            >
                Submit
            </Button>
            </Stack>
        )
    }
}
