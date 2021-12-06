//Some code comes fromhttps://mui.com/zh/getting-started/usage/
import React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import axios from "axios";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const userID = localStorage.getItem('userID')
const token = localStorage.getItem('jwtToken')
const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default class DialogFriendlist extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props)
        
    }

    render (){
        return (
            <Dialog open={this.props.open} onClose={this.props.onClickEnd} >
                <DialogTitle>Friend List</DialogTitle>
                <FriendsList handleShare = {this.props.handleShare} onClose={this.props.onClickEnd}/>

            <DialogActions>
            <Button onClick={this.props.onClickEnd}>Done</Button>
            </DialogActions>
            </Dialog>
        );   
    }

}


class SingleFriend extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
    }

    render(){
        const author = this.props.author;


        return (
            <ListItem button onClick={() => this.props.handleListItemClick(this.props)} key={author.id}>
            <ListItemAvatar>
            <Avatar
                alt={author.profileImage} src={author.profileImage}
                sx={{ width: 50, height: 50 }}
            />
            </ListItemAvatar>
            <ListItemText primary={author.displayName} secondary = {author.id}/>
        </ListItem>
        )
    }
}


export class FriendsList extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            friends : [ ],
        }
    }

    componentDidMount(){
      
        axios
        .get(`${base_url}/author/${userID}/friends/`,
        {
          headers: {
            Authorization: "token " + token,
          },
        })
        .then( res => {
            console.log(res);
            var friends ={friends:res.data} ;
            this.setState(friends); 
        })
  
   
    }

    handleListItemClick = (friend) =>{
        console.log(this.props)
        if (this.props.handleShare){
            this.props.handleShare(friend);
            this.props.onClose();
        }
        else{
            console.log("jump")
        }
    }

    renderFriends = () =>{
        var friends = this.state.friends;

        try{

              console.log(friends)


            //   let friends = Object.values(this.state);
              return friends.length === 0
              ? (<Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              ><SentimentVeryDissatisfiedIcon/> You don't have any friends :( </Grid>)

              : (friends.map(item => (
      
                <SingleFriend author = {item} handleListItemClick = {this.handleListItemClick}/>
              )))
          }
        
          catch (e){
            console.log(e)
            return (                <SingleFriend author = {friends} handleListItemClick = {this.handleListItemClick}/>)
          }
    }

        
    render(){
        return(
            
        <List
            sx={{
              width: '100%',
              minWidth: 500,

              bgcolor: 'background.paper',
            }}
          >
            {this.renderFriends()}
        </List>
        )
    }
}

