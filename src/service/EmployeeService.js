import axios from 'axios';
import authHeader from './auth-header';

const EmployeeService_API_BASE_URL = "http://localhost:8080/api/v1/employee/"


class EmployeeService{


    getAllEmployee(page, size,sortField, sortDir){
        return axios.get(EmployeeService_API_BASE_URL+'getAllEmployee' + '?page='+page +'&size='+size +"&sortField="+sortField +"&sortDir="+sortDir, {headers:authHeader()});
    }

    getAllEmployeeByKeyword(page, size,sortField, sortDir, keyword){
        return axios.get(EmployeeService_API_BASE_URL+'getAllEmployee' + '?page='+page +'&size='+size +"&sortField="+sortField +"&sortDir="+sortDir + "&keyword=" +keyword, {headers:authHeader()});
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

    editEmployeeProfile(editedEmployeeProfile){
        return axios.put(EmployeeService_API_BASE_URL+"editProfile",editedEmployeeProfile,{headers:authHeader()})
    }


    getAllEmployeeByShopID(shopID,page, size,sortField, sortDir){
        return axios.get(EmployeeService_API_BASE_URL+'getAllEmployeeByShop/'+ shopID + '?page='+page +'&size='+size +"&sortField="+sortField +"&sortDir="+sortDir,{headers:authHeader()})
    }

    getAllEmployeeByActiveStatus(statusID){
        return axios.get(EmployeeService_API_BASE_URL + 'total/' + statusID,{headers:authHeader()});
    }

}


export default new EmployeeService;
