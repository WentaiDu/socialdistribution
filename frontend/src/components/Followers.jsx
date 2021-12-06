import * as React from 'react';
import axios from "axios";
import {AuthorList} from "./baseElement/baseElement";
import { useState } from "react";

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken')


export default function Followers(props) {
  const [authors, setAuthors] = useState([]);

  axios.get(`${base_url}/authors/${props.match.params.author_id}/followers`,
  {
    headers: {
      // "X-CSRFToken": this.props.token
      Authorization:"Token " + token,

    },
  })
  .then(res =>{
    setAuthors( res.data.authors)
  }

  )

  console.log(authors)

  return(<AuthorList authors = {authors} />);

}


// export default class Followers extends React.Component {
//   constructor(props){
//     super(props);
//     console.log(props);
//     // authorId = props.match.params.author_id

//     this.state = {
//         token : localStorage.getItem('jwtToken'),
//         followers: []

//       // authors: [{author_id:1,username:"dragon",profileImage:"/media/user.jpg"}]
//     }
//     }

//   componentDidMount() {
//     axios.get(`${base_url}/author/${this.props.match.params.author_id}/followers`,
//     {
//       headers: {
//         Authorization: "token " + this.props.token,
//       },
//     })
//       .then(res => {
//         const followers = res.data;
//         console.log(followers);
//         this.setState( followers );
//     })
//   }

//   renderAuthors(){
//     const {followers} = this.state;
//     return followers.length === 0
//         ? (<CircularProgress />)
//         : (followers.map(item => (

//           <ListItem key = {item.author_id}>
//             <Link to= {"/author/"+item.author_id +"/"} replace style={{color:'black'}}>

//             <ListItemAvatar>
//             <Avatar alt={item.username} src={item.profileImage} />
//             </ListItemAvatar>
//             <ListItemText primary={item.username} secondary={item.author_id} />
//             </Link>
//             <Button variant="contained">Contained</Button>
//           </ListItem>)))

//         };

//     render(){
//       return (
//         <Grid
//           container
//           direction="column"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <List
//             sx={{
//               width: '100%',
//               maxWidth: 360,
//               bgcolor: 'background.paper',
//             }}
//           >
//             {this.renderAuthors()}
//           </List>
//         </Grid>
//       )
//     }
// }
