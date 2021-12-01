import * as React from 'react';
import { Box, Link, Typography, TextField} from "@material-ui/core";
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from "@mui/material/Card";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';


const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const token = localStorage.getItem('jwtToken');

export default class AddComment extends React.Component{
    constructor(props){
        super(props);
        this.state={

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
        this.props.onClick();

        } 

    render(){
        const {title,source,origin,description,contentType,content,categories,published,visibility,unlisted } = this.state;
        return(
            <Box
            sx={{
                alignItems: "center",
                justifyContent: "center",
                width: 750, 
                m:'auto', 
                p:{xs:2},
                flexGrow: 1
            }}>
                <Card
                    sx={{
                    m:2,
                    p:{xs:2},
                    align: "center",
                    padding: "30px",
                    borderRadius: 7,
                    }}>
        
                    <Grid item xs={12}>
                        <TextField
                            required
                            name="title"
                            label="Title"
                            fullWidth
                            variant="standard"
                            value={title}
                            onChange={this.handleForm}
                        />
                    </Grid>
        
                    {/* <Box sx={{ minWidth: 120,}}>
                            <FormControl fullWidth>
                                <InputLabel>Visibility</InputLabel>
                                <Select
                                name="visibility"
                                value={visibility}
                                onChange={this.handleForm}
                                >
                                <MenuItem value={"PUBLIC"}>Public</MenuItem>
                                <MenuItem value={"FRIENDS"}>Friend</MenuItem>
                                <MenuItem value={"PRIVATE"}>Private</MenuItem>
                                </Select>
                            </FormControl>
                            </Box> */}

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
                </Card>
            </Box>
        )
    }
}
