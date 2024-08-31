import React from 'react'
import { Button, Modal } from "flowbite-react";
import { useState } from 'react';
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup';




export default function Note({note,remove,noteId,getNote}) {

  const [openModal, setOpenModal] = useState(false);


   async function updateNote(values){
    await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,values,{
      headers:{
        token:`3b8ny__${localStorage.getItem('Token')}`
      }
    }).then((response)=>{console.log(response)
      setOpenModal(false)
      getNote();
    }).catch((error)=>{console.log(error)
    })
   }


  let validationSchema = yup.object().shape({
    title: yup.string('please inter note Title').required('Title required'),
    content: yup.string('please inter note content').required('Content required')
  })
  
  
    let formik = useFormik({
      initialValues: {
        title: '',
        content: ''
  
      },
      validationSchema,
      onSubmit: updateNote
    })


  return (
  <>

  <div className="noteBox bg-slate-900 p-3 rounded-lg w-1/3 my-4 ">
  <h1 className='text-3xl text-slate-600 font-bold my-2'>{note.title}</h1>
    <p className=' text-white'>{note.content}</p>
    <div className="icons bg-slate-800 my-6 text-center">
    <i className="fa-solid fa-trash mx-2 text-red-500 text-2xl cursor-pointer" onClick={()=>{remove(note._id)}}></i>
    <i className="fa-solid fa-pen mx-2 text-green-400 text-2xl cursor-pointer" onClick={() => setOpenModal(true)}></i>
    </div>
  </div>

  
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header> <p className='text-emerald-600'>Update Note</p> </Modal.Header>
        <Modal.Body>
        <form onSubmit={formik.handleSubmit} className="space-y-6" >
           <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title} type="text" placeholder='Note Title' className='w-full rounded-lg my-5' id='title'/>
           <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.content} type="text" placeholder='Note Content' className='w-full rounded-lg my-5' id='content'/>
           
          </form>
        </Modal.Body>
        <Modal.Footer>
        <Button type='submit' className='bg-emerald-600 text-white' onClick={formik.handleSubmit}>Apply</Button>
      
        </Modal.Footer>
      </Modal>
  
  </>
  )
}
