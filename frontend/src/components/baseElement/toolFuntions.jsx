
import axios from "axios";


const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken');

export function getUserInfo(props){

  let res = axios.get(`${base_url}/author/${props.authorId}`,
    {
      headers: {
        Authorization: "Token " + token,
      },
    })

    return res

  
  }