import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import PostAction from "../PostAction";
import ConnectionPostAction from "./connectionPostAction";
import axios from "axios";
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddPost from ".././Post";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuthorInfo, getUserInfo } from "./toolFuntions";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Markdown from 'react-markdown'
import GroupIcon from '@mui/icons-material/Group';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const userID = localStorage.getItem('userID')
const token = localStorage.getItem('jwtToken')

function Image(props) {
  console.log("1111111111111111111111111111111111111111111111111111111111111111111111");

  return <img {...props} style={{maxWidth: 200}} />
}
const renderers = {
  //This custom renderer changes how images are rendered
  //we use it to constrain the max width of an image to its container
  image: Image,
};


export class SingleAuthor extends React.Component {
  constructor(props) {
    super(props);
    console.log("singleAuthor")
    console.log(props);
    this.state = {
      clickedFollow: false,
      open: false,
    }
  }


  componentDidMount() {
    console.log(this.props)
    axios.get(`${base_url}/author/${userID}/followers/${this.props.author.author_id}/`,
    {
      headers: {
        Authorization: "token " + token,
      },
    })
    .then((res) => {
      console.log(res.data);

      this.setState((prevState, props) => {
        prevState.clickedFollow = res.data.is_follower;
        return prevState;
      });
    })
    .catch((e) => {
      console.log(e)
    });
  


  }


  followClicked = async () => {
    console.log(this.props);
    if (this.state.clickedFollow) {
      axios.delete(`${base_url}/author/${this.props.author.author_id}/followers/${userID}/`,
        {
          headers: {
            Authorization: "token " + token,
          },
        })
        .then((res) => {
          console.log(res.data);

          this.setState((prevState, props) => {
            prevState.clickedFollow = res.data.is_follower;
            return prevState;
          });
        })
        .catch((e) => {
          console.log(e)
        });
    }
    else {
      try {
        var postData = {};
        console.log("like clicked")
        var temp = await getUserInfo().catch(err => {
          console.log("bugbugbug")
        });
        var user = temp.data;

        console.log(user);
        console.log(this.props);

        const authorId = this.props.author.author_id;
        var temp = await getAuthorInfo(authorId).catch(err => {
          console.log("bugbugbug")
        });
        var author = temp.data;

        console.log(author);


        postData = {
          "actor": user,
          "object": author
        };
      }
      catch (e) {
        console.log(e);
      }


      axios.put(`${base_url}/author/${userID}/followers/${this.props.author.author_id}/`, postData,
        {
          headers: {
            Authorization: "token " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.setState((prevState, props) => {
            prevState.clickedFollow = true;
            return prevState;
          });
        })
        .catch((e) => {
          console.log(e)
        });
    }

  }

  friendRequestClicked = async () => {

    var postData = {};
    var temp = await getUserInfo().catch(err => {
      console.log("bugbugbug")
    });
    var user = temp.data;

    console.log(user);
    console.log(this.props);

    const authorId = this.props.author.author_id;
    var temp = await getAuthorInfo(authorId).catch(err => {
      console.log("bugbugbug")
    });
    var author = temp.data;

    console.log(author);


    postData = {
      "actor": JSON.stringify(user),
      "object": JSON.stringify(author),
      "type": "follow",
      "summary": user.displayName + "(" + user.author_id + ")" + " want to make friend with " + author.displayName + "(" + author.author_id + ")",
      "condition": true
    };


    console.log(postData);
    axios.post(`${base_url}/author/${this.props.author.author_id}/inbox`, postData,
      {
        headers: {
          Authorization: "Token " + token,
          "X-CSRFToken": token,

        },
      })
      .then(res => {
        console.log(res.data);
        this.setState((prevState, props) => {
          prevState.open = true;
          return prevState;
        });

      })
      .catch(e => {
        console.log(e)
      })
  }


  renderFollow = () => {

    if (userID == this.props.author.author_id) {
      return (
        <li>

          <Button size="small" variant="contained" disabled>Yourself</Button>
          <Button size="small" onClick={this.friendRequestClicked} variant="contained" disabled>FriendRequest</Button>
        </li>

      )
    }
    if (this.state.clickedFollow) {
      return (
        <li>
          <Button size="small" onClick={this.followClicked} variant="contained">UnFollow</Button>
          <Button size="small" onClick={this.friendRequestClicked} variant="contained">FriendRequest</Button>
        </li>


      )
    }
    else {
      return (
        <li>

          <Button size="small" onClick={this.followClicked} variant="contained">Follow</Button>
          <Button size="small" onClick={this.friendRequestClicked} variant="contained">FriendRequest</Button>
        </li>

      )
    }




  }

  render() {
    const author = this.props.author;
    var badge = this.props.badge;
    if (badge == undefined) {
      badge = "local"
    }
    try {
      return (

        <Card sx={{ Width: "100%" }}>

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
            {this.renderFollow()}
            <Link to={{ pathname: '/UserInfo', state: { author_id: this.props.author.id } }}>
              <Button size="small">Detail</Button></Link>
          </CardActions>
          <Collapse in={this.state.open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    this.setState((prevState, props) => {
                      prevState.open = false;
                      return prevState;
                    });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Successfully send friend request!
            </Alert>
          </Collapse>
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

  deletePost = () => {
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
      .catch(e => {
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

  renderContent() {

    const post = this.props.post;
    if (post.contentType == "image/png;base64" || post.contentType == "image/jpeg;base64") {
      console.log("pic!!")

      return (
        <li>

          <img
            border={"1px solid #ddd"}
            border-radius={"8px"}
            width={"300px"}
            padding={"5px"}
            src={`${post.content}`}
            srcSet={`${post.content}`}
            alt={post.title}
            loading="lazy"
          />
        </li>

      )
    }
    if (post.contentType == "text/markdown"){
      return (

        <Markdown  children= {post.content} renderers={renderers}/>

      )
    }

    else {
      return (
        <li style={{ width: '100%'}}>{post.content}
        </li>
      )
    }

  }


  renderModifyButton() {
    if (this.props.post.author.author_id == userID) {
      return (
        <Stack spacing={2}>
          <Button onClick={this.editPost}><EditIcon /></Button>
          <Button onClick={this.deletePost}><DeleteIcon /> </Button>
        </Stack>

      )
    }
    return null
  }

  renderPostAction(){
    if(this.props.badge){      
      return <ConnectionPostAction post={ this.props.post} badge = {this.props.badge}/>
    }
    else{
      return <PostAction post={ this.props.post} />
    }

  }

  render() {
    var badge = this.props.badge;
    if (badge == undefined) {
      badge = "local"
    }
    const post = this.props.post;
    console.log(post);
    var linkaddr = this.props.post.id
    console.log(linkaddr);


    return (
      <Card variant="outlined" sx={{
        width: "100%",
        align: "center",
        padding: "10px",
        borderRadius: 7,
      }}>
        <AddPost open={this.state.dia} onClickEnd={this.cancelPostDialog} post={this.props.post} />
        <CardActionArea href={linkaddr}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >


            <Stack
              direction="column"
              spacing={1}
              justifyContent="center"
              paddingLeft='10px'
            >
              <Link to={{ pathname: '/UserInfo', state: { author_id: this.props.post.author.author_id } }} >
                <Avatar
                  alt={post.author.profileImage} src={post.author.profileImage}
                  sx={{ width: 50, height: 50 }}
                /></Link>
              <li >
                {post.author.displayName}
              </li> <Chip icon={<CorporateFareIcon />} label={badge} variant="outlined" />
          <Chip icon={<VisibilityIcon />} label={post.visibility} variant="outlined" />
            </Stack>

            <CardContent style={{ flex: 1 }}>
              <Typography gutterBottom variant="h5" component="div" >
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" >
                {post.description}
              </Typography>
            </CardContent>
            <CardContent style={{ width: '60%', overflowX: 'auto' }}>
              <div style={{ width: '100%', wordBreak: 'break-all', overflowY: 'scroll' }}>
                {this.renderContent()}
              </div>
            </CardContent>
          </Stack>

         

        </CardActionArea>

        <CardActions>

        {this.renderPostAction()}
          {this.renderModifyButton()}

        </CardActions>
      </Card>
    )
  }
}




export class FollowerCount extends React.Component {
  // receive follower list info and show
  constructor(props) {
    super(props);
    console.log("FollowerCount")
    console.log(props);
    this.state = {
    }
  }

  render() {
    return (
      <Link to={"author/" + this.props.authorId + "/followers"}>
        Follower {this.props.items.length}
      </Link>
    )
  }

}




export class AuthorList extends React.Component {
  // receive author list info and show
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      authors: [],
    }
  }

  renderAuthors() {
    try {
      var authors = this.props.authors
      console.log(authors)
      return authors.length === 0
        ? (<CircularProgress />)
        : (authors.map(item => (

          <ListItem key={item.author_id}>
            <SingleAuthor author={item} />
          </ListItem>)))
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




export class SingleActivity extends React.Component {
  constructor(props) {
    super(props);
    console.log("SingleActivity")
    console.log(this.props);

  }

  render() {
    try {

      const activity = this.props.activity;
      console.log(activity);

      return (
        <Card variant="outlined" sx={{
          minWidth: 800,
          maxWidth: 1000,
          align: "center",
          padding: "10px",
          borderRadius: 7,
        }}>
          <CardActionArea href={activity.repo.url}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Stack
                direction="column"
                spacing={1}
              >
                <Link to={activity.actor.url}>
                  <Avatar
                    alt={activity.actor.id.toString()} src={activity.actor.avatar_url}
                    sx={{ width: 50, height: 50 }}
                  /></Link>
                <li>
                  {activity.actor.display_login}
                </li>
              </Stack>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Github Activity {activity.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {activity.type}
                </Typography>

              </CardContent>
              <CardContent>
                <div style={{ width: '100%', wordBreak: 'break-all', overflowY: 'scroll' }}>
                  {activity.payload.commits.map(item => (

                    <ListItem key={item.url}>
                      <li>commit message: {item.message} url: {item.url} </li>
                    </ListItem>))
                  }

                </div>
              </CardContent>
            </Stack>


          </CardActionArea>
        </Card>
      )
    }
    catch (e) {
      console.log(e)
      return null
    }
  }
}
