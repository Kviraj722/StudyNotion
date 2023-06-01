import { useState } from 'react'
import {AiFillEyeInvisible,AiOutlineEye} from "react-icons/ai"
import {Link,useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { login } from '../../../services/operations/authAPI'



const LogInForm = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  

    const [formData,setFormData]=useState({
        email:"",password:""
    })

    const[showPassword,setShowPassword]=useState(false);

    const changeHandler=(event)=>{
          setFormData((prevdata)=>(
            {
                ...prevdata,
                [event.target.name]:event.target.value,
            }

          ))  
    }
    const {email,password}=formData;

    const submithandler=(event)=>{
      event.preventDefault();
      dispatch(login(email,password,navigate))
    }
  return (
    <form className='flex flex-col w-full gap-y-4 mt-6' onSubmit={submithandler} >
            
            
     
       <label className='w-full '> 
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
         Email Address
          <sup className='text-[#EF476F]'> *</sup>
         </p>
         <br/>

        <input
            required
            value={email}
            placeholder='Enter Your Email'
            name="email"
            type="email"
            onChange={changeHandler}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4 outline-none'
        />
       </label>
       
       <label className='w-full relative'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'> Password
         <sup className='text-[#EF476F]'> *</sup> </p>
        <br></br>
        <input
            required
            value={password}
            placeholder='Enter Password'
            name="password"
            type={showPassword ? ("text") : ("password")}
            onChange={changeHandler}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4 outline-none'

        
       />
         <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute left-[90%] right-1/3 top-[52%] bottom-1/3 cursor-pointer text-richblack-5'>
            {showPassword ? (<AiFillEyeInvisible/>) :(<AiOutlineEye/>) }
        </span>
       
        <Link to="#">
                <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                    Forgot Password
                </p>
            </Link>
       </label>
        
       <button 
        type='submit'
       class="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
         Sign In
        </button>
    </form>
  )
}

export default LogInForm