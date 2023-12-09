import axios from 'axios';
import authHeader from './auth-header';

const Auth_API_BASE_URL = "http://localhost:8080/api/auth/";


class UserService{

    registerNewUSer(user){
        return axios.post(Auth_API_BASE_URL + 'register', user);
    }

    userLogin(userLoginDetail){
        return axios.post(Auth_API_BASE_URL + 'signin', userLoginDetail).then((res)=>{
            if(res.data.jwtResponse){
                localStorage.setItem("user", JSON.stringify(res.data.jwtResponse));
            }


            return res.data;
        })
    }

    userInfo(){
        return axios.get(Auth_API_BASE_URL + 'userInfo',{headers:authHeader()});
    }

    logout(){
        localStorage.removeItem("user");
    }

}


export default new UserService;
