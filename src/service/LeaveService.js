import axios from 'axios';
import authHeader from './auth-header';

const LeaveService_API_BASE_URL = "http://localhost:8080/api/v1/leave/"


class LeaevService {

    getEmployeeLeaveRecord(EmployeeID){
       return axios.get(LeaveService_API_BASE_URL +EmployeeID+ "/leaveRecord",{headers:authHeader()} )
    }
}



export default new LeaevService;
