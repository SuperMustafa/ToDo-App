import React, { useState } from 'react'
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'

import axios from 'axios'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import {  useNavigate } from 'react-router-dom'
import * as yup from 'yup';





export default function Login() {

  
let[apiError,setApiError]=useState()
let[loading,setLoading]=useState(false);
let navigate=useNavigate();

async function handleLogin(values) {
  setLoading(true);
  await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
    .then((response) => {console.log(response);
      if(response.data.msg==='done'){
        localStorage.setItem('Token',response.data.token)
      }
      setLoading(false)
      navigate('Home');
    })
    .catch((error) => {
      setLoading(false)
      setApiError(error.response.data.msg)}
    )
    setLoading(false)


}

let validationSchema = yup.object().shape({
  email: yup.string().email('invalid Email').required('Email is requried'),
  password: yup.string().matches(/[A-Za-z0-9]{8,15}/, 'Password must be between 8 and 15 ').required('Password is requried'),
})


  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''

    },
    validationSchema,
    onSubmit: handleLogin,
  })


  return (<>
    <div className="background w-full h-screen bg-emerald-700 flex justify-center items-center ">

      <div className="box w-3/4 flex flex-wrap  mx-auto  h-3/4">
        <div className="registerSide lg:w-1/2 sm:w-full  bg-emerald-400 rounded-s-xl    text-white flex flex-col justify-center items-center ">
          <h1 className='text-4xl font-bold'>WelCome Back !</h1>
          <p>if yoy are not joined to us please Register now</p>
          <button className='border-2 py-2 px-3 rounded-2xl my-2 hover:bg-white hover:text-green-400 transition-colors duration-300'><Link to={'Register'}>Register</Link> </button>
        </div>

        <div className="loginSide bg-white lg:w-1/2 sm:w-full rounded-e-xl flex flex-col justify-center items-center">
          <h1 className='text-4xl font-bold text-emerald-400 my-2'>Login Now</h1>
          <div className="social-Icons flex">
            <div className="circle cursor-pointer border-2 border-emerald-400 w-10 h-10 rounded-full flex justify-center items-center mx-2 hover:bg-emerald-400 transition-colors duration-300 group">
              <i className="fa-brands fa-facebook-f group-hover:text-white transition-colors duration-300"></i>
            </div>
            <div className="circle cursor-pointer border-2 border-emerald-400 w-10 h-10 rounded-full flex justify-center items-center mx-2  hover:bg-emerald-400 transition-colors duration-300 group">
              <i className="fa-brands fa-twitter group-hover:text-white transition-colors duration-300"></i>
            </div>
            <div className="circle cursor-pointer border-2 border-emerald-400 w-10 h-10 rounded-full flex justify-center items-center mx-2  hover:bg-emerald-400 transition-colors duration-300 group">
              <i className="fa-brands fa-google group-hover:text-white transition-colors duration-300"></i>
            </div>
          </div>


          <div className="formInputs my-4 w-full text-center">
          {apiError?<p className='text-3xl text-red-400 font-bold'>{apiError}</p>:null}



            <form onSubmit={formik.handleSubmit}>


            <div className="emailInput">
                <input onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.email} type="email" id="email" className="outline-gray-700 p-2 rounded-2xl w-2/3 border-2 border-emerald-400 my-3" placeholder="Your Email" />
                {formik.errors.email&&formik.touched.email ? <div className="alert w-2/3 mx-auto bg-red-300 p-3 text-gray-700 rounded-xl text-center">{formik.errors.email}</div>
                  : null}
                </div>

                <div className="passwordIput">
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id="password" className="outline-gray-700 p-2 rounded-2xl w-2/3 border-2 border-emerald-400 my-3" placeholder='Password' />
                  {formik.errors.password&&formik.touched.password ? <div className="alert w-2/3 mx-auto bg-red-300  p-3 text-gray-700 rounded-xl text-center">{formik.errors.password}</div>
                  : null}
                  </div>

                  <button type='submit' className='w-2/3 p-2 border-2 border-emerald-400 rounded-2xl hover:bg-emerald-400 hover:text-white transition-colors duration-300 '>{loading?<i className="fa-solid fa-spinner fa-spin"></i>:"Login"}</button>

            </form>

          </div>

        </div>

      </div>

    </div>


  </>
  )
}
