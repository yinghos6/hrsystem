import React from 'react';
import './SideBar.scss';
import { SiAlchemy } from "react-icons/si";
import { IoPeople } from "react-icons/io5";
import { SiAwsorganizations } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
import { SiCashapp } from "react-icons/si";
import { BsListNested } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";








function SideBar() {

    const navigation = useNavigate();

    const RedirectToCreateNewUser = () => navigation("/list")

    const RedirectToLeaveList = () => navigation("/leave/list")

    const RedirectToDashboard = () => navigation("/dashboard")

    const RedirectToPayroll = () => navigation("/payroll")

    const logout = () => {
        localStorage.removeItem("user");
        navigation('/login');
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.username; 
    const userRoles = user.roles;
    const userRolesEdited = userRoles.toString().substring(5,11);

  return (
    <div>
    
    <div className='flex flex-col sidebar'>
        <div className='flex gap-5 home_logo my-8 ml-12'>
            <div>
                <SiAlchemy className="logo" color='white' />
            </div>
            <div>
                <span className='font-kdam text-lg tracking-wider'>HR System - Demo</span>
            </div>
            
        </div>
        <div className='mx-24 mt-8 flex flex-col '>
            <span>User:<q>{username}</q> </span>
            <span className='mt-2'>Role:<q>{userRolesEdited}</q> </span>
        </div>
        <div className='flex flex-col justify-between left_sidebar '>
            <div className='flex flex-col mx-5 mt-24 my-5 list-none font-source3 h-full'>
                <div className='navitem flex flex-row items-center gap-8 ' onClick={()=>RedirectToDashboard()} >
                     <MdOutlineDashboard color='white' size={30} className="nav_icon" />
                    <li className='tracking-wider'>Dashboard</li>
                </div>
                <div className='navitem flex flex-row items-center gap-8 ' onClick={()=>RedirectToCreateNewUser()}>
                    <IoPeople color='white' size={30} />
                    <li className='tracking-wider'  >Employee List</li>
                </div>
             
                <div className='navitem flex flex-row items-center gap-8' onClick={()=>RedirectToLeaveList()} >
                     <SlCalender color='white' size={30} />
                    <li className='tracking-wider'>Leave</li>
                </div>
                <div className='navitem flex flex-row items-center gap-8' onClick={()=>RedirectToPayroll()} >
                    <SiCashapp color='white' size={30}  />
                    <li className='tracking-wider'>Payroll</li>
                </div>
               
             </div>
            <div className='flex flex-col gap-1 mx-5 list-none mb-24'>
                <div className='navitem flex flex-row items-center gap-8' onClick={logout} >
                     <CiLogout color='white' size={30}  />
                    <li className='text-lg tracking-wider'>Logout</li>
                </div>
            </div>
         </div>
        
        
        </div>

       </div>
  )
}

export default SideBar
