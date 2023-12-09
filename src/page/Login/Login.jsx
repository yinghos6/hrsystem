import React from 'react';
import './Login.scss';
import { SiAlchemy } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import UserService from '../../service/UserService';





function Login() {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [buttonState, setbuttonState] = useState(false);
    const [loginFailed, setbloginFailed] = useState(false);


    const navigation = useNavigate();

    const redirectToRegister = () => navigation('/register');

    const login = (e)=>{
        e.preventDefault();

        const LoginDetails = {username, password};

        UserService.userLogin(LoginDetails).then((res)=>{
            console.log(res.data);
            if(res.status = 200){
                navigation('/list');
            }else{
                setbloginFailed(true);
            }
        }).catch(error=>{
            console.log(error);
            setbloginFailed(true);
        })

    }

    useEffect(() => {


      
    
    }, [])


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
                    <div className='flex flex-col mt-24'>
                           
                                 <div className='flex items-center mt-3 justify-center ml-12'>
                                    <span className='mr-5 login_description' >-</span>
                                    <p className='text-lg font-source3 tracking-wider login_description uppercase'>Login Account</p>
                                    <span className='ml-5 login_description' >-</span>
                                 </div>   
                                <div className='flex flex-col mt-8 '>
                                  <form>
                                
                                  
                                        <div className='flex justify-center h-12'>
                                            <input alt='username' type='text' className='focus:border-sky-600 outline-none outline-1 border-collapse border-b-4 p-3 w-96' placeholder='Username' 
                                            onChange={(e)=>setusername(e.target.value)}
                                            />
                                        </div>

                                        <div className='flex justify-center mt-8 h-12'>
                                            <input alt='password' type='password' className='focus:border-sky-600  outline-none border-collapse border-b-4 p-3 w-96' placeholder='Password' 
                                            onChange={(e)=>setpassword(e.target.value)}
                                            />
                                        </div>
                         
                                    
                                    <div  className='flex justify-center mt-12'>
                                        <button className='bg-sky-700 h-12 w-96 cursor-pointer hover:bg-sky-800 rounded-md' type='submit' onClick={login} >
                                            <span className='uppercase font-kdam text-white'>
                                                Login
                                            </span>
                                        </button>
                                    </div>

                                    {loginFailed?(
                                        <div className='flex justify-center mt-8 '>
                                            <span className=' font-bold border border-gray-300 px-8 py-4 text-red-600'>
                                                The username or password is incorrect!
                                            </span>
                                         </div>
                                    ):null}
                                   
                                      </form>
                                    <div className='flex justify-end mr-12 mt-12 gap-2'>
                                        <span className='tracking-wider font-thin'>Don't have an account?</span>
                                        <button className='' onClick={redirectToRegister} >
                                            <span className='uppercase font-bold underline cursor-pointer'>
                                                Sign up
                                            </span>
                                        </button>
                                    </div>
                                 

                                  

                                </div>
                    </div>
                </div>
        </div>
    </div>
       
  )
}

export default Login
