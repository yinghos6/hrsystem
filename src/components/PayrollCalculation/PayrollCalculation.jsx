import React,{useState, useEffect} from 'react';
import { useNavigate,useParams } from "react-router-dom";
import EmployeeService from '../../service/EmployeeService';
import PayrollService from '../../service/PayrollService';
import { Button, Result } from 'antd';



function PayrollCalculation() {

    const{id} = useParams();

    const [status, setstatus] = useState(false);
    const [successStatus, setsuccessStatus] = useState("");
    const [successMessage, setsuccessMessage] = useState("");

    const [employeeInfo, setemployeeInfo] = useState([]);
    const [employeeId, setemployeeId] = useState("");
    const [staffNumber, setstaffNumber] = useState("");
    const [engSurname, setengSurname] = useState("");
    const [engLastname, setengLastname] = useState("");
    const [departmentName, setdepartmentName] = useState("");
    const [positionName, setpositionName] = useState("");
    const [shopName, setshopName] = useState("");
    const [payrollDetail, setpayrollDetail] = useState([]);
    const [salaryPoint, setsalaryPoint] = useState("");
    const [basisSalary, setbasisSalary] = useState("");
    const [salaryBonus, setsalaryBonus] = useState("");
    const [MPFContrition, setMPFContrition] = useState("");
    const [totalAmount, settotalAmount] = useState('');
    const [netPayment, setnetPayment] = useState("");
    

    const MPFcalculation = () => {
        
        if((payrollDetail[0].basisSalary+payrollDetail[0].bonus)*0.05 >= 1500 ){
            setMPFContrition(1500);
            const netPaymentAmount = totalAmount - MPFContrition;
            setnetPayment(netPaymentAmount);
        }else{
            setMPFContrition((payrollDetail[0].basisSalary+payrollDetail[0].bonus)*0.05);
            const netPaymentAmount = totalAmount - MPFContrition;
            setnetPayment(netPaymentAmount);
        }
    }

    const navigation = useNavigate();
    const GoBackToLeaveListPage = () => navigation(-1);

    const PayrollRecord = {
        "employeeID": employeeId,
        "basisSalary":basisSalary,
        "bonus":salaryBonus,
        "employee_mpf":MPFContrition,
        "employer_mpf":MPFContrition,
        "total_amount":totalAmount,
        "net_payment":netPayment
    };

    const createNewPayrollRecord = ()=> {
        PayrollService.createPayrollNewRecord(employeeId, PayrollRecord).then((res)=>{
            setstatus(true);
            setsuccessStatus(res.data.status);
            setsuccessMessage(res.data.message);
            console.log(res.data);
        }).catch(error=>{
            console.log(error);
        })
    }    

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res)=>{
            console.log(res.data);
            setemployeeInfo(res.data);
            setemployeeId(res.data.id);
            setstaffNumber(res.data.staff_number);
            setengSurname(res.data.english_Surname);
            setengLastname(res.data.english_Given_Name);
            setdepartmentName(res.data.department.description);
            setpositionName(res.data.position.description);
            setshopName(res.data.shop.description);
            setpayrollDetail(res.data.payrollSalaries);
            setsalaryPoint(res.data.payrollSalaries[0].point);
            setbasisSalary(res.data.payrollSalaries[0].basisSalary);
            setsalaryBonus(res.data.payrollSalaries[0].bonus);
            settotalAmount(res.data.payrollSalaries[0].basisSalary+res.data.payrollSalaries[0].bonus);
            MPFcalculation();
        }).catch(error=>{
            console.log(error);
        })
  
    }, []);

  return (
    <>
    {status?
        <div className='w-full'>
        <Result
        status="success"
        title={successStatus}
        subTitle={successMessage}
        extra={[
          <Button key="button"  onClick={(e)=> {
            GoBackToLeaveListPage(e)
        }} >Back to Employee List Page</Button>,
        ]}
      />
        </div>:

        <div>
        <div className='flex justify-center ml-24 '>
            <span className='font-kdam'>Employee Payroll Monthly Calculation</span>
        </div>
        <div className='flex flex-row mt-12 ml-12 gap-8'>
            <button className='year_item rounded-lg border border-2 px-4 py-4 border-sky-400 text-sky-400'>
                <span className='tracking-wider'>2023</span>
            </button>
            <button className='year_item rounded-lg border border-2 px-4 py-4 border-gray-300 '>
                <span className='tracking-wider'>2022</span>
            </button>
            <button className='year_item rounded-lg border border-2 px-4 py-4 border-gray-300 '>
                <span className='tracking-wider'>2021</span>
            </button>
            <button className='year_item rounded-lg border border-2 px-4 py-4 border-gray-300 '>
                <span className='tracking-wider'>2020</span>
            </button>
        </div>
        <div className='flex flex-row mt-12 ml-12 gap-8'>
        <button className='year_item rounded-lg border border-2 px-4 py-4 border-sky-400 text-sky-400'>
            <span className='tracking-wider'>12</span>
        </button>
        <button className='year_item rounded-lg border border-2 px-4 py-4 border-gray-300 '>
            <span className='tracking-wider'>11</span>
        </button>
        <button className='year_item rounded-lg border border-2 px-4 py-4 border-gray-300 '>
            <span className='tracking-wider'>10</span>
        </button>
        <button className='year_item rounded-lg border border-2 px-4 py-4 border-gray-300 '>
            <span className='tracking-wider'>9</span>
        </button>
    </div>
        <div className='flex flex-column ml-12 '>
            <div className='flex flex-row w-full mt-8 '>
           
            <div className='basis-1/2'>
                <div className='flex flex-row h-12 items-center mt-8 ml-12 '>
                    <span className='basis-1/2 font-kdam '>Staff Number:</span>
                    <span className='basis-1/2'>{staffNumber}</span>
                </div>
                <div className='flex flex-row h-12 items-center mt-4 ml-12 '>
                    <span className='basis-1/2 font-kdam '>FullName:</span>
                    <span className='basis-1/2'>{engSurname +" " + engLastname}</span>
                </div>
                <div className='flex flex-row h-12 items-center mt-4 ml-12 '>
                    <span className='basis-1/2 font-kdam '>Department:</span>
                    <span className='basis-1/2'>{departmentName}</span>
                </div>
                <div className='flex flex-row h-12 items-center mt-4 ml-12 '>
                    <span className='basis-1/2 font-kdam '>Position:</span>
                    <span className='basis-1/2'>{positionName}</span>
                </div>
                <div className='flex flex-row h-12 items-center mt-4 ml-12 '>
                    <span className='basis-1/2 font-kdam '>Shop:</span>
                    <span className='basis-1/2'>{shopName}</span>
                 </div>
            </div>
            <div className='basis-1/2 '>
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/2 font-kdam '>Salary Point:</span>
                    <span className='basis-1/2'>{salaryPoint}</span>
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/2 font-kdam '>Salary Basis Salary:</span>
                    <span className='basis-1/2'>{basisSalary}</span>
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/2 font-kdam '>Salary Bonus:</span>
                    <span className='basis-1/2'>{salaryBonus}</span>
                </div>
            </div>
        </div>

        </div>
        <div className='flex flex-col mt-8 border-2	p-12 register_box mx-24 justify-center'>
            <div className='flex flex-row items-center h-12 justify-center mb-8'>
                <span  className='font-bold text-lg font-source3 ml-4 underline'>Payroll Calulation</span>
            </div>
            <div className='flex flex-row mx-8 justify-between mt-2'>
                <div>
                    <span className='underline font-bold '>Item</span>
                </div>
                <div>
                    <span  className='underline font-bold '>Amount($HKD)</span>
                </div>
            </div>
            <div className='flex flex-row mx-8 justify-between mt-2'>
                <div>
                    <span>Basis Salary</span>
                </div>
                <div>
                    <span>{basisSalary}</span>
                </div>
            </div>
            <div className='flex flex-row mx-8 justify-between mt-2'>
                <div>
                    <span>Bonus</span>
                </div>
                <div>
                    <span>{salaryBonus}</span>
                </div>
            </div>
            <div className='flex flex-row mx-8 justify-between mt-2'>
                <div>
                    <span>Total Amount:</span>
                </div>
                <div>
                    <span>{salaryBonus + basisSalary}</span>
                </div>
            </div>
            <div className='flex flex-row mx-8 justify-between mt-2'>
                <div>
                    <span>MPF Member Contribution Ratio:</span>
                </div>
                <div>
                    <span>5%</span>
                </div>
            </div>
            <div className='flex flex-row mx-8 justify-between mt-2'>
                <div>
                    <span>MPF Member Contribution Amount({salaryBonus + basisSalary} * 5%):</span>
                </div>
                <div>
                    <span>{MPFContrition}</span>
                </div>
             </div>
              <div className='flex flex-row mx-8 justify-between mt-2'>
                <div>
                    <span>MPF Employer Contribution Ratio:</span>
                </div>
                <div>
                    <span>5%</span>
                </div>
            </div>
            <div className='flex flex-row mx-8 justify-between mt-2'>
                <div>
                    <span>MPF Employer Contribution Amount({salaryBonus + basisSalary} * 5%):</span>
                </div>
                <div>
                    <span>{MPFContrition}</span>
                </div>
             </div>
             <hr className='border-2  mt-2' />

             <div className='flex flex-row mx-8 justify-between mt-2 mt-4'>
             <div>
                 <span className=' font-bold '>Net Payment:</span>
             </div>
             <div>
                 <span className='font-bold'>{netPayment}</span>
             </div>
         </div>

        </div>
        <div className='flex flex-row justify-center ml-12 mt-12' >
            <div className='flex flex-row gap-24'>
                <button onClick={()=>GoBackToLeaveListPage()} className='border border-2 border-gray-400 w-48 h-12 rounded-lg text-gray-500 hover:border-sky-700 hover:text-sky-700'>
                    <span >Cancel</span>
                </button>
                <button onClick={()=>createNewPayrollRecord()} className='border border-2 border-gray-400 w-48 h-12 rounded-lg text-gray-500 hover:border-sky-700 hover:text-sky-700'>
                    <span >Submit</span>
                </button>
            </div>
        
        </div>
    </div>

    }
    
    </>
    
  )
}

export default PayrollCalculation
