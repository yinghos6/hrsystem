import React,{useState, useEffect} from 'react';
import './EmployeeForm.scss';
import { FaWpforms } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import EmployeeService from '../../service/EmployeeService';
import DatePicker from "react-datepicker";
import moment from 'moment';
import { Button, Result } from 'antd';





function EmployeeForm() {
    const [status, setstatus] = useState(false);
    const [ShopDropdown, setShopDropdown] = useState([]);
    const [PositionDropdown, setPositionDropdown] = useState([]);
    const [DepartmentDropdown, setDepartmentDropdown] = useState([]);
    const [employmentDate, setemploymentDate] = useState(null);
    const [successStatus, setsuccessStatus] = useState("");
    const [successMessage, setsuccessMessage] = useState("");

    const editedDate = moment(employmentDate).format("DD/MM/YYYY");

    //Employee Form Input Data
    const [staffNumber, setstaffNumber] = useState("");
    const [chiFullName, setchiFullNam] = useState("");
    const [engSurname, setengSurname] = useState("");
    const [engGivenname, setengGivenname] = useState("");
    const [departmentId, setdepartmentId] = useState("1");
    const [shopId, setshopId] = useState("1");
    const [positionId, setpositionId] = useState("1");

    const employeeData = {
        "staff_number":staffNumber,
        "chi_fullName":chiFullName,
        "eng_surname":engSurname,
        "eng_given_name":engGivenname,
        "employment_date":editedDate,
        "departmentId": departmentId,
        "shopId":shopId,
        "positionId":positionId
    }

    
    const createEmployee = (e)=>{
        e.preventDefault();

        EmployeeService.createNewEmployee(employeeData).then((res)=>{
            console.log(res.data)
            if(res.status = 200){
                setstatus(true);
                setsuccessStatus(res.data.status);
                setsuccessMessage(res.data.message);
            }else{
                console.log("The registration is not successfull");
            }
            
        }).catch(error=>{
            console.log(error)
        })


    }
           
        
    
    


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
        console.log(employeeData);
    }, []);


  return (
    <>
        {status?
            <div className='w-full'>
            <Result
            status="success"
            title={successMessage}
            subTitle={successStatus}
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
                  <input alt='username' className='input_item border-2  px-4 rounded-xl h-12 mr-24 basis-1/2' onChange={(e)=>setstaffNumber(e.target.value)} />
              </div>
              <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                  <span className='basis-1/2 font-kdam '>Chinese Fullname:</span>
                  <input alt='ch_fullname' className='input_item border-2 px-4 rounded-xl h-12 mr-24 basis-1/2' onChange={(e)=>setchiFullNam(e.target.value)} />
               </div>
               <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                  <span className='basis-1/2 font-kdam '>English Surname:</span>
                  <input alt='en_surname' className='input_item border-2 px-4 rounded-xl h-12 mr-24  basis-1/2' onChange={(e)=>setengSurname(e.target.value)}  />
               </div>
             
               <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                  <span className='basis-1/2 font-kdam '>English Given Name:</span>
                  <input alt='en_given_name' className='input_item basis-1/2 border-2 px-4  rounded-xl h-12 mr-24' onChange={(e)=>setengGivenname(e.target.value)} />
               </div>
               <div className='flex flex-row h-12 items-center mt-12 ml-12 '>
                  <span className='basis-1/2 font-kdam '>Department:</span>
                  <div className='basis-1/2'>
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
                  <span className='basis-1/2 font-kdam '>Position:</span>
                  <div className='basis-1/2'>
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
                  <span className='basis-1/2 font-kdam '>Shop:</span>
                  <div className='basis-1/2'>
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
                  <span className=' font-kdam basis-1/2'>Employment Starting Date:</span>
                  <DatePicker className='border h-12 w-72 rounded-md border-gray-300 px-8' dateFormat="dd/MM/yyyy" selected={employmentDate} onChange={(date) => setemploymentDate(date)} />
                      
  
               </div>
               <div className='flex flex-row h-12 items-center mt-24 justify-center'>
                  <button className='register_button rounded-xl' onClick={createEmployee}>
                      <span>Register</span>
                  </button>
               </div>
          </div>
          </div>
        
        }
        

    </>
  )
}

export default EmployeeForm
