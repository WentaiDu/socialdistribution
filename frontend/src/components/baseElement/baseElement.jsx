import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import{ useContext } from 'react';
import axios from "axios";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



export class SingleAuthor extends React.Component {
  constructor(props){
    super(props);
    console.log("singleAuthor")
    console.log(props);
    this.state = {
    }
  }

    render(){

      try {
      return (



         <Card sx={{ maxWidth: 345 }}>

        <Avatar
        alt={this.props.profileImage} src={this.props.profileImage}
        sx={{ width: 100, height: 100 }}
         />
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
           {this.props.displayName}
           </Typography>
           <Typography variant="body2" color="text.secondary">

           </Typography>
         </CardContent>

         <CardActions>
         <Button size="small">Follow</Button>
         <Button size="small" href= {this.props.url}>Detail</Button>
         </CardActions>
       </Card>


      )
    }
    catch(e){
      console.log(e);
      return <CircularProgress />;
  }
}
}

export class SinglePost extends React.Component {
  constructor(props){
    super(props);
    console.log("singlePost")
    console.log(props);
    this.state = {
    }
  }
  
  renderContent(){
    if (this.props.contentType == "image/png;base64" || this.props.contentType == "image/jpeg;base64"){
      console.log("pic!!")
      return(
        <li>I am daddy!</li>
      )
    }
  
  }
    render(){
      return (
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          {/* <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {this.props.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             {this.renderContent()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
      )
    }
}