import * as React from 'react';

import Grid from '@mui/material/Grid';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import {AuthorList} from "./baseElement/baseElement";
import useState from "react";
const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken')


// class AuthorList extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       authors: []
//     }
//   }

//   componentDidMount() {

//   }

//   renderAuthors(){
//     const {authors} = this.state;
//     return authors.length === 0
//         ? (<CircularProgress />)
//         : (authors.map(item => (

//           <ListItem key = {item.author_id}>
//                 <SingleAuthor author = {item}/>
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

async function processAuthors(){
  var authors = [];
  var res = await axios.get(`${base_url}/authors/`,    
  {
    headers: {
      // "X-CSRFToken": this.props.token
      Authorization:"Token " + token,

    },
  })
  .catch(e => {
    console.log("get all authos error");
  })
  authors = res.data.authors
  console.log(authors)
  return authors;
}

export default  function Authors() {


  // const [authors, setAuthors] = useState([]);
  var authors = processAuthors();


  return(<AuthorList authors = {authors} />);



}
