import React from 'react';
import { useState, useEffect } from 'react';
import './EmployeeLeaveTable.scss';
import { Link, useNavigate } from "react-router-dom";
import EmployeeService from '../../service/EmployeeService';
import { TbArrowsSort } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(1),
      },
    },
  }));


function EmployeeList() {
    const [userInfo, setuserInfo] = useState([]);
    const [employeeList, setemployeeList] = useState([]);
    const [totalNum, settotalNum] = useState("");
    const [totalPage, settotalPage] = useState("");
    const [currentPage, setcurrentPage] = useState("0");
    const [currentSize, setcurrentSize] = useState(10);
    const [sortField, setsortField] = useState("id");
    const [sortDir, setsortDir] = useState("asc");
    const [shopID, setshopID] = useState("1");
    const [ShopDropdown, setShopDropdown] = useState([]);
    const classes = useStyles();



    const navigation = useNavigate();


    // const handlePageChange = (event,page)=>{
    //     let seletedPage = page -1;
    //     console.log("the page is"+ seletedPage);
    //     setcurrentPage(seletedPage);
    //     EmployeeService.getAllEmployee(seletedPage ,currentSize,sortField,sortDir ).then((res)=>{
    //         setemployeeList(res.data.content);
    //         settotalNum(res.data.totalElements);
    //         settotalPage(res.data.totalPages);
    //         console.log(res.data);

    //     }).catch(error => {
    //         console.log(error);
    //     });

    // }

    const handlePageChange = (event,page)=>{
        let seletedPage = page -1;
        console.log("the page is"+ seletedPage);
        setcurrentPage(seletedPage);
        EmployeeService.getAllEmployeeByShopID( shopID, seletedPage ,currentSize,sortField,sortDir ).then((res)=>{
            setemployeeList(res.data.content);
            settotalNum(res.data.totalElements);
            settotalPage(res.data.totalPages);
            console.log(res.data);

        }).catch(error => {
            console.log(error);
        });

    }

    
    const getEmployeeListByDefault = () => {
        EmployeeService.getAllEmployeeByShopID( shopID, currentPage ,currentSize,sortField,sortDir ).then((res)=>{
            setemployeeList(res.data.content);
            settotalNum(res.data.totalElements);
            settotalPage(res.data.totalPages);
            console.log(res.data);

        }).catch(error => {
            console.log(error);
        });
    }

    const GetDropdwonList = ()=>{
        EmployeeService.getDropdownList().then((res)=>{
            setShopDropdown(res.data.shopList);
        }).catch((error) => {
            console.log(error);
        })
    }

    const getEmployeeListByShopID = (id) => {

        setshopID(id);
        EmployeeService.getAllEmployeeByShopID( shopID, currentPage ,currentSize,sortField,sortDir ).then((res)=>{
            setemployeeList(res.data.content);
            settotalNum(res.data.totalElements);
            settotalPage(res.data.totalPages);
            console.log(res.data);

        }).catch(error => {
            console.log(error);
        });
    }

   

      
    //   const getEmployeeFullList = () =>{
    //     EmployeeService.getAllEmployee(currentPage,currentSize,sortField,sortDir ).then((res)=>{
    //         setemployeeList(res.data.content);
    //         settotalNum(res.data.totalElements);
    //         settotalPage(res.data.totalPages);
    //         console.log(res.data);

    //     }).catch(error => {
    //         console.log(error);
    //     });
    //   }
   


    useEffect(() => {
        GetDropdwonList();
        getEmployeeListByShopID();
    }, [])

  return (
    <div>
        <div className='flex flex-row justify-center mb-8'>
             <h4 className='text-lg font-bold' >Employee List By Shop - it is showing</h4>
       </div>
       <div className='flex flex-row justify-start gap-8'>
            {
                ShopDropdown.map((shop, index)=>
                <div key={index} value={shop.id} className="flex justify-center border border-2 w-36 h-12 items-center px-4 cursor-pointer  hover:border-sky-800 hover:text-sky-800 rounded-lg"  onClick={(e)=>getEmployeeListByShopID(shop.id)}>
                         {shop.description}
                </div>
            )
            }

        </div>
       
        <table className='mt-8 table-auto border-collapse border border-slate-500 border-spacing-1 employee_table text-center '>
            <thead>
                <tr>
                     <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer ' >
                            <span>Active Status</span>
                        </div>                    
                    </th>
                    <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer ' >
                            <span>Employee</span>
                        </div>                    
                    </th>
                    
                     <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer ' >
                            <span>Shop</span>
                        </div>                    
                     </th>
                     <th className='border border-slate-500'>
                        <div className='flex flex-row justify-center hover:cursor-pointer ' >
                            <span>Leave Management</span>
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
                        <td className='font-openSans items-center'>{employee.staff_number +  " - " + employee.english_Surname + " " +employee.english_Given_Name}</td>
                     
          
                        <td className='font-openSans w-48'>{employee.shop.name}</td>
                        <td className='font-openSans'>
                            <Link to={`/employee/profile/${employee.id}/leave`}>
                                <button className='bg-sky-800 h-8 my-2 w-48 rounded-lg'>
                                    <span className=' text-white '>Leave Details</span>
                                </button>
                            </Link>
                            <Link to={`/employee/leave/${employee.id}/newRecord`}>
                                <button className='bg-teal-700 h-8 my-2 w-48 rounded-lg ml-12'>
                                    <span className=' text-white '>Apply New Leave</span>
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
             <span className='flex font-openSans '>The total of employee: <p className='text-sky-800 ml-4 underline'>{totalNum}</p></span>
        </div>
        <div className='flex flex-row justify-center mt-4 item-center mb-12 '>
                <div className={classes.root}>
                    <Pagination count={totalPage} variant="outlined" size="large" onChange={handlePageChange}  />
                </div>
        </div>
        
    </div>
  )
}

export default EmployeeList
