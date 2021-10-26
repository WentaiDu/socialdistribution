import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:8000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('token')){
        let token = localStorage.getItem('token');
        req.headers.Authorization = "token " + token
    }

    return req;
})

export const getProfile = (formData) => API.get(`/profile/${formData}`);