import * as React from 'react';
import axios from "axios";
import {AuthorList} from "./baseElement/baseElement";
import { useState } from "react";


const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken')

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  axios.get(`${base_url}/authors/`,    
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
