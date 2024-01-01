import axios from 'axios';
import authHeader from './auth-header';

const LeaveService_API_BASE_URL = "http://localhost:8080/api/v1/leave/"


class LeaevService {

    getEmployeeLeaveBalance(EmployeeID){
       return axios.get(LeaveService_API_BASE_URL +EmployeeID+ "/leaveBalance",{headers:authHeader()} )
    }

    getAllLeaveType(){
        return axios.get(LeaveService_API_BASE_URL + "leaveTypeAll",{headers:authHeader()} )
    }

    getAllLeaveStatus(){
        return axios.get(LeaveService_API_BASE_URL + "leaveStatusAll",{headers:authHeader()}  )
    }

    createNewLeaveRecord(EmployeeID,leaveRecord){
        return axios.post(LeaveService_API_BASE_URL + EmployeeID + "/newRecord",leaveRecord, {headers:authHeader()})
    }

    getAllLeaveRecordByEmployee(EmployeeID,page, size,sortField, sortDir){
        return axios.get(LeaveService_API_BASE_URL + EmployeeID + "/getAllRecord" + '?page='+page +'&size='+size +"&sortField="+sortField +"&sortDir="+sortDir, {headers:authHeader()} )
    }
}



export default new LeaevService;
