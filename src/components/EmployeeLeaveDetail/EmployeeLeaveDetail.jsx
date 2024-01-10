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
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(1),
      },
    },
  }));

function EmployeeLeaveDetail() {
    const{id} = useParams();

    const navigation = useNavigate();

    const RedirectToCreateNewUser = () => navigation("/list")
    const GoBackToPreviousPage = ()=> navigation(-1)

    const [status, setstatus] = useState(false);
    const [employeeId, setemployeeId] = useState("");
    const [leaveBalance, setleaveBalance] = useState([]);
    const [leaveRecord, setleaveRecord] = useState([]);

    const [totalNum, settotalNum] = useState("");
    const [totalPage, settotalPage] = useState("");
    const [currentPage, setcurrentPage] = useState("0");
    const [currentSize, setcurrentSize] = useState(10);
    const [sortField, setsortField] = useState("id");
    const [sortDir, setsortDir] = useState("asc");


    const getAllLeaveBalance = ()=>{
        LeaveService.getEmployeeLeaveBalance(id).then((res)=>{
            setleaveBalance(res.data[0]);

        }).catch(error=>{
            console.log(error);
        })
    }

    const getAllLeaveRecord = ()=>{
        LeaveService.getAllLeaveRecordByEmployee(id,currentPage,currentSize,sortField,sortDir).then((res)=>{
            console.log(res.data)
            setleaveRecord(res.data.content);
            settotalNum(res.data.totalElements);
            settotalPage(res.data.totalPages);

        }).catch(error=>{
            console.log(error);
        })
    }

    const handlePageChange = (event,page)=>{
        let seletedPage = page -1;
        console.log("the page is"+ seletedPage);
        setcurrentPage(seletedPage);
        LeaveService.getAllLeaveRecordByEmployee(id,seletedPage,currentSize,sortField,sortDir).then((res)=>{
            console.log(res.data)
            setleaveRecord(res.data.content);
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

        getAllLeaveBalance();
        getAllLeaveRecord();
  
    }, []);

  return (
    <div>
        <div className='flex flex-row justify-between'>
            <h4 className='text-lg font-bold page_title tracking-wider underline py-4'  >Employee Leave Management</h4>
            <button className='back_button rounded-xl px-2 ' onClick={()=> {
                GoBackToPreviousPage()
            }}>
                <span >Back To Shop Employee List Page</span>
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
            <Link to={`/employee/profile/${employeeId}/payroll`}>
                <button className='profile_item rounded-lg border border-2 px-8 py-8 border-gray-300'>
                    <span className='tracking-wider '>Payroll</span>
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
         <div className='flex  h-12  mt-6 ml-24 item-center justify-start align-cneter gap-8'>
                <span className='font-kdam '>Leave Year:</span>
                <span className=''>{leaveBalance.leaveBalanceYear}</span>
        </div>
         <div className='flex flex-column ml-12 '>
            
            <div className='flex flex-row w-full'>

                <div className='basis-1/3'>
                    <div className='flex flex-row h-12 items-center mt-8 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Annual Leave Total:</span>
                        <span className='basis-1/2'>{leaveBalance.balanceAnnualLeave + leaveBalance.appliedAnnualLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-8 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Sick Leave Total:</span>
                        <span className='basis-1/2'>{leaveBalance.balanceSickLeave + leaveBalance.appliedSickLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-8 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Special Leave Total:</span>
                        <span className='basis-1/2'>{leaveBalance.balanceSpecialLeave + leaveBalance.appliedSpecialLeave}</span>
                    </div>
                </div>
                <div className='basis-1/3 '>
                    <div className='flex flex-row h-12 items-center mt-8 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Annual Leave Counted:</span>
                        <span className='basis-1/2'>{leaveBalance.appliedAnnualLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-cente mt-8 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Sick Leave Counted:</span>
                        <span className='basis-1/2'>{leaveBalance.appliedSickLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-8 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Special Leave Counted:</span>
                        <span className='basis-1/2'>{leaveBalance.appliedSpecialLeave}</span>
                    </div>
                </div>
                <div className='basis-1/3 '>
                    <div className='flex flex-row h-12 items-center mt-8 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Annual Leave Balance:</span>
                        <span className='basis-1/2'>{leaveBalance.balanceAnnualLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-8 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Sick Leave Balance:</span>
                        <span className='basis-1/2'>{leaveBalance.balanceSickLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-8 ml-12 '>
                        <span className='basis-1/2 font-kdam '>Special Leave Balance:</span>
                        <span className='basis-1/2'>{leaveBalance.balanceSpecialLeave}</span>
                    </div>
           
                </div>
            </div>
            
         </div>
         
         
    

             
      

   
        
     
             { /* <div className='flex flex-row h-12 items-center mt-24 justify-center'>
             <button className='delete_button rounded-xl' onClick={deleteEmployeeByID}>
                 <span>Delete</span>
             </button>
             </div> */}
             <div className='flex flex-row h-12 items-center mt-12 justify-between ml-12 align-center'>
                   <p className='font-bold' >Leave Record</p>
                   <Link to={`/employee/leave/${employeeId}/newRecord`}>
                        <button className='ml-12 bg-sky-700 hover:bg-sky-600 text-white font-openSans w-48 rounded-lg h-10'>
                                <span>Apply new leave</span>
                        </button>
                    </Link>
             </div>
             <table className='ml-12 table-auto border-collapse bg-white mt-4'>
                <thead>
                    <tr >
                        <th className='bg-state-100 '>
                            <span className='color-state-400'>Leave Type</span>
                        </th>
                        <th className='bg-state-100'>
                            <span>Leave Year</span>
                        </th>
                        <th className='bg-state-100'>
                            <span>Leave Period</span>
                        </th>  
                        <th className='bg-state-100'>
                             <span>Counted Days</span>
                         </th>  
                        <th className='bg-state-100'>
                             <span>Leave Status</span>
                         </th>  
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {leaveRecord.map(
                        (record, index)=>

                        <tr key={index}  >
                            <td >
                                <span>{record.leaveType.leaveName}</span>
                            </td>
                            <td >
                                <span>{record.leaveYear}</span>
                            </td>
                            <td>
                                <span className='tracking-wider'>{record.leaveStartDate.substring(0, 10)} - {record.leaveEndDate.substring(0, 10)} </span>
                             </td>
                            <td>
                                <span>{record.countedDays}</span>
                            </td>
                             <td>
                                <span>{record.leaveStatus.name}</span>
                            </td>
                        </tr>

                    )}
                   
                </tbody>
             </table>
             <div className='flex flex-row justify-center mt-8 '>
             <span className='flex font-openSans '>The total of leave record: <p className='text-sky-800 ml-4 underline'>{totalNum}</p></span>
            </div>
            <div className='flex flex-row justify-center mt-4 item-center mb-12 '>
                    <div className={useStyles.root}>
                        <Pagination count={totalPage} variant="outlined" size="large" onChange={handlePageChange}  />
                    </div>
            </div>
          </div>
    </div>
  )
}

export default EmployeeLeaveDetail
