import React from 'react';
import { useState, useEffect } from 'react';
import './EmployeeList.scss';
import { Link, useNavigate } from "react-router-dom";
import EmployeeService from '../../service/EmployeeService';
import UserService from '../../service/UserService';


function EmployeeList() {
    const [userInfo, setuserInfo] = useState([]);
    const [employeeList, setemployeeList] = useState([]);

    const navigation = useNavigate();

    const RedirectToCreateNewUser = () => navigation("/createNewEmployee")



    useEffect(() => {
        EmployeeService.getAllEmployee().then((res)=>{
            setemployeeList(res.data);
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });

        
    }, [])

  return (
    <div>
       
        <div className='flex flex-row justify-between '>
             <h4 className='text-lg font-bold' >Company A - Employee List</h4>
            <button className='create_button rounded-xl ' onClick={(e)=> {
                RedirectToCreateNewUser(e)
            }}>
                <span>Create A New Employee</span>
            </button>
        </div>
        
        <table className='mt-12 table-auto border-collapse border border-slate-500 border-spacing-1 employee_table text-center'>
            <thead>
                <tr>
                    <th>Staff Number</th>
                    <th>Chinese Full Name</th>
                    <th>English Surname</th>
                    <th>English Given Name</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Shop</th>
                    <th>Profile</th>
                </tr>
            </thead>
            <tbody className=''>
               



                {   

                    employeeList.map(
                        (employee,index)=>
                        <tr className='table_record' key={index} >
                            <td>{employee.staff_number}</td>
                            <td>{employee.chinese_FullName}</td>
                            <td>{employee.english_Surname}</td>
                            <td>{employee.english_Given_Name}</td>
                            <td>{employee.department.name}</td>
                            <td>{employee.position.name}</td>
                            <td>{employee.shop.name}</td>
                            <td>
                                <Link to={`/employee/profile/${employee.id}`}>
                                    <button className='bg-sky-500 h-8 my-2 w-24 rounded-lg'>
                                        <span className=' text-white '>View</span>
                                    </button>
                                </Link>
                            </td>
                          
                        </tr>

                    )
                    
                    // <tr className='table_record'>
                    //     <td>T100012</td>
                    //     <td>中文字</td>
                    //     <td>Chan</td>
                    //     <td>Tai Man</td>
                    //     <td>HR/Admin</td>
                    //     <td>HR Assistant</td>
                    //     <td>Office</td>
                    //     <td>View</td>
                    // </tr>
  
                    
                    // playerList.map(
                    //     (player) => 
                    //     <tr className='table_record' key={player.id}>
                    //         <td>{player.fullName}</td>
                    //         <td>{player.squadNumber}</td>
                    //         <td>{player.age}</td>
                    //         <td>GK</td>
                    //         <td>Germany</td>
                    //         <td>
                    //             <Link to={`/profile/${player.id}`} >
                    //                 <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                    //                 font-medium rounded-full text-base h-8 w-20 focus:outline-none focus:border-none
                    //                 '   
                    //                  >View</button>
                    //             </Link>
                    //         </td>
                    //     </tr>
                    // )
                }

               
                    
            
            </tbody>
        </table>
    </div>
  )
}

export default EmployeeList
