import * as React from 'react';
import {TextField} from "@material-ui/core";

import axios from "axios";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const token = localStorage.getItem('jwtToken');
const userID = localStorage.getItem('userID');

export default class AddComment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            author:  userID,
            comment:"",
            contentType:"text/markdown",
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
        if (this.state.comment === ""){
            return null;
        }
        axios
          .post(`${base_url}/author/${this.props.authorId}/posts/${this.props.postId}/comments`, this.state,    
          {
            headers: {
              Authorization: "token " + token,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch(e => {
              console.log(e);
          }); 
          
        this.props.onClickClose();

        } 

    render(){
        const {comment} = this.state;
        return(

            <Stack
            direction="row"
            divider={<Divider orientation="vertical"/>}
            spacing={1}
            >
            <TextField
                required
                name="comment"
                label="comment"
                fullWidth
                variant="standard"
                value={comment}
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
