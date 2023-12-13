import axios from 'axios';
import authHeader from './auth-header';

const EmployeeService_API_BASE_URL = "http://localhost:8080/api/v1/employee/"


class EmployeeService{


    getAllEmployee(page, size){
        return axios.get(EmployeeService_API_BASE_URL+'getAllEmployee' + '?page='+page +'&size='+size, {headers:authHeader()});
    }

    getEmployeeById(employeeId){
        return axios.get(EmployeeService_API_BASE_URL + employeeId, {headers:authHeader()});
    }

    getDropdownList(){
        return axios.get(EmployeeService_API_BASE_URL + 'info',{headers:authHeader()} )
    }


    createNewEmployee(employeeInput){
        return axios.post(EmployeeService_API_BASE_URL+'create',employeeInput,{headers:authHeader()})
    }

    deleteEmployeeById(EmployeeID){
        return axios.delete(EmployeeService_API_BASE_URL+'delete/'+ EmployeeID,{headers:authHeader()})
    }

}


export default new EmployeeService;
