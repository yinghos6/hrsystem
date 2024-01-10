import React,{useState, useEffect} from 'react';
import { useNavigate,useParams } from "react-router-dom";
import EmployeeService from '../../service/EmployeeService';
import { Button, Result } from 'antd';
import './EmployeeDetail.scss';
import {UserDeleteOutlined} from '@ant-design/icons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";



function EmployeeDetail() {
    const{id} = useParams();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [status, setstatus] = useState(false);
    const [employeeInfo, setemployeeInfo] = useState([]);
    const [departmentName, setdepartmentName] = useState("");
    const [positionName, setpositionName] = useState("");
    const [shopName, setshopName] = useState("");
    const [employeeDate, setemployeeDate] = useState("");
    const [employeeId, setemployeeId] = useState("");
    const [deleteStatus, setdeleteStatus] = useState("");
    const [deleteMessage, setdeleteMessage] = useState("");

  


    const navigation = useNavigate();

    const RedirectToCreateNewUser = () => navigation("/list")
    const RedirectToEditUser = () => navigation("/employee/profile/edit/:id")


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    

    const deleteEmployeeByID = (e) => {
        e.preventDefault();

        EmployeeService.deleteEmployeeById(employeeId).then((res)=>{
            console.log(res.data);
            setstatus(true);
            setdeleteStatus(res.data.status);
            setdeleteMessage(res.data.message);
        }).catch(error=>{
            console.log(error);
        })
    }



    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res)=>{
            console.log(res.data);
            setemployeeInfo(res.data);
            setdepartmentName(res.data.department.name);
            setpositionName(res.data.position.name);
            setshopName(res.data.shop.name);
            setemployeeDate(res.data.employment_date);
            setemployeeId(res.data.id);
            
        }).catch(error=>{
            console.log(error);
        })
  
    }, []);


  return (
        <>
            {status?
                <div className='w-full'>
                <Result
                icon={<UserDeleteOutlined  />}
                title={deleteStatus}
                subTitle={deleteMessage}
                
                extra={[
                  <Button key="button"  onClick={(e)=> {
                    RedirectToCreateNewUser(e)
                }} >Back to Employee List Page</Button>,
                ]}
              />
                </div>
            :
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
                    <button className='profile_item rounded-lg border border-2 px-8 py-8 border-sky-400 text-sky-500'>
                        <span className='tracking-wider '>Personal Profile</span>
                 </button>
                </Link>
                <Link to={`/employee/profile/${employeeId}/leave`}>
                    <button className='profile_item rounded-lg border border-2 px-8 py-8 border-gray-300'>
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
                    
                    <span  className='font-bold text-lg font-source3 ml-4'>Personal Information</span>
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/2 font-kdam '>Staff Number:</span>
                    <span className='basis-1/2'>{employeeInfo.staff_number}</span>
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/2 font-kdam '>Chinese Fullname:</span>
                    <span className='basis-1/2'>{employeeInfo.chinese_FullName}</span>
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/2 font-kdam '>English Surname:</span>
                    <span className='basis-1/2'>{employeeInfo.english_Surname}</span>
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/2 font-kdam '>English Given Name:</span>
                    <span className='basis-1/2'>{employeeInfo.english_Given_Name}</span>
                </div>
               
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/2 font-kdam '>Department:</span>
                    <span className='basis-1/2'>{departmentName}</span>
    
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12'>
                    <span className='basis-1/2 font-kdam '>Position:</span>
                    <span className='basis-1/2'>{positionName}</span>
    
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12'>
                    <span className='basis-1/2 font-kdam '>Shop:</span>
                    <span className='basis-1/2'>{shopName}</span>
    
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className=' font-kdam basis-1/2'>Employment Starting Date:</span>
                    <span className='basis-1/2'>{employeeDate.substring(0,10)}</span>
                </div>
                    { /* <div className='flex flex-row h-12 items-center mt-24 justify-center'>
                    <button className='delete_button rounded-xl' onClick={deleteEmployeeByID}>
                        <span>Delete</span>
                    </button>
                    </div> */}
                    <div className='flex flex-row h-12 items-center mt-24 justify-center'>
                                <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                className="w-72 h-10"
                            >
                                Action
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                            <Link to={`/employee/profile/edit/${employeeId}`}>
                              <MenuItem className='w-72 h-10 text-center' onClick={()=>RedirectToEditUser()}>Edit Profile</MenuItem>
                            </Link>
                                <MenuItem className='w-72 h-10 text-center' onClick={handleClose}>Terminate/Resign</MenuItem>
                                <MenuItem className='w-72 h-10 text-center' onClick={deleteEmployeeByID}><span className='text-red-600'>Delete Employee Profile</span></MenuItem>
                            </Menu>
                           
                    </div>
                 </div>
           </div>
                
        }
        </>
       

  )
}

export default EmployeeDetail
