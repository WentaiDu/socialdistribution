import * as React from 'react';

import Grid from '@mui/material/Grid';
import axios from "axios";
import {AuthorList} from "./baseElement/baseElement";
const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken')

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
    console.log(e);
    console.log("get all authos error");
  })
  authors = res.data.authors
  return authors;
}

export default  function Authors() {


  // const [authors, setAuthors] = useState([]);
  var authors = processAuthors();
  console.log(authors)


  return(<AuthorList authors = {authors} />);



}
