import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';



const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// const base_url = 'http://localhost:8000';

const token = localStorage.getItem('jwtToken');
const userID = localStorage.getItem('userID');

class SingleReq extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        return (
            null
        )
    }
}


export default class SeeReq extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props)
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
        this.setState((prevState, props) => {
            delete prevState.continuing;
            return prevState;
        });  
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
          this.props.onClickEnd()

        } 

    
    renderReqs = () =>{
        try{
            const authorsPromise = this.props.authors;
            authorsPromise.then(res => {
              const authors = res;
              console.log(authors)
      
              return authors.length === 0
              ? (<li>No Sign Up request</li>)

              : (authors.map(item => (
      
                <ListItem key = {item.author_id}>
                <SingleReq author = {item}/>
              </ListItem>
              )))
            })
          }
          catch (e){
            console.log(e)
            return (<li>No Sign Up request</li>)
          }
    }

        
    render(){
        return(
            <Dialog open={this.props.open} onClose={this.props.onClickEnd}>
            <DialogTitle>Make a Post</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Sign up requests
              </DialogContentText>
              <List
            sx={{
              width: '100%',
              minWidth: 500,

              bgcolor: 'background.paper',
            }}
          >
            {this.renderReqs}
            </List>

            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClickEnd}>Done</Button>
            </DialogActions>
            </Dialog>
         
        )
    }
}
