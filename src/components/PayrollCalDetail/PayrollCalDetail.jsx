import React,{useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import './PayrollCalDetail.scss';
import EmployeeService from '../../service/EmployeeService';
import { Link, useNavigate } from "react-router-dom";




function PayrollCalDetail() {

    const{id} = useParams();

    const [employeeList, setemployeeList] = useState([]);
    const [totalNum, settotalNum] = useState("");
    const [totalPage, settotalPage] = useState("");
    const [currentPage, setcurrentPage] = useState("0");
    const [currentSize, setcurrentSize] = useState(10);
    const [sortField, setsortField] = useState("id");
    const [sortDir, setsortDir] = useState("asc");
    const [shopID, setshopID] = useState("");


    const getEmployeeListByShopID = () => {

        EmployeeService.getAllEmployeeByShopID( id, currentPage ,currentSize,sortField,sortDir ).then((res)=>{
            setemployeeList(res.data.content);
            settotalNum(res.data.totalElements);
            settotalPage(res.data.totalPages);
            console.log(res.data);

        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        setshopID(id);
        getEmployeeListByShopID(shopID);
    }, [])
  return (
    <div>
        <div className='flex flex-row justify-center my-8'>
            <span className='font- text-lg'>Payroll Calculation Details</span>
        </div>

        <div className='w-full'>
            <div className='flex flex-row justify-start my-8'>
                <span>Total employee of this shop:</span>
                <span className='ml-2 font-bold '>{totalNum}</span>
            </div>
            <table class="table-fixed w-full mt-12">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Employee Name</th>
                    <th>Point</th>
                    <th>Basis Salary</th>
                    <th>Bonus</th>
                    <th>Total Amount</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody className='text-center'>
               {
                employeeList.map(
                    (employee, index) =>
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{employee.chinese_FullName}</td>
                        <td>{employee.payrollSalaries[0].point}</td>
                        <td>{employee.payrollSalaries[0].basisSalary}</td>
                        <td>{employee.payrollSalaries[0].bonus}</td>
                        <td>{employee.payrollSalaries[0].bonus + employee.payrollSalaries[0].basisSalary}</td>
                        <td>
                            <Link to={`/payroll/cal/${employee.id}`} >
                                <button className='p-3 w-48 rounded-lg text-gray-400 hover:text-sky-500'>
                                    <span>Calculation</span>
                                </button>
                            </Link>
                            
                        </td>
                    </tr>
                )
               }
               
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default PayrollCalDetail;

