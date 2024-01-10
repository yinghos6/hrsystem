import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {  Card,  Statistic  } from "antd";
import EmployeeService from '../../service/EmployeeService';
import { FaShop } from "react-icons/fa6";



function PayrollShopList() {
    const [ShopDropdown, setShopDropdown] = useState([]);


    const GetDropdwonList = ()=>{
        EmployeeService.getDropdownList().then((res)=>{
            setShopDropdown(res.data.shopList);
        }).catch((error) => {
            console.log(error);
        })
    }


    useEffect(() => {
        GetDropdwonList();
    }, [])


  return (
    <div>
        <div className='flex flex-row justify-center my-8'>
            <span className='font-bold text-lg'>Payroll Calculation</span>
        </div>
        <div className='flex flex-col ml-8 mr-36'>
            <div className='flex flex-row justify-start font-openSans '>
                <span className='underline'>Shop List</span>
            </div>
            {
                ShopDropdown.map((shop,index)=>
                    <div className='flex flex-row my-8' key={index} >
                        <Card bordered={true} className='w-full h-24 border-gray-400'>
                            <div className='flex flex-row justify-between'>
                                <div className='gap-3 flex ml-12 items-center'>
                                    <FaShop size={25} color='#187498' />
                                    <span className='text-lg  font-openSans text-cyan-800'>{shop.description}</span>
                                </div>
                                <Link to={`/payroll/detail/${shop.id}`} >
                                    <button className='border-2 border-gray-200 p-3 w-48 rounded-lg text-gray-400 hover:border-sky-500 hover:text-sky-500'>
                                        <span>Details</span>
                                     </button>
                                </Link>
                            
                            </div>
                        </Card>
                    </div>
                )
            }
           
        </div>
    </div>
  )
}

export default PayrollShopList;
