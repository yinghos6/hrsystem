import axios from 'axios';

const axios = require("axios");

function getLocalToken(){
    const user = JSON.parse(localStorage.getItem('user'));
    return user.jwt_token;
}

const api = axios.create({
    baseURL:"http://localhost:8080/",
});


api.interceptors.request.use(
    async config =>{
        const token = getLocalToken();
        if(token){
            config.headers={'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'}
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);
