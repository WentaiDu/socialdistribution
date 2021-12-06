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

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const userID = localStorage.getItem('userID')
const token = localStorage.getItem('jwtToken')

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
    axios.get(`${this.props.author.id}/followers/${userID}/`,
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
            prevState.clickedFollow = false;
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
      "actor": user,
      "object": author,
      "type": "follow",
      "summary": user.displayName + "(" + user.author_id + ")" + " want to make friend with " + author.displayName + "(" + author.author_id + ")"
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
    if (this.state.clickedFollow) {
      return (
        <Button size="small" onClick={this.followClicked} variant="contained">UnFollow</Button>
      )
    }
    else {
      return (
        <Button size="small" onClick={this.followClicked} variant="contained">Follow</Button>
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
            {this.renderFollow()}
            <Button size="small" onClick={this.friendRequestClicked} variant="contained">FriendRequest</Button>
            <Link to={{ pathname: '/UserInfo', query: { author_id: this.props.author.author_id } }}><Button size="small">Detail</Button></Link>
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

    else {
      return (
        <li style={{width: '100%'}}>{post.content}1
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

  render() {
    var badge = this.props.badge;
    if (badge == undefined) {
      badge = "local"
    }
    const post = this.props.post;
    console.log(post);
    var linkaddr = "/author/" + this.props.post.author.author_id + "/posts/" + post.post_id + "/"
    console.log(linkaddr);


    return (
      <Card variant="outlined" sx={{
        minWidth: 800,
        maxWidth: 1000,
        align: "center",
        padding: "10px",
        borderRadius: 7,
      }}>
        <AddPost open={this.state.dia} onClickEnd={this.cancelPostDialog} post={this.props.post} />
        <CardActionArea href={linkaddr}>

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

            <CardContent style={{flex:1}}>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.description}
              </Typography>
            </CardContent>
            <CardContent style={{width:'60%',overflowX:'auto'}}>
              <div style={{ width: '100%', wordBreak: 'break-all', overflowY: 'scroll' }}>
                {this.renderContent()}
              </div>
            </CardContent>
          </Stack>

          <Chip icon={<FaceIcon />} label={badge} variant="outlined" />
          <Chip icon={<FaceIcon />} label={post.visibility} variant="outlined" />

        </CardActionArea>

        <CardActions>

          <PostAction post={post} />
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
