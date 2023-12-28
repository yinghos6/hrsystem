import React from 'react';
import SideBar from '../../components/sidebar/SideBar';
import TopBar from '../../components/topbar/TopBar';
import EmployeeLeaveDetail from '../../components/EmployeeLeaveDetail/EmployeeLeaveDetail';



function PersonalProfileLeave() {
  return (
    <div className='flex flex-row h-full w-full ' >
        <div className='basis-1/5 '>
            <SideBar />
        </div>
        <div className='basis-4/5 flex flex-col'>
            <TopBar />
            <div className='mt-24 mx-24' >
                <EmployeeLeaveDetail />
            </div>
        </div>
    </div>
  )
}

export default PersonalProfileLeave;

