import React from 'react';
import './CreateNewEmployee.scss';
import SideBar from '../../components/sidebar/SideBar';
import TopBar from '../../components/topbar/TopBar';
import EmployeeForm from '../../components/employeeForm/EmployeeForm';

function CreateNewEmployee() {
  return (
    <div className='flex flex-row h-full w-full ' >
        <div className='basis-1/5 '>
            <SideBar />
        </div>
        <div className='basis-4/5 flex flex-col'>
            <TopBar />
            <div className='mt-24 mx-24' >
                <EmployeeForm />
            </div>
        </div>
    </div>
  )
}

export default CreateNewEmployee
