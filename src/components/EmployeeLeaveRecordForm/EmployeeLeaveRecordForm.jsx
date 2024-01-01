import React from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import LeaveService from '../../service/LeaveService';
import EmployeeService from '../../service/EmployeeService';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Button, Result } from 'antd';





    



function EmployeeLeaveRecordForm() {



    const [leavePeriod, setleavePeriod] = React.useState([
        dayjs('01/12/2023',"DD/MM/YYYY"),
        dayjs('03/12/2023',"DD/MM/YYYY"),
      ]);
    
    

    const [status, setstatus] = useState(false);
    const [successStatus, setsuccessStatus] = useState("");
    const [successMessage, setsuccessMessage] = useState("");

    const{id} = useParams();
    const [employeeId, setemployeeId] = useState("");
    const [leaveRecord, setleaveRecord] = useState([]);
    const [staffNumber, setstaffNumber] = useState("");
    const [engSurname, setengSurname] = useState("");
    const [engLastname, setengLastname] = useState("");
    const [departmentName, setdepartmentName] = useState("");
    const [positionName, setpositionName] = useState("");
    const [shopName, setshopName] = useState("");
    const [leaveTypeID, setleaveTypeID] = useState("1");
    const [leaveTypeDropdown, setleaveTypeDropdown] = useState([]);
    const [leaveStatusID, setleaveStatusID] = useState("1");
    const [leaveStatusDropdown, setleaveStatusDropdown] = useState([]);



    const LeaveRecord = {
        "employeID": employeeId,
        "leaveTypeID":leaveTypeID,
        "leaveStatusID":leaveStatusID,
        "leaveYear":"2023",
        "leaveStartDate":dayjs(leavePeriod[0]).format('YYYY-MM-DD'),
        "leaveEndDate": dayjs(leavePeriod[1]).format('YYYY-MM-DD'),
        "leave_counted_days":"3"
    }
    

    const getAllLeaveRecord = ()=>{
        LeaveService.getEmployeeLeaveRecord(id).then((res)=>{
            setleaveRecord(res.data[0]);
            console.log(leaveRecord)

        }).catch(error=>{
            console.log(error);
        })
    }


    const getAllLeaveType = ()=>{
        LeaveService.getAllLeaveType().then((res)=>{
            setleaveTypeDropdown(res.data);
            console.log(res.data);
        }).catch(error=>{
            console.log(error)
        })
    }

    const getAllLeaveStatus = ()=>{
        LeaveService.getAllLeaveStatus().then((res)=>{
            setleaveStatusDropdown(res.data);
        }).catch(error=>{
            console.log(error)
        })
    }

    const submitNewLeaveRecord = ()=>{
        LeaveService.createNewLeaveRecord(id,LeaveRecord).then((res)=>{
            setstatus(true);
            setsuccessStatus(res.data.status);
            setsuccessMessage(res.data.message);
            console.log(res.data);
        }).catch(error=>{
            console.log(error);
        })
    }

   

    const getEmployeeInfo = () =>{
        EmployeeService.getEmployeeById(id).then((res)=>{
            setemployeeId(res.data.id);
            setstaffNumber(res.data.staff_number);
            setengSurname(res.data.english_Surname);
            setengLastname(res.data.english_Given_Name);
            setdepartmentName(res.data.department.description);
            setpositionName(res.data.position.description);
            setshopName(res.data.shop.description);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => {
        getEmployeeInfo();
        getAllLeaveRecord();
        getAllLeaveType();
        getAllLeaveStatus();
    }, [])


    const navigation = useNavigate();
    const GoBackToPreviousPage = ()=> navigation(-1);
    const GoBackToLeaveListPage = () => navigation("/leave/list");



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
            <span className='font-kdam'>Create Employee New Leave Record</span>
            
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
                        <span className='basis-1/2 font-kdam '>2023 Annual Leave Balance:</span>
                        <span className='basis-1/2'>{leaveRecord.balanceAnnualLeave - leaveRecord.appliedAnnualLeave}</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className='basis-1/2 font-kdam '>2023 Sick Leave Balance:</span>
                        <span className='basis-1/2'>{leaveRecord.balanceSickLeave - leaveRecord.appliedSickLeave }</span>
                    </div>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className='basis-1/2 font-kdam '>2023 Special Leave Balance:</span>
                        <span className='basis-1/2'>{leaveRecord.balanceSpecialLeave - leaveRecord.appliedSpecialLeave}</span>
                    </div>
                </div>
            </div>

        </div>

        <div className='flex justify-center ml-24 mt-24'>
            <span>2023 New Leave Application</span>
         </div>
         <div className='flex flex-row gap-8 justify-center ml-24 my-12 items-center'>
            <span>Levae Type:</span>
            <select onChange={(e)=>setleaveTypeID(e.target.value)} className='w-72 h-8 border-2 border-gray-200 px-8 rounded-lg'>
                {
                    leaveTypeDropdown.map((type, index)=>
                        <option key={index} value={type.id}>
                            {type.leaveName}
                        </option>
                    )
                }
            </select>
         </div>

         <div className='flex flex-row justify-center ml-24 my-24 items-center gap-8 align-center' >
            <span >Leave Period:</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                        className='h-8'
                        value={leavePeriod}
                        onChange={(newLeavePeriod) => setleavePeriod(newLeavePeriod)}
                        />
                </LocalizationProvider>
         </div>

         <div className='flex flex-row gap-8 justify-center ml-24 my-12 items-center'>
         <span>Levae Status:</span>
         <select onChange={(e)=>setleaveStatusID(e.target.value)}  className='w-72 h-8 border-2 border-gray-200 px-8 rounded-lg'>
                    {
                        leaveStatusDropdown.map((status, index)=>
                            <option key={index} value={status.id}>
                                {status.name}
                            </option>
                        )
                    }
         </select>
      </div>
         <div className='flex flex-row justify-center ml-24 mt-12' >
            <div className='flex flex-row gap-24'>
                <button className='border border-2 border-gray-400 w-48 h-12 rounded-lg text-gray-500 hover:border-sky-700 hover:text-sky-700'>
                    <span onClick={()=>GoBackToPreviousPage()}>Cancel</span>
                </button>
                <button onClick={()=>submitNewLeaveRecord()} className='border border-2 border-gray-400 w-48 h-12 rounded-lg text-gray-500 hover:border-sky-700 hover:text-sky-700'>
                     <span >Submit</span>
                 </button>
            </div>
            
         </div>
    
    
    </div>}
    </>
  )
}

export default EmployeeLeaveRecordForm;



