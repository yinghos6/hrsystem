import axios from 'axios';
import authHeader from './auth-header';

const EmployeeService_API_BASE_URL = "http://localhost:8080/api/v1/employee/"


class EmployeeService{

    getAllEmployee(){
        return axios.get(EmployeeService_API_BASE_URL+'getAllEmployee', {headers:authHeader()});
    }

    getEmployeeById(employeeId){
        return axios.get(EmployeeService_API_BASE_URL + employeeId, {headers:authHeader()});
    }

    getDropdownList(){
        return axios.get(EmployeeService_API_BASE_URL + 'info',{headers:authHeader()} )
    }

}


export default new EmployeeService;
