import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';



const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// const base_url = 'http://localhost:8000';

const token = localStorage.getItem('jwtToken');
const userID = localStorage.getItem('userID');

class SingleReq extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
    }
  
    onClickAccpet = () => {
  
      let postData = this.props.author;
      postData.accept = "accept";

      axios
      .post(`${base_url}/pendingsignup/`,
      postData,
      {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then((res) => {
        console.log(res);

      })
      .catch((e) => {
      }); 
    }
    onClickReject = () => {
      let postData = this.props.author;
      postData.accept = "reject";

      axios
      .post(`${base_url}/pendingsignup/`,
      postData,
      {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then((res) => {
        console.log(res);

      })
      .catch((e) => {
      }); 
    }


    render(){
      let temp = this.props.author.pending_author
      let authorInfo = JSON.parse(temp);
      console.log(authorInfo);
      let name = authorInfo.displayName;

        return (
            <li>
              {name} 
              <Button onClick = {this.onClickAccpet}>Accept</Button>
              <Button onClick = {this.onClickReject}>Reject</Button>
            </li>
        )
    }
}


export default class SeeReq extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
    }


    getInfo = async () =>{
      let res = await axios
      .get(`${base_url}/pendingsignup/`,
      {
        headers: {
          Authorization: "token " + token,
        },
      })

        console.log(res.data);
        var pendingAuthors = res.data.results;
        this.setState(pendingAuthors); 
    }


    componentDidMount(){
      
      this.getInfo()

    }


    renderReqs = () =>{
        try{

              console.log(this.state)
              let pendingAuthors = Object.values(this.state);
              return pendingAuthors.length === 0
              ? (<li>No Sign Up request</li>)

              : (pendingAuthors.map(item => (
      
                <ListItem key = {item.id}>
                <SingleReq author = {item}/>
              </ListItem>
              )))
          }
        
          catch (e){
            console.log(e)
            return (<li>No Sign Up request</li>)
          }
    }

        
    render(){
        return(
            <Dialog open={this.props.open} onClose={this.props.onClickEnd}>
            <DialogTitle>Sign up requests</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Accpect or Reject registerations below
              </DialogContentText>
              <List
            sx={{
              width: '100%',
              minWidth: 500,

              bgcolor: 'background.paper',
            }}
          >
            {this.renderReqs()}
            </List>

            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClickEnd}>Done</Button>
            </DialogActions>
            </Dialog>
         
        )
    }
}

