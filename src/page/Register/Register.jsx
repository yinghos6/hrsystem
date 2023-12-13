import React, {useState, useEffect} from 'react';
import './Register.scss';
import { SiAlchemy } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import UserService from '../../service/UserService';



function Register() {



    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [status, setstatus] = useState(false);
    const [usernameValid, setusernameValid] = useState(false);
    const [passwordValid, setpasswordValid] = useState(false);


    const navigation = useNavigate();

     
    const registerNewUser = (e)=> {
        e.preventDefault();

        const user = {username, password, email}

        UserService.registerNewUSer(user).then((res)=>{
            console.log(res.data)
            setusername("");
            setemail("");
            setpassword("");
            setstatus(true);

        }).catch(error => {
            console.log(error)
        })

        
    }

    useEffect(() => {
        console.log(status);
        if(username.length > 5){
            setusernameValid = true
        }

    }, [status])




    const redirectToLogin = () => navigation('/login');


  return (
        <div className='w-full login_page '>
        <div className='box_login flex flex-row rounded-md'>
                    <div className='basis-1/2 box_section '>
                    <div className='flex items-center justify-center gap-5 my-8 mt-64 '>
                    <div>
                        <SiAlchemy className="logo" color='black' />
                    </div>
                    <div>
                        <span className='font-kdam text-lg tracking-wider'>HR System Admin Portal- Demo</span>
                    </div>
                    </div>
                </div>
                <div className='basis-1/2 box_section mr-12'>
                    <div className='flex flex-col mt-12'>
                        
                                <div className='flex items-center mt-3 justify-center ml-8'>
                                    <span className='mr-5 login_description' >-</span>
                                    <p className='text-lg font-source3 tracking-wider login_description uppercase'>Register New Account</p>
                                    <span className='ml-5 login_description' >-</span>
                                </div>   
                                <div className='flex flex-col mt-8 '>

                                {status?
                                        <div>
                                            <div className=' flex justify-center mt-12'>

                                                <span className='ml-5'>The user is created successfully!</span>
                                            </div>
                                            <div  className='flex justify-center mt-12'>
                                                <button className='bg-sky-700 h-12 w-96 cursor-pointer hover:bg-sky-800 rounded-md' onClick={redirectToLogin} >
                                                    <span className='tracking-wider  font-kdam text-white' >
                                                        Back to login page
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <form>
                                            <div className='flex justify-center h-12'>
                                                <input alt='username' type='text' className='focus:border-sky-600 outline-none outline-1 border-collapse border-b-4 p-3 w-96' placeholder='Enter Username' onChange={(e)=>{setusername(e.target.value)}} />
                                            </div>
                                            {usernameValid?(
                                                <div className='flex justify-center text-gray-400 text-sm mt-2'>
                                                    <span>- Username must contain at least 6 characters</span>
                                                </div>
                                            ):(
                                                <div className='flex justify-center text-red-600 text-sm mt-2'>
                                                     <span>- Username must contain at least 6 characters</span>
                                                </div>
                                            )}
                                            
                                            <div className='flex justify-center mt-8 h-12'>
                                                <input alt='password' type='password' className='focus:border-sky-600  outline-none border-collapse border-b-4 p-3 w-96' placeholder='Enter Password' onChange={(e)=>{setpassword(e.target.value)}} />
                                            </div>
                                            {passwordValid?(
                                                <div className='flex justify-center text-gray-400 text-sm mt-2'>
                                                     <span>- Password must contain at least 6 characters</span>
                                                </div>
                                            ):(
                                                <div className='flex justify-center text-red-600 text-sm mt-2'>
                                                     <span>- Password must contain at least 6 characters</span>
                                                </div>
                                            )}
                                           

                                            <div className='flex justify-center mt-8 h-12'>
                                            <input alt='email' type='text' className='focus:border-sky-600  outline-none border-collapse border-b-4 p-3 w-96' placeholder='Enter Your Email'  onChange={(e)=>{setemail(e.target.value)}} />
                                            </div>
                            
                                            
                                            <div  className='flex justify-center mt-12'>
                                                <button className='bg-sky-700 h-12 w-96 cursor-pointer hover:bg-sky-800 rounded-md' onClick={(e)=>registerNewUser(e)}>
                                                    <span className='uppercase font-kdam text-white'>
                                                        Register
                                                    </span>
                                                </button>
                                            </div>
                                            <div className='flex justify-end mr-12 mt-5 gap-2'>
                                                <span className='tracking-wider font-thin'>Already have account?</span>
                                                <button className='disabled' onClick={redirectToLogin}>
                                                    <span className='uppercase font-bold underline cursor-pointer'>
                                                        Login
                                                    </span>
                                                </button>
                                            </div>
                                        </form>

                                }


                                
                                    
                              



                                   
                                </div>
                    </div>
                </div>
        </div>
     </div>
  )
}

export default Register
