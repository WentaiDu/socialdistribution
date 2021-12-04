
import axios from "axios";


const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken');

export function getUserInfo(){
    const userID = localStorage.getItem('userID');
    let res = axios.get(`${base_url}/author/${userID}`,
    {
      headers: {
        Authorization: "Token " + token,
      },
    })

    return res
  
  }