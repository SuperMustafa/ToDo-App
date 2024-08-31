import React, { useState } from 'react'
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'




export default function Register() {

let[apiError,setApiError]=useState()
let[loading,setLoading]=useState(false);
let navigate=useNavigate();

  async function handleRegister(values) {
    setLoading(true);
    await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
      .then((response) => {console.log(response);
        setLoading(false)
        navigate('/');
      })
      .catch((error) => {
        setLoading(false)
        setApiError(error.response.data.msg)}
      )
      setLoading(false)


  }

  let validationSchema = yup.object().shape({
    name: yup.string().min(3, 'Name must be over 3 chars').max(15, 'Name must be under or equal 15 chars').required('Name is requried'),
    email: yup.string().email('invalid Email').required('Email is requried'),
    password: yup.string().matches(/[A-Za-z0-9]{8,15}/, 'Password must be between 8 and 15 ').required('Password is requried'),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, 'invalid phone number').required('Phone number is requried')
  })


  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      age: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleRegister,
  })


  return (
    <>
      <div className="background w-full h-screen bg-emerald-700 flex justify-center items-center ">

        <div className="box w-3/4 flex flex-wrap  mx-auto  h-3/4">
          <div className="registerSide lg:w-1/2 sm:w-full  bg-emerald-400 rounded-s-xl    text-white flex flex-col justify-center items-center ">
            <h1 className='text-4xl font-bold'>WelCome Back !</h1>
            <p>To keep conected with us please login with your personal information</p>
            <button className='border-2 py-2 px-3 rounded-2xl my-2 hover:bg-white hover:text-green-400 transition-colors duration-300'><Link to={'/'}>Log in</Link> </button>
          </div>

          <div className="registerSide bg-white lg:w-1/2 sm:w-full rounded-e-xl flex flex-col justify-center items-center">
            <h1 className='text-4xl font-bold text-emerald-400 my-2'>Create Your Account</h1>
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
                <div className="nameInput">
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" id="name" className="outline-gray-700 p-2 rounded-2xl w-2/3 border-2 border-emerald-400 mt-3" placeholder="Your Name" />
                  {formik.errors.name&&formik.touched.name ? <div className="alert w-2/3 mx-auto bg-red-300  p-3 text-gray-700 rounded-xl text-center">{formik.errors.name}</div>
                  : null}
                </div>

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
                  <div className="ageInput">
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.age} type="number" id="age" className="outline-gray-700 p-2 rounded-2xl w-2/3 border-2 border-emerald-400 my-3" placeholder='Age' />

                  </div>

                  <div className="phoneInput">
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" className="outline-gray-700 p-2 rounded-2xl w-2/3 border-2 border-emerald-400 my-3" placeholder='Phone' />
                  {formik.errors.phone&&formik.touched.phone ? <div className="alert w-2/3 mx-auto bg-red-300  p-3 text-gray-700 rounded-xl text-center">{formik.errors.phone}</div>
                  : null}
                  </div>




                <button type='submit' className='w-2/3 p-2 border-2 border-emerald-400 rounded-2xl hover:bg-emerald-400 hover:text-white transition-colors duration-300 '>{loading?<i class="fa-solid fa-spinner fa-spin"></i>:"Register"}</button>

              </form>
            </div>

          </div>

        </div>

      </div>


    </>
  )
}
