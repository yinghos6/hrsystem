import React from 'react';
import { useState, useEffect } from 'react';
import './EmployeeList.scss';
import { Link, useNavigate } from "react-router-dom";
import EmployeeService from '../../service/EmployeeService';
import { TbArrowsSort } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";



function EmployeeList() {
    const [userInfo, setuserInfo] = useState([]);
    const [employeeList, setemployeeList] = useState([]);
    const [totalNum, settotalNum] = useState("");
    const [totalPage, settotalPage] = useState("");
    const [currentPage, setcurrentPage] = useState(0);
    const [currentSize, setcurrentSize] = useState(20);



    const navigation = useNavigate();

    const RedirectToCreateNewUser = () => navigation("/createNewEmployee")


    const refreshList = (event) =>{
        setcurrentPage(event.selected);
        console.log("current page is" + event.selected);
        getEmployeeFullList();
    }

   
      
      const getEmployeeFullList = () =>{
        EmployeeService.getAllEmployee(currentPage,currentSize).then((res)=>{
            setemployeeList(res.data.content);
            settotalNum(res.data.totalElements);
            settotalPage(res.data.totalPages);
            console.log(res.data);

        }).catch(error => {
            console.log(error);
        });
      }


    useEffect(() => {
        getEmployeeFullList();
        
    }, [])

  return (
    <div>
        <div className='flex flex-row justify-center'>
             <h4 className='text-lg font-bold' >Company A - Employee List</h4>
       </div>
        <div className='flex flex-row justify-between items-center '>
            <div className='flex flex-row gap-4 items-center'>
                <span>Keyword Filter:</span>
                <input className='h-8 w-64 px-4 border border-gray-700 rounded-lg'  />
                <button className=' bg-sky-600 h-8 w-8 rounded-2xl hover:bg-sky-400  '>
                    <IoSearchSharp color='white' className='mx-2'/>
                </button>
            </div>
            
            <button className='create_button rounded-xl ' onClick={(e)=> {
                RedirectToCreateNewUser(e)
            }}>
                <span>Create A New Employee</span>
            </button>
        </div>
        
        <table className='mt-8 table-fixed border-collapse border border-slate-500 border-spacing-1 employee_table text-center '>
            <thead>
                <tr>
                     <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer gap-4' >
                            <span>Active Status</span>
                            <TbArrowsSort />
                        </div>                    
                    </th>
                    <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer gap-4' >
                            <span>Staff Number</span>
                            <TbArrowsSort />
                        </div>                    
                    </th>
                    <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer gap-4' >
                            <span>Chinese FullName</span>
                            <TbArrowsSort />
                        </div>                    
                     </th>
                     <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer gap-4' >
                            <span>English Surname</span>
                            <TbArrowsSort />
                        </div>                    
                    </th>
                    <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer gap-4' >
                            <span>English GivenName</span>
                            <TbArrowsSort />
                        </div>                    
                    </th>
                    <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer gap-4' >
                            <span>Department</span>
                            <TbArrowsSort />
                        </div>                    
                    </th>
                    <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer gap-4' >
                            <span>Position</span>
                            <TbArrowsSort />
                        </div>                    
                     </th>
                     <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer gap-4' >
                            <span>Shop</span>
                            <TbArrowsSort />
                        </div>                    
                     </th>
                     <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer gap-4' >
                            <span>Profile</span>
                        </div>                    
                    </th>
                </tr>
            </thead>
            <tbody className=''>
               



                {   

                    employeeList.map(
                        (employee,index)=>
                        <tr  className={employee.active_Status?'table_record green_text':'table_record red_text'}  key={index} >
                            <td >
                                {employee.active_Status?<span className='green_dot' />:<span className='red_dot' />}</td>
                            <td className='font-openSans'>{employee.staff_number}</td>
                            <td className='font-openSans'>{employee.chinese_FullName}</td>
                            <td className='font-openSans'>{employee.english_Surname}</td>
                            <td className='font-openSans'>{employee.english_Given_Name}</td>
                            <td className='font-openSans'>{employee.department.name}</td>
                            <td className='font-openSans'>{employee.position.name}</td>
                            <td className='font-openSans'>{employee.shop.name}</td>
                            <td className='font-openSans'>
                                <Link to={`/employee/profile/${employee.id}`}>
                                    <button className='bg-sky-600 h-8 my-2 w-24 rounded-lg'>
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
        <div className='flex flex-row justify-center mt-8 '>
             <span className='flex font-openSans '>The total of employee: <p className='text-sky-800 ml-4'>{totalNum}</p></span>
        </div>
        <div className='flex flex-row justify-center mt-4 item-center'>
        <ReactPaginate className='flex gap-4'
        containerClassName='pagination'
        pageCount={totalPage}
        onPageChange={refreshList}
        breakLabel="..."
        pageRangeDisplayed={5}
        previousLabel={
            <AiFillLeftCircle size={25} className="mr-2" />
        }
        nextLabel={
            <AiFillRightCircle size={25} className="ml-2" />
        }
        />
        </div>
        
    </div>
  )
}

export default EmployeeList
