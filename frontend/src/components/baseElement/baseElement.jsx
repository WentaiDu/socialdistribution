import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import PostAction from "../PostAction";
import axios from "axios";
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddPost from ".././Post";


const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const userID = localStorage.getItem('userID')
const token = localStorage.getItem('jwtToken')

export class SingleAuthor extends React.Component {
  constructor(props) {
    super(props);
    console.log("singleAuthor")
    console.log(props);
    this.state = {
      dia : false,
    }
  }


  followClicked = () => {
    console.log(this.props);
    axios.put(`${base_url}/author/${this.props.author.author_id}/followers/${userID}/`, {},
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
  }

  render() {
    const author = this.props.author;
    var badge = this.props.badge;
    if (badge == undefined) {
      badge = "local"
    }
    try {
      return (

        <Card sx={{ maxWidth: 345 }}>

          <Avatar
            alt={author.profileImage} src={author.profileImage}
            sx={{ width: 100, height: 100 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {author.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Chip icon={<FaceIcon />} label={badge} variant="outlined" />
            </Typography>
          </CardContent>

          <CardActions>
            <Button size="small" onClick={this.followClicked}>Follow</Button>
            <Link to={{ pathname: '/UserInfo', query: { author_id: this.props.author.author_id } }}><Button size="small">Detail</Button></Link>
          </CardActions>
        </Card>


      )
    }
    catch (e) {
      console.log(e);
      return <CircularProgress />;
    }
  }
}

export class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    console.log("singlePost")
    this.state = {
      dia: false,
    }
  }

  
  editPost = () => {
    this.addPostDialog()
  }

  deletePost = () =>{
    const post = this.props.post;

    axios.delete(`${post.id}`,            
    {
      headers: {
        Authorization: "token " + token,
      }
    })
    .then(res => [
      console.log("delete success")
    ]) 
    .catch(e =>{
      console.log(e)
    })

  }

  addPostDialog = () => {
    console.log("rendering")
    this.setState({
      dia: true,
    });
  }
  
  cancelPostDialog = () => {
    console.log("canceling")
    this.setState({
      dia: false,
    });
  }

  renderContent(){

    const post = this.props.post;
    if (post.contentType == "image/png;base64" || post.contentType == "image/jpeg;base64") {
      console.log("pic!!")

      return(
        <li>
           <img
        src={`${post.content}`}
        srcSet={`${post.content}`}
        alt={post.title}
        loading="lazy"
       />
      </li>

      )
    }

    else{
      return(
        <li>{post.content}
      </li>
      )
    }

  }


  renderModifyButton(){
    if(this.props.post.author.author_id == userID){
      return(
        <li>        
        <Button onClick = {this.editPost}>Edit Icon</Button>
        <Button onClick = {this.deletePost}>Delete Icon</Button>
        </li>

      )
    }
    return null
  }

    render(){
      var badge = this.props.badge;
      if (badge == undefined){
        badge = "local"
      }
      const post = this.props.post;
      console.log(post);
      var linkaddr =  "/author/"+ this.props.post.author.author_id +"/posts/"+post.post_id +"/"
      console.log(linkaddr);


      return (
        <Card variant="outlined" sx={{            
          minWidth: 800,
          maxWidth: 1000,
          align: "center",
          padding: "10px",
          borderRadius: 7, }}>
            <AddPost open = {this.state.dia} onClickEnd = {this.cancelPostDialog} post = {this.props.post}/>
        <CardActionArea href = {linkaddr}>

          {/* <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          /> */}
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >


          <Stack
          direction="column"
          spacing={1}
          >         <Link to={{ pathname: '/UserInfo', state: { author_id: this.props.post } }}>
          <Avatar
          alt={post.author.profileImage} src={post.author.profileImage}
          sx={{ width: 50, height: 50 }}
            /></Link>
              <li>
                {post.author.displayName}
              </li>
            </Stack>

             <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.description}
              </Typography>
            </CardContent>
            <CardContent>
              <div style={{ width: '100%', wordBreak: 'break-all', overflowY: 'scroll' }}>
                {post.content}
              </div>
            </CardContent>
          </Stack>

          <Chip icon={<FaceIcon />} label={badge} variant="outlined" />
          <Chip icon={<FaceIcon />} label={post.visibility} variant="outlined" />

        </CardActionArea>

        <CardActions>

          {this.renderModifyButton()}
        <PostAction post = {post}/>
        </CardActions>
      </Card>
    )
  }
}




export class FollowerCount extends React.Component {
  constructor(props) {
    super(props);
    console.log("FollowerCount")
    console.log(props);
    this.state = {
    }
  }

  render() {
    return (
      <Link >
        Follower {this.props.count}
      </Link>
    )
  }




}


export class AuthorList extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

  renderAuthors() {
    try {
      const authorsPromise = this.props.authors;
      authorsPromise.then(res => {
        const authors = res;
        console.log(authors)

        return authors.length === 0
          ? (<CircularProgress />)
          : (authors.map(item => (

            <ListItem key={item.author_id}>
              <SingleAuthor author={item} />
            </ListItem>)))
      })
    }
    catch (e) {
      console.log(e)
    }
  }

  render() {
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
          {this.renderAuthors()}
        </List>
      </Grid>
    )
  }
}
