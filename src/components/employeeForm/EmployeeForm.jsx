import React,{useState, useEffect} from 'react';
import './EmployeeForm.scss';
import { FaWpforms } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from 'antd';
import { Select } from 'antd';
import "react-datepicker/dist/react-datepicker.css";
import EmployeeService from '../../service/EmployeeService';




function EmployeeForm() {
    const Option = Select.Option;
    const [selected, setSelected] = useState();
    const [ShopDropdown, setShopDropdown] = useState([]);
    const [PositionDropdown, setPositionDropdown] = useState([]);
    const [DepartmentDropdown, setDepartmentDropdown] = useState([]);


    //Employee Form Input Data
    const [staffNumber, setstaffNumber] = useState("");
    const [chiFullName, setchiFullNam] = useState("");
    const [engSurname, setengSurname] = useState("");
    const [engGivenname, setengGivenname] = useState("");
    const [departmentId, setdepartmentId] = useState("");
    const [shopId, setshopId] = useState("");
    const [positionId, setpositionId] = useState("");

    
    


    const GetDropdwonList = ()=>{
        EmployeeService.getDropdownList().then((res)=>{
            setShopDropdown(res.data.shopList);
            setPositionDropdown(res.data.positionList);
            setDepartmentDropdown(res.data.departmentList);
        }).catch((error) => {
            console.log(error);
        })
    }

    const navigation = useNavigate();

    const RedirectToCreateNewUser = () => navigation("/list")

    useEffect(() => {
        GetDropdwonList();
        
    }, []);


  return (
    <div className='w-full'>
        <div className='flex flex-row justify-between'>
            <h4 className='text-lg font-bold page_title tracking-wider underline py-4'  >Create New Employee</h4>
            <button className='back_button rounded-xl ' onClick={(e)=> {
                RedirectToCreateNewUser(e)
            }}>
                <span >Back To Employee List Page</span>
            </button>
        </div>
        <div className='flex flex-col mt-8 border-2	p-12 register_box mx-48'>
            <div className='flex flex-row items-center h-12 justify-center'>
                <FaWpforms size={30}/>
                <span  className='font-bold text-lg font-source3 ml-4'>Registration Form</span>
            </div>
            <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                <span className='basis-1/2 font-kdam '>Staff Number:</span>
                <input alt='username' className='input_item border-2  px-4 rounded-xl h-10 mr-24 basis-1/2' onChange={(e)=>setstaffNumber(e.target.value)} />
            </div>
            <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                <span className='basis-1/2 font-kdam '>Chinese Fullname:</span>
                <input alt='ch_fullname' className='input_item border-2 px-4 rounded-xl h-10 mr-24 basis-1/2' onChange={(e)=>setchiFullNam(e.target.value)} />
             </div>
             <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                <span className='basis-1/2 font-kdam '>English Surname:</span>
                <input alt='en_surname' className='input_item border-2 px-4 rounded-xl h-10 mr-24  basis-1/2' onChange={(e)=>setengSurname(e.target.value)}  />
             </div>
           
             <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                <span className='basis-1/2 font-kdam '>English Given Name:</span>
                <input alt='en_given_name' className='input_item basis-1/2 border-2 px-4  rounded-xl h-10 mr-24' onChange={(e)=>setengGivenname(e.target.value)} />
             </div>
             <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                <span className='basis-1/2 font-kdam '>Department:</span>
                <div className='basis-1/2'>
                    <Select showSearch style={{width:400, height:50}} placeholder="select department">
                        {
                            DepartmentDropdown.map((department, index)=>
                            <Option key={index}>{department.description}</Option>
                            
                            )
                        }
                        
                    </Select>
                </div>
             </div>
             <div className='flex flex-row h-12 items-center mt-12 ml-12'>
                <span className='basis-1/2 font-kdam '>Position:</span>
                <div className='basis-1/2'>
                    <Select showSearch style={{width:400, height:50}} placeholder="select position">
                        {
                            PositionDropdown.map((position, index)=>
                            <Option key={index}>{position.name}</Option>
                            
                            )
                        }
                    </Select>
                </div>
             </div>
             <div className='flex flex-row h-12 items-center mt-12 ml-12'>
                <span className='basis-1/2 font-kdam '>Shop:</span>
                <div className='basis-1/2'>
                    <Select showSearch style={{width:400, height:50}} placeholder="select shop">
                    {
                        ShopDropdown.map((shop, index)=>
                        <Option key={index}>{shop.description}</Option>
                        
                        )
                    }
                    </Select>
                </div>
             </div>
             <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                <span className=' font-kdam basis-1/2'>Employment Starting Date:</span>
                <DatePicker className='datepicker' onChange={selected} />
             </div>
             <div className='flex flex-row h-12 items-center mt-24 justify-center'>
                <button className='register_button rounded-xl'>
                    <span>Register</span>
                </button>
             </div>
        </div>
    </div>
  )
}

export default EmployeeForm
