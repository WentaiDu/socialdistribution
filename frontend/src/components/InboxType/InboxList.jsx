import { ListItem } from "@mui/material";
import React from "react";
// import Posts from "./Posts";
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import { SinglePost } from "../baseElement/baseElement";
import { Link } from 'react-router-dom';


// class FriendRequestComp extends React.Component{
//   constructor(props){
//     super(props);
//     console.log(props);
//   }

//   render(){
//     return(

//       <Card variant="outlined">
//       <Stack direction="row" spacing={2}>
//         <Button onClick={this.accpet}><EditIcon /></Button>
//         <Button onClick={this.decline}><DeleteIcon /> </Button>
//        </Stack>
//        </Card>
//     )
//   }


// }



export default class Converter extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  
  

  render() {

    if (this.props.item.type == "like"){
      return(

             <li>{this.props.item.summary}</li>

        )
    }
    if (this.props.item.type == "follow"){
      return(
        <Link>
        <li>{this.props.item.summary}</li> 

        </Link>

        )
    }

    // if (this.props.item.type == "post"){
    else{
    return(
          <span>
            <Link to = {this.props.item.author.id} replace> <li>{this.props.item.author.displayName} share you a post! </li></Link>
            <SinglePost post = {this.props.item}/>
            </span>
        )
    }

    console.log("can not convert info to views")
    console.log(this.props.item);
  }  

}
  