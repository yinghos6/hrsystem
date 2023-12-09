import React,{useState, useEffect} from 'react';
import { useNavigate,useParams } from "react-router-dom";
import EmployeeService from '../../service/EmployeeService';
import './EmployeeDetail.scss';



function EmployeeDetail() {
    const{id} = useParams();


    const [employeeInfo, setemployeeInfo] = useState([]);
    const [departmentName, setdepartmentName] = useState("");
    const [positionName, setpositionName] = useState("");
    const [shopName, setshopName] = useState("");
    const [employeeDate, setemployeeDate] = useState("");


    const navigation = useNavigate();

    const RedirectToCreateNewUser = () => navigation("/list")



    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res)=>{
            console.log(res.data);
            setemployeeInfo(res.data);
            setdepartmentName(res.data.department.name);
            setpositionName(res.data.position.name);
            setshopName(res.data.shop.name);
            setemployeeDate(res.data.employment_date);
            
        }).catch(error=>{
            console.log(error);
        })
  
    }, []);


  return (
    
        <div className='w-full'>
      
        <div className='flex flex-row justify-between'>
            <h4 className='text-lg font-bold page_title tracking-wider underline py-4'  >Employee Details</h4>
            <button className='back_button rounded-xl ' onClick={(e)=> {
                RedirectToCreateNewUser(e)
            }}>
                <span >Back To Employee List Page</span>
            </button>
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
            <div className='flex flex-row h-12 items-center mt-24 justify-center'>
                <button className='delete_button rounded-xl'>
                    <span>Delete</span>
                </button>
            </div>
        </div>
    </div>

  )
}

export default EmployeeDetail
