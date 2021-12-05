import * as React from 'react';
import { Box, Link, Typography, TextField} from "@material-ui/core";
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from "@mui/material/Card";
import axios from "axios";

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// const base_url = 'http://localhost:8000';

const token = localStorage.getItem('jwtToken');
const userID = localStorage.getItem('userID');

class UploadImage extends React.Component {
    state = {
      file: null,
      base64URL: ""
    };
  
    getBase64 = file => {
      return new Promise(resolve => {
        let fileInfo;
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();
  
        // Convert the file to base64 text
        reader.readAsDataURL(file);
  
        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          console.log("Called", reader);
          baseURL = reader.result;
          console.log(baseURL);
          resolve(baseURL);
        };
        console.log(fileInfo);
      });
    };
  
    handleFileInputChange = async e => {
      console.log(e.target.files[0]);
      let { file } = this.state;
  
      file = e.target.files[0];
  
      this.getBase64(file)
        .then(result => {
          file["base64"] = result;
          console.log("File Is", file);
          this.setState({
            base64URL: result,
            file
          });
          console.log(this.state)
          this.props.handleUpload(this.state.base64URL);
        })
        .catch(err => {
          console.log(err);
        });
  
      this.setState({
        file: e.target.files[0]
      });

    };
  
    render() {
      return (
        <div>
          <input type="file" name="file" onChange={this.handleFileInputChange} />
        </div>
      );
    }
  }


export default class AddPost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            type:"post",
            title:"",
            source:"auto",
            origin:"auto",
            id:`${base_url}/author/${userID}/posts/` ,
            description:"" ,
            comments:"",
            contentType:"text/markdown",
            content:"",
            categories:[] ,
            published: false,
            visibility:"PUBLIC",
            unlisted: false,
        }
        console.log(this.props)

        if (this.props.post !== undefined){
            this.state = this.props.post;
        }
    }


    handleForm = e => {
        const target = e.target;

        const value = target.type === "checkbox"
        ? target.checked
        : target.value;

        const name = target.name;

        this.setState({
            [name]:value
        })
    }

    handlePost = () => {
        console.log(this.state);

        if (this.state.post_id !== undefined){
            axios
            .post(`${base_url}/author/${userID}/posts/${this.state.post_id}`, this.state,    
            {
              headers: {
                Authorization: "token " + token,
              },
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((e) => {
            }); 
          
            try{
              this.props.onClick();
  
            }
            catch(e){
                console.log("not props")
            }
        }
        else{
            axios
              .post(`${base_url}/author/${userID}/posts/`, this.state,    
              {
                headers: {
                  Authorization: "token " + token,
                },
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((e) => {
              }); 
            
              try{
                this.props.onClick();
    
              }
              catch(e){
                  console.log("not props")
              }
        }

          this.props.onClickEnd()

    } 


    handleUpload = (value) =>{
        this.setState((prevState, props) => {
            prevState.content = value;
            console.log(this.state.content)
            return prevState;
        });
    }

    renderUpload = () => {
        if (this.state.contentType == "text/markdown" || this.state.contentType =="text/plain"|| this.state.contentType =="application/base64"){
            return(
                <Grid item xs={12}>
                <TextField
                    name="content"
                    label="Put in your text"
                    multiline
                    fullWidth
                    rows={4}
                    value={this.state.content}
                    onChange={this.handleForm}
                />
                </Grid>
            )
        }
        else{
            return(
                <Grid item xs={12}>

                <UploadImage handleUpload ={this.handleUpload}/>    
                </Grid>

            )
        }

    }

        
    render(){
        const {title,source,origin,description,contentType,content,categories,published,visibility,unlisted } = this.state;
        return(


            <Dialog open={this.props.open} onClose={this.props.onClickEnd}>
            <DialogTitle>Make a Post</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To make a post, please enter infomation below
              </DialogContentText>
  
              <Box
            sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "auto", 
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
                            label="description"
                            fullWidth
                            variant="standard"
                            value={description}
                            onChange={this.handleForm}
                        />
                    </Grid>
                    <Box sx={{ minWidth: 120,}}>
                            <FormControl>
                                <InputLabel>contentType</InputLabel>
                                <Select
                                name="contentType"
                                value={contentType}
                                onChange={this.handleForm}
                                >
                                <MenuItem value={"text/markdown"}>MARKDOWN</MenuItem>
                                <MenuItem value={"text/plain"}>PLAIN</MenuItem>
                                <MenuItem value={"application/base64"}>APPLICATION</MenuItem>
                                <MenuItem value={"image/png;base64"}>IMAGE_PNG</MenuItem>
                                <MenuItem value={"image/jpeg;base64"}>IMAGE_JPEG</MenuItem>
                                </Select>
                            </FormControl>
                            </Box>
                    <Grid container spacing={3}>

                    {this.renderUpload()}
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
                        {/* <Button
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
                        </Button> */}
                    </Stack>    
                    </Grid>
                    </Grid>
                </Card>
            </Box>


            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClickEnd}>Cancel</Button>
              <Button onClick={this.handlePost}>Submit</Button>
            </DialogActions>
            </Dialog>
         
        )
    }
}


// export default function Post() {
//     // const [title, setTitle] = React.useState("")  
//     // const [content, setContent] = React.useState("")  
//     // const [visi, setVisi] = React.useState('');
//     // const handleVisiChange = (event) => {
//     //     setVisi(event.target.value);
//     // };
//     // function handlePost() {
//     //     axios
//     //       .post(`${base_url}/author/${author_id}/posts`, {
//     //         title: title,
//     //         content: value,
//     //         visibility: visi,
//     //       })
//     //       .then((res) => {
//     //         handleClick(true);
//     //         console.log(res.data);
//     //       })
//     //       .catch((res) => {
//     //         handleClick(false);
//     //       }); } 
  
//     return (
//         <AddPost />
//     );
// }
