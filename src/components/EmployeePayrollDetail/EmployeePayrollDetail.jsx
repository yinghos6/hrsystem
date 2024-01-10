import React,{useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useNavigate,useParams } from "react-router-dom";
import EmployeeService from '../../service/EmployeeService';
import PayrollService from '../../service/PayrollService';




function EmployeePayrollDetail() {

    const{id} = useParams();

    const RedirectToCreateNewUser = () => navigation("/list");
    const GoBackToPreviousPage = ()=> navigation(-1)


    const navigation = useNavigate();
    const [employeeId, setemployeeId] = useState("");
    const [salaryPoint, setsalaryPoint] = useState("");
    const [BasisSalary, setBasisSalary] = useState("");
    const [Bonus, setBonus] = useState("");
    const [startingDate, setstartingDate] = useState("");
    const [payrollRecord, setpayrollRecord] = useState([]);

    const getAllPayrollRecord = () => {
        PayrollService.getAllPayrollRecordByID(id).then((res)=>{
            console.log(res.data);
            setpayrollRecord(res.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res)=>{
            setemployeeId(res.data.id);
            setsalaryPoint(res.data.payrollSalaries[0].point);
            setBasisSalary(res.data.payrollSalaries[0].basisSalary);
            setBonus(res.data.payrollSalaries[0].bonus);
            setstartingDate(res.data.payrollSalaries[0].createdDate);



        }).catch(error=>{
            console.log(error);
        })

        getAllPayrollRecord();


  
    }, []);


  return (
    <div className='w-full'>
      
    <div className='flex flex-row justify-between'>
        <h4 className='text-lg font-bold page_title tracking-wider underline py-4'  >Employee Details</h4>
        <button className='back_button rounded-xl ' onClick={(e)=> {
            RedirectToCreateNewUser(e)
        }}>
            <span >Back To Employee List Page</span>
        </button>
    </div>
    
    <div className='flex flex-row justify-start font-kdam mx-48 gap-12'>
        <Link to={`/employee/profile/${employeeId}`}>
            <button className='profile_item rounded-lg border border-2 px-8 py-8 border-gray-300'>
                <span className='tracking-wider '>Personal Profile</span>
         </button>
        </Link>
        <Link to={`/employee/profile/${employeeId}/leave`}>
            <button className='profile_item rounded-lg border border-2 px-8 py-8 border-gray-300'>
                <span className='tracking-wider '>Leave</span>
            </button>
        </Link>
        <button className='profile_item rounded-lg border border-2 px-8 py-8 border-sky-400 text-sky-500'>
                <span className='tracking-wider '>Payroll</span>
         </button>
    </div>
   
    <div className='flex flex-col mt-8 border-2	p-12 register_box mx-48'>
        <div className='flex flex-row items-center h-12 justify-center'>
            
            <span  className='font-bold text-lg font-source3 ml-4'>Payroll Information</span>
        </div>
        
        <div className='flex flex-row items-center mt-12' >
            <span className='basis-1/2 font-kdam ml-12' >Salary Point:</span>
            <span className='basis-1/2'>{salaryPoint}</span>
        </div>
        <div className='flex flex-row items-center mt-12' >
            <span className='basis-1/2 font-kdam ml-12' >Basis Salary:</span>
            <span className='basis-1/2'>{BasisSalary}</span>
        </div>
        <div className='flex flex-row items-center mt-12' >
            <span className='basis-1/2 font-kdam ml-12' >Bonus:</span>
            <span className='basis-1/2'>{Bonus}</span>
        </div>
        <div className='flex flex-row items-center mt-12' >
            <span className='basis-1/2 font-kdam ml-12' >Starting Month:</span>
            <span className='basis-1/2'>{startingDate.substring(0,7)}</span>
        </div>
         
        
        <table className='ml-12 table-fixed	 border-collapse bg-white mt-24'>
        <thead>
            <tr >
                <th className='bg-state-100 '>
                    <span className='color-state-400'>Payroll Year</span>
                </th>
                <th className='bg-state-100'>
                    <span>Payroll Month</span>
                </th>
                
                <th className='bg-state-100'>
                    <span>Basis Salary</span>
                </th>  
                <th className='bg-state-100'>
                    <span>Bonus</span>
                </th>  
                <th className='bg-state-100'>
                     <span>Total Amount</span>
                 </th>  
                <th className='bg-state-100'>
                     <span>MPF EE Contirbution</span>
                 </th>  
                 <th className='bg-state-100'>
                    <span>MPF ER Contirbution</span>
                 </th>
                 <th className='bg-state-100'>
                     <span>Net Payment</span>
                </th>  
            </tr>
        </thead>
        <tbody className='text-center'>
          {
            payrollRecord.map(
                (record, index)=>

                <tr key={index} >
                
                    <td>
                        <span>{record.year.year}</span>
                    </td>
                    <td>
                        <span>{record.month.month}</span>
                    </td>
                    <td>
                        <span>{record.basisSalary}</span>
                     </td>
                     <td>
                        <span>{record.bonus}</span>
                     </td>
                     <td>
                        <span>{record.totalAmount}</span>
                     </td>
                     <td>
                        <span>{record.employeeContribution}</span>
                     </td>
                     <td>
                         <span>{record.employerContribution}</span>
                     </td>
                     <td>
                         <span>{record.netPayment}</span>
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

export default EmployeePayrollDetail
