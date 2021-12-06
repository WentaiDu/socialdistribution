import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useState } from "react";

import Button from '@mui/material/Button';
import PostAction from "./PostAction";
import { SinglePost } from "./baseElement/baseElement";
import CircularProgress from '@mui/material/CircularProgress';
import { SingleAuthor } from "./baseElement/baseElement";

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const token = localStorage.getItem('jwtToken')
const userID = localStorage.getItem('userID')


export default function MainPage(props) {
  const [ready, setReady] = useState(false);

const jwtToken = localStorage.getItem('jwtToken');
const userID = localStorage.getItem('userID');
console.log(jwtToken)
console.log(userID)

  // var authorId = props.match.params.author_id

  return(
      <Stack 
      direction="column"
      justifyContent="center"
      alignItems="center"
              spacing={2}>

        <div>
          <PostList/>
        <PostList2  />
        <PostList3 />
        </div>


        </Stack>);
}


class PostList extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
    }
  }

  componentDidMount() {
    axios.get(`${base_url}/public/`,
    {
      headers: {
        Authorization: "token " + token,
      },
    })
      .then(res => {
        console.log(res);

        this.setState(res.data);
        console.log(this.state);

    })
  }

 

  renderPosts = () =>{
      try{
        const posts = Object.values(this.state);
        console.log(posts)
        
        return posts.length === 0
            ? (null)
            : (posts.map(item => (
    
              <ListItem key = {item.post_id}>
                {/* <Link to={"/author/"+this.props.authorId+"/posts/"+item.post_id} replace style={{color:'black'}}>
    
                <ListItemText primary={item.title} secondary={item.description} />
                </Link> */}
                <SinglePost post = {item} />
              </ListItem> ))
              )
    
        }
      
      catch(e){
          console.log(e)
          return null;
      }
    }
    render(){
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
            {this.renderPosts()}
          </List>
        </Grid>
      )
    }
}

class PostList2 extends React.Component {
    constructor(props){
      super(props);
      console.log(props);
      this.state = {
        posts: [],
      }
    }
  

    componentDidMount() {
      axios.get(`https://social-distribution-t10.herokuapp.com/api/authors/?size=99`,
      {
        headers: {
            "X-CSRFToken": "nNXYy5zg9rWT4t8vdJfhg5bbtvbSHMPMVIltbT14UCOMdga0MbJYJQmkfWEAU18L"      
        
        },
      })
        .then(res => {
          const temp = res.data;
          console.log(temp);
          var result = [];
          for (let item of temp.data){
            console.log(item)
            var currentLink = item.url + "/posts/"
            console.log(currentLink)
            axios.get(currentLink,
                {
                  headers: {
                      "X-CSRFToken": "nNXYy5zg9rWT4t8vdJfhg5bbtvbSHMPMVIltbT14UCOMdga0MbJYJQmkfWEAU18L"      
                  
                  },
                })
                  .then(res => {
                  var value = res.data.data;
                  console.log(value);
                  for (let item of value){
                    result.push(item)
                  }
                })
                .catch( e => {
                    console.log(e)
                }).then(() => {
                  console.log(result);
                  this.setState({posts:result,})
                })

          }

  
      })
    }
  
   
  
    renderPosts = () =>{
     const posts = this.state.posts
        console.log(this.state);
        try{
          return posts.length === 0
              ? (null)
              : (posts.map(item => (
      
                <ListItem key = {item.post_id}>
                  <SinglePost post = {item} badge = {"T10"}/>
                </ListItem> ))
                )
      
          }
        
        catch(e){
            console.log(e)
            return null;
        }
      }
      render(){
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
              {this.renderPosts()}
            </List>
          </Grid>
        )
      }
  }
  

  class PostList3 extends React.Component {
    constructor(props){
      super(props);
      console.log(props);
      this.state = {
        posts: [],
      }
    }
  

    componentDidMount() {
      axios.get('https://social-distance-api.herokuapp.com/authors/',
      {
        headers: {
            "X-CSRFToken": "nNXYy5zg9rWT4t8vdJfhg5bbtvbSHMPMVIltbT14UCOMdga0MbJYJQmkfWEAU18L"      
        
        },
      })
        .then(res => {
          const temp = res.data;
          console.log(temp);
          var result = [];
          for (let item of temp.items){
            console.log(item)
            var currentLink = item.url + "/posts/"
            console.log(currentLink)
            axios.get(currentLink,
                {
                  headers: {
                      "X-CSRFToken": "nNXYy5zg9rWT4t8vdJfhg5bbtvbSHMPMVIltbT14UCOMdga0MbJYJQmkfWEAU18L"      
                  
                  },
                })
                  .then(res => {
                  var value = res.data.items;
                  console.log(value);
                  for (let item of value){
                    result.push(item)
                  }
                })
                .catch( e => {
                    console.log(e)
                }).then(() => {
                  console.log(result);
                  this.setState({posts:result,})
                })

          }

  
      })
    }
  
   
  
    renderPosts = () =>{
     const posts = this.state.posts
        console.log(this.state);
        try{
          return posts.length === 0
              ? null
              : (posts.map(item => (
      
                <ListItem key = {item.post_id}>
                  <SinglePost userId = {this.props.authorId} post = {item} badge = {"T1"}/>
                </ListItem> ))
                )
      
          }
        
        catch(e){
            console.log(e)
            return null;
        }
      }
      render(){
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
              {this.renderPosts()}
            </List>
          </Grid>
        )
      }
  }

// class AuthorList extends React.Component {
//     constructor(props){
//       super(props);
//       this.state = {
//         authors: []
//         // authors: [{author_id:1,username:"dragon",profileImage:"/media/user.jpg"}]
//       }
//     }
  
//     componentDidMount() {
//       axios.get(`${base_url}/authors/`,    
//       {
//         headers: {
//           // "X-CSRFToken": this.props.token
//           Authorization:"Token " + this.props.token,
  
//         },
//       })
//         .then(res => {
//           const authors = res.data;
//           console.log(authors);
//           this.setState( authors );
//       })
  
//     }
  
//     renderAuthors(){
//       const {authors} = this.state;
//       return authors.length === 0
//           ? (<CircularProgress />)
//           : (authors.map(item => (
  
//             <ListItem key = {item.author_id}>
//                   <SingleAuthor author = {item}/>
//             </ListItem>)))
  
//           };
  
//       render(){
//         return (
//           <Grid
//             container
//             direction="column"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <List
//               sx={{
//                 width: '100%',
//                 maxWidth: 360,
//                 bgcolor: 'background.paper',
//               }}
//             >
//               {this.renderAuthors()}
//             </List>
//           </Grid>
//         )
//       }
//   }

  
// class AuthorList2 extends React.Component {
//     constructor(props){
//       super(props);
//       this.state = {
//         authors: [],
//         data:[]
//       }
//     }
  

//     componentDidMount() {
//       axios.get(`https://social-distribution-t10.herokuapp.com/api/authors/?size=99`,
//       {
//         headers: {
//             "X-CSRFToken": "nNXYy5zg9rWT4t8vdJfhg5bbtvbSHMPMVIltbT14UCOMdga0MbJYJQmkfWEAU18L"      
        
//         },
//       })
//         .then(res => {
//           console.log(res);
  
//           this.setState(res.data);
//           console.log(this.state);
  
//       })
//     }
  
//     renderAuthors(){
//         try{
//             const authorList = this.state.data;
//             return authorList.length === 0
//                 ? (<CircularProgress />)
//                 : (authorList.map(item => (
        
//                   <ListItem key = {item.author_id}>
//                         <SingleAuthor author = {item} badge = {"T10"}/>
//                   </ListItem>)))
        
//                 }
        
        
//         catch(e){
//             return null
//         }
//     }

//       render(){
//         return (
//           <Grid
//             container
//             direction="column"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <List
//               sx={{
//                 width: '100%',
//                 maxWidth: 360,
//                 bgcolor: 'background.paper',
//               }}
//             >
//               {this.renderAuthors()}
//             </List>
//           </Grid>
//         )
//       }
//   }

//   class AuthorList3 extends React.Component {
//     constructor(props){
//       super(props);
//       this.state = {
//         authors: [],
//         data:[]
//       }
//     }
  

//     componentDidMount() {
//       axios.get('https://social-distance-api.herokuapp.com/authors/',
//       {
//         headers: {
//             "X-CSRFToken": "nNXYy5zg9rWT4t8vdJfhg5bbtvbSHMPMVIltbT14UCOMdga0MbJYJQmkfWEAU18L"      
        
//         },
//       })
//         .then(res => {
//           console.log(res);
  
//           this.setState(res.data);
//           console.log(this.state);
  
//       })
//     }
  
//     renderAuthors(){
//         try{
//             const authorList = this.state.items;
//             return authorList.length === 0
//                 ? (<CircularProgress />)
//                 : (authorList.map(item => (
        
//                   <ListItem key = {item.author_id}>
//                         <SingleAuthor author = {item} badge = {"T1"}/>
//                   </ListItem>)))
        
//                 }
        
        
//         catch(e){
//             return null
//         }
//     }

//       render(){
//         return (
//           <Grid
//             container
//             direction="column"
//           >
//             <List
//               sx={{
//                 width: '100%',
//                 maxWidth: 360,
//                 bgcolor: 'background.paper',
//               }}
//             >
//               {this.renderAuthors()}
//             </List>
//           </Grid>
//         )
//       }
//   }
