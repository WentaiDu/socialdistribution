import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, CardActions } from '@mui/material';
import axios from "axios";
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import { getAuthorInfo, getUserInfo,b64EncodeUnicode } from "./toolFuntions";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const userID = localStorage.getItem('userID')
const token = localStorage.getItem('jwtToken')

const t10Auth = {
    headers: {
        "X-CSRFToken": "57ddbefa32fbdc602755462b0700a1c3ebd75171"
    }}

const t10FollowPayload = {
    "id": "http://127.0.0.1:8000/author/change-me-123123/",
    "host": "http://127.0.0.1:8000/",
    "displayName": "Change Me",
    "url": "http://127.0.0.1:8000/author/change-me-123123/",
    "github": "https://github.com/123123123asdafsdfasdfasdfasdf/"
  }

  const T10Head = {
    headers: {
        Authorization: "Basic "+ b64EncodeUnicode("Lara:CMPUT404")
    }
  }

  const T1Head = {
    headers: {
        Authorization: "Basic "+ b64EncodeUnicode("Lara:CMPUT404")
    }
  }
  const T12Head = {
    headers: {
        Authorization: "Basic "+ b64EncodeUnicode("Lara:CMPUT404")
    }
  }
    
export class OnlineSingleAuthor extends React.Component {
    constructor(props) {
        super(props);
        console.log("singleConnectionAuthor")
        console.log(props);
        this.state = {
            clickedFollow: false,
            open: false,
            head : {},
            payload : {},
        }
        if (this.props.badge == "T10"){
            console.log("change")
            this.state.head = t10Auth;
            this.state.payload = t10FollowPayload;
        }
        console.log(this.state);
    }
  
  
    componentDidMount() {
        console.log(this.props)
        console.log(userID)

        axios.get(`${this.props.author.id}/followers/${userID}/`, this.state.head)
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
        axios.delete(`${this.props.author.id}/followers/${userID}/`, this.state.head)
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
            var temp = await getUserInfo().catch(err => {
                console.log("bugbugbug")
            });
            var user = temp.data;
    
            console.log(user);
            console.log(this.state)
    
            for (let key of Object.keys(this.state.payload)){
                console.log(key)
                console.log(user[key])
                postData[key] = user[key];
            }
            postData["type"] = "author";

            console.log(postData);

        }
        catch (e) {
          console.log(e);
        }
          axios.put(`${this.props.author.id}/followers/${userID}/`, postData, this.state.head)
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
      
      try{
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
        };
    
    
        console.log(postData);
        axios.post(`${base_url}/author/${this.props.author.author_id}/inbox`, postData,
          {
            headers: {
              Authorization: "Token " + token,  
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
      catch(e){
        console.log(e)
      }

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
  
          <Card sx={{ maxWidth: 1000 }}>
  
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
              <Link to={{ pathname: '/UserInfo', state: { author_id: this.props.author.author_id } }}>
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
