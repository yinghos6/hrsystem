import React from 'react';
import './PayrollCalPage.scss';
import SideBar from '../../components/sidebar/SideBar';
import TopBar from '../../components/topbar/TopBar';
import PayrollCalculation from '../../components/PayrollCalculation/PayrollCalculation';

function PayrollCalPage() {
  return (
    <div className='flex flex-row h-full w-full ' >
        <div className='basis-1/5 '>
            <SideBar />
        </div>
        <div className='basis-4/5 flex flex-col'>
            <TopBar />
            <div className='mt-12 mx-24' >
                <PayrollCalculation />
            </div>
        </div>
    </div>
  )
}

export default PayrollCalPage;
