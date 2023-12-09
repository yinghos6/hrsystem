import React from 'react';
import './TopBar.scss';
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";


function TopBar() {
    
  return (
    <nav className='flex topbar mx-24 mt-12 justify-end'>

        <div className='flex flex-row gap-8 items-start'>
             <IoIosHelpCircleOutline size={25} className="cursor-pointer" />
             <IoNotificationsOutline size={25} className="cursor-pointer" />
        </div>
    </nav>
  )
}

export default TopBar;

