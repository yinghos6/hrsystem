import './EmployeeEdit.scss';
import React,{useState, useEffect} from 'react';
import { useNavigate,useParams } from "react-router-dom";
import EmployeeService from '../../service/EmployeeService';
import { Button, Result } from 'antd';
import {UserDeleteOutlined} from '@ant-design/icons';
import DatePicker from "react-datepicker";
import moment from 'moment';





function EmployeeEdit() {
    const{id} = useParams();

    //result response
    const [status, setstatus] = useState(false);
    const [updateStatus, setupdateStatus] = useState("");
    const [updateMessage, setupdateMessage] = useState("");

    //origin value
    const [employeeInfo, setemployeeInfo] = useState([]);
    const [employeeId, setemployeeId] = useState("");
    const [departmentName, setdepartmentName] = useState("");
    const [positionName, setpositionName] = useState("");
    const [shopName, setshopName] = useState("");
    const [employeeDate, setemployeeDate] = useState("");
 

    //dropdown list item
    const [ShopDropdown, setShopDropdown] = useState([]);
    const [PositionDropdown, setPositionDropdown] = useState([]);
    const [DepartmentDropdown, setDepartmentDropdown] = useState([]);

    //edited profile input data
    const [newStaffNumber, setnewStaffNumber] = useState();
    const [newChiFullname, setnewChiFullname] = useState();
    const [newEngSurname, setnewEngSurname] = useState();
    const [newEngGivenname, setnewEngGivenname] = useState();
    const [departmentId, setdepartmentId] = useState("1");
    const [shopId, setshopId] = useState("1");
    const [positionId, setpositionId] = useState("1");
    const [employmentDate, setemploymentDate] = useState(null);



    const editedDate = moment(employmentDate).format("DD/MM/YYYY");


    const updatedEmployeeData = {
        "edited_employee_id":employeeId,
        "edited_staff_number":newStaffNumber,
        "edited_chi_fullName":newChiFullname,
        "edited_eng_surname":newEngSurname,
        "edited_given_name":newEngGivenname,
        "edited_employment_date":editedDate,
        "edited_departmentId": departmentId,
        "edited_shopId":shopId,
        "pedited_shopId":positionId
    }

    const navigation = useNavigate();

    const RedirectToCreateNewUser = () => navigation("/list")
    const GoBackToPreviousPage = ()=> navigation(-2)

    const GetDropdwonList = ()=>{
        EmployeeService.getDropdownList().then((res)=>{
            setShopDropdown(res.data.shopList);
            setPositionDropdown(res.data.positionList);
            setDepartmentDropdown(res.data.departmentList);
        }).catch((error) => {
            console.log(error);
        })
    }

    const GetUserProfile = () => {
        EmployeeService.getEmployeeById(id).then((res)=>{
            console.log(res.data);
            setemployeeInfo(res.data);
            setdepartmentName(res.data.department.name);
            setpositionName(res.data.position.name);
            setshopName(res.data.shop.name);
            setemployeeDate(res.data.employment_date);
            setemployeeId(res.data.id);
            setnewStaffNumber(res.data.staff_number);
            setnewChiFullname(res.data.chinese_FullName);
            setnewEngSurname(res.data.english_Surname);
            setnewEngGivenname(res.data.english_Given_Name);
            
        }).catch(error=>{
            console.log(error);
        })
    }

    const editPorfile = () =>{
        EmployeeService.editEmployeeProfile(updatedEmployeeData).then((res)=>{
            console.log(res.data);
            setstatus(true);
            setupdateStatus(res.status);
            setupdateMessage(res.message);
        }).catch(error=>{
            console.log(error);
        })
    }



    useEffect(() => {
        GetDropdwonList();
        GetUserProfile();
  
    }, []);

  return (
    <>
            {status?
                <div className='w-full'>
                <Result
                icon={<UserDeleteOutlined  />}
                title={updateStatus}
                subTitle={updateMessage}
                
                extra={[
                  <Button key="button"  onClick={(e)=> {
                    RedirectToCreateNewUser(e)
                }} >Back to Employee List Page</Button>,
                ]}
              />
                </div>
            :
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
                    <span className='basis-1/3 font-kdam '>Staff Number:</span>
                    <span className='basis-1/3'>{employeeInfo.staff_number}</span>
                    <div className='basis-1/3'>
                        <input className='border border-2 border-gray-400 rounded-lg w-72 h-10 px-8' defaultValue={employeeInfo.staff_number} onChange={(e)=>setnewStaffNumber(e.target.value)}  />
                    </div>

                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/3 font-kdam '>Chinese Fullname:</span>
                    <span className='basis-1/3'>{employeeInfo.chinese_FullName}</span>
                    <div className='basis-1/3'>
                        <input className='border border-2 border-gray-400 rounded-lg w-72 h-10 px-8' defaultValue={employeeInfo.chinese_FullName} onChange={(e)=>setnewChiFullname(e.target.value)}  ></input>
                    </div>
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/3 font-kdam '>English Surname:</span>
                    <span className='basis-1/3'>{employeeInfo.english_Surname}</span>
                    <div className='basis-1/3'>
                        <input className='border border-2 border-gray-400 rounded-lg w-72 h-10 px-8' defaultValue={employeeInfo.english_Surname} onChange={(e)=>setnewEngSurname(e.target.value)}  ></input>
                    </div>
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/3 font-kdam '>English Given Name:</span>
                    <span className='basis-1/3'>{employeeInfo.english_Given_Name}</span>
                    <div className='basis-1/3'>
                        <input className='border border-2 border-gray-400 rounded-lg w-72 h-10 px-8' defaultValue={employeeInfo.english_Given_Name} onChange={(e)=>setnewEngGivenname(e.target.value)}  ></input>
                    </div>
                </div>
               
                <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                    <span className='basis-1/3 font-kdam '>Department:</span>
                    <span className='basis-1/3'>{departmentName}</span>
                    <div className='basis-1/3'>
                            <select onChange={(e)=>setdepartmentId(e.target.value)} className="w-72 h-12 border border-gray-300 px-8 rounded-md" >
                            {
                            DepartmentDropdown.map((department, index)=>
                                <option key={index} value={department.id} >
                                    {department.description}
                                </option>
                            )
                            }
                        </select>
                    </div>
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12'>
                    <span className='basis-1/3 font-kdam '>Position:</span>
                    <span className='basis-1/3'>{positionName}</span>
                    <div className='basis-1/3' > 
                        <select onChange={(e)=>setpositionId(e.target.value)} className="w-72 h-12 border border-gray-300 px-8 rounded-md" >
                        {
                            PositionDropdown.map((position, index)=>
                                <option key={index} value={position.id} >
                                    {position.description}
                                </option>
                            )
                        }
                    </select>
                    </div>
    
                </div>
                <div className='flex flex-row h-12 items-center mt-12 ml-12'>
                    <span className='basis-1/3 font-kdam '>Shop:</span>
                    <span className='basis-1/3'>{shopName}</span>
                    <div className='basis-1/3'>
                            <select onChange={(e)=>setshopId(e.target.value)} className="w-72 h-12 border border-gray-300 px-8 rounded-md" >
                            {
                                ShopDropdown.map((shop, index)=>
                                <option key={index} value={shop.id} >
                                    {shop.description}
                                </option>
                            )
                            }
                        </select>
                    </div>
                </div>
                    <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                        <span className=' font-kdam basis-1/3'>Employment Starting Date:</span>
                        <span className='basis-1/3'>{employeeDate.substring(0,10)}</span>
                        <div className='basis-1/3' >
                         <DatePicker className='border h-12 w-72 rounded-md border-gray-300 px-8' dateFormat="dd/MM/yyyy" selected={employmentDate} onChange={(date) => setemploymentDate(date)} />
                        </div>
                    </div>
                    { /* <div className='flex flex-row h-12 items-center mt-24 justify-center'>
                    <button className='delete_button rounded-xl' onClick={deleteEmployeeByID}>
                        <span>Delete</span>
                    </button>
                    </div> */}
                    <div className='flex flex-row h-12 items-center mt-24 justify-center gap-36'>
                           
                           <button className='border-2 border-gray-400 h-12 w-36 rounded-md hover:border-blue-600 hover:text-blue-600' onClick={()=>GoBackToPreviousPage()}>
                                <span>Cancel</span>
                           </button>
                           <button className='border-2  border-gray-400 h-12 w-36 rounded-md hover:border-blue-600 hover:text-blue-600' onClick={()=>editPorfile()} >
                                <span>Update</span>
                           </button>
                    </div>
                 </div>
           </div>
                
        }
        </>
  )
}

export default EmployeeEdit;
