
import axios from "axios";


const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken');
const userID = localStorage.getItem('userID');

export function getUserInfo(){

  let res = axios.get(`${base_url}/author/${userID}`,
    {
      headers: {
        Authorization: "Token " + token,
      },
    })

    return res

  
  }

  
export function getAuthorInfo(authorId){

  let res = axios.get(`${base_url}/author/${authorId}`,
    {
      headers: {
        Authorization: "Token " + token,
      },
    })

    return res

  
  }

export function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
  }));
}