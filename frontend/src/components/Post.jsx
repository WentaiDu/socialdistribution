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

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class AddPost extends React.Component{
    constructor(){
        super();
        this.state={
            type:"post",
            title:"",
            source:"",
            origin:"" ,
            description:"" ,
            contentType:"",
            author:"",
            content:"",
            categories:[] ,
            published: false,
            visibility:"",
            unlisted: false
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
        // axios
        //   .post(`${base_url}/author/${author_id}/posts`, this.state)
        //   .then((res) => {
        //     handleClick(true);
        //     console.log(res.data);
        //   })
        //   .catch((res) => {
        //     handleClick(false);
        //   }); 
        } 

    render(){
        const {title,source,origin,description,contentType,author,content,categories,published,visibility,unlisted } = this.state;
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
                            
                    <Grid item xs={12}>
                        <TextField
                            required
                            name="description"
                            label="Title"
                            fullWidth
                            variant="standard"
                            value={description}
                            onChange={this.handleForm}
                        />
                    </Grid>

                    <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            name="content"
                            label="Put in your text"
                            multiline
                            fullWidth
                            rows={4}
                            value={content}
                            onChange={this.handleForm}
                        />
                    </Grid>
        
                    <Grid item xs={12} sx={{minWidth: 120}}>
                    <Stack direction="row" spacing={5} sx={{width: 750, m:'auto', p:{xs:2}, }}>
                    <Box sx={{ minWidth: 120,}}>
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
                            </Box>
                        <Box sx={{ minWidth: 120,}}>
                        <FormControlLabel control={<Checkbox  />} label="Published" name = "published" checked = {published} onChange={this.handleForm}/>

                        </Box>
                        <Box sx={{ minWidth: 120,}}>
                        <FormControlLabel control={<Checkbox />} label="unlisted" name = "unlisted"  checked = {unlisted} onChange={this.handleForm}/>

                        </Box>
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
                    </Grid>
                    </Grid>
                </Card>
            </Box>
        )
    }
}


export default function Post() {
    // const [title, setTitle] = React.useState("")  
    // const [content, setContent] = React.useState("")  
    // const [visi, setVisi] = React.useState('');
    // const handleVisiChange = (event) => {
    //     setVisi(event.target.value);
    // };
    // function handlePost() {
    //     axios
    //       .post(`${base_url}/author/${author_id}/posts`, {
    //         title: title,
    //         content: value,
    //         visibility: visi,
    //       })
    //       .then((res) => {
    //         handleClick(true);
    //         console.log(res.data);
    //       })
    //       .catch((res) => {
    //         handleClick(false);
    //       }); } 
  
    return (
        <AddPost />
    );
}