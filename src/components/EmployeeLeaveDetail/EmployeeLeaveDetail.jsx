import React,{useState, useEffect}  from 'react'
import { useNavigate,useParams } from "react-router-dom";
import EmployeeService from '../../service/EmployeeService';
import { Button, Result } from 'antd';
import './EmployeeLeaveDetail.scss';
import {UserDeleteOutlined} from '@ant-design/icons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import LeaveService from '../../service/LeaveService';

function EmployeeLeaveDetail() {
    const{id} = useParams();

    const navigation = useNavigate();

    const RedirectToCreateNewUser = () => navigation("/list")

    const [status, setstatus] = useState(false);
    const [employeeId, setemployeeId] = useState("");
    const [leaveRecord, setleaveRecord] = useState([]);


    const getAllLeaveRecord = ()=>{
        LeaveService.getEmployeeLeaveRecord(id).then((res)=>{
            setleaveRecord(res.data[0]);
            console.log(leaveRecord)

        }).catch(error=>{
            console.log(error);
        })
    }

   

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res)=>{
            setemployeeId(res.data.id);
            
        }).catch(error=>{
            console.log(error);
        })

        getAllLeaveRecord()

  
    }, []);

  return (
    <div>
        <div className='flex flex-row justify-between'>
            <h4 className='text-lg font-bold page_title tracking-wider underline py-4'  >Employee Leave Management</h4>
            <button className='back_button rounded-xl ' onClick={(e)=> {
                RedirectToCreateNewUser(e)
            }}>
                <span >Back To Employee List Page</span>
            </button>
        </div>
        <div className='flex flex-row justify-start font-kdam mx-48 gap-12'>
            <Link to={`/employee/profile/${employeeId}`}>
                <button className='profile_item rounded-lg border border-2 px-8 py-8 border-gray-300 '>
                    <span className='tracking-wider '>Personal Profile</span>
                </button>
            </Link>
            <Link to={`/employee/profile/${employeeId}/leave`}>
                <button className='profile_item rounded-lg border border-2 px-8 py-8 border-sky-400 text-sky-500'>
                    <span className='tracking-wider '>Leave</span>
                </button>
            </Link>
         </div>


         <div className='flex flex-col mt-8 border-2	p-12 register_box mx-48'>
         <div className='flex flex-row items-center h-12 justify-center'>
             <span  className='font-bold text-lg font-source3 ml-4'>Leave Information</span>
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
         <div className='flex  h-12  mt-12 ml-24 item-center justify-start align-cneter gap-8'>
                <span className='font-kdam '>Leave Year:</span>
                <span className=''>{leaveRecord.leaveBalanceYear}</span>
        </div>
         <div className='flex flex-column ml-12 '>
            
            <div className='flex flex-row w-full'>

                <div className='basis-1/3'>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Annual Leave Total:</span>
                        <span className='basis-1/2'>{leaveRecord.balanceAnnualLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Sick Leave Total:</span>
                        <span className='basis-1/2'>{leaveRecord.balanceSickLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Special Leave Total:</span>
                        <span className='basis-1/2'>{leaveRecord.balanceSpecialLeave}</span>
                    </div>
                </div>
                <div className='basis-1/3'>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Annual Leave Counted:</span>
                        <span className='basis-1/2'>{leaveRecord.appliedAnnualLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Sick Leave Counted:</span>
                        <span className='basis-1/2'>{leaveRecord.appliedSickLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Special Leave Counted:</span>
                        <span className='basis-1/2'>{leaveRecord.appliedSpecialLeave}</span>
                    </div>
                </div>
                <div className='basis-1/3'>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Annual Leave Balance:</span>
                        <span className='basis-1/2'>{leaveRecord.balanceAnnualLeave - leaveRecord.appliedAnnualLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Sick Leave Balance:</span>
                        <span className='basis-1/2'>{leaveRecord.balanceSickLeave - leaveRecord.appliedSickLeave }</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Special Leave Balance:</span>
                        <span className='basis-1/2'>{leaveRecord.balanceSpecialLeave - leaveRecord.appliedSpecialLeave}</span>
                    </div>
           
                </div>
            </div>
            
         </div>
         
         
    

             
      

   
        
     
             { /* <div className='flex flex-row h-12 items-center mt-24 justify-center'>
             <button className='delete_button rounded-xl' onClick={deleteEmployeeByID}>
                 <span>Delete</span>
             </button>
             </div> */}
             <div className='flex flex-row h-12 items-center mt-24 justify-center'>
                   
             </div>
          </div>
    </div>
  )
}

export default EmployeeLeaveDetail
