import axios from 'axios';
import authHeader from './auth-header';

const PayrollService_API_BASE_URL = "http://localhost:8080/api/v1/payroll/"


class PayrollService{


    createPayrollNewRecord(EmployeeID, PayrollRecord){
        return axios.post(PayrollService_API_BASE_URL+ EmployeeID + "/create",PayrollRecord, {headers:authHeader()})
    }
}


export default new PayrollService;