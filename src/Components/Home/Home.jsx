import React, { useEffect, useState } from 'react'
import { Button, Modal } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup';
import Note from '../Notes/Note';



export default function Home() {
  let navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [notes, setnotes] = useState([]);
  const [notesLength, setnotesLength] = useState()



  function logOut(){
  navigate('/');
  localStorage.removeItem('Token');
  }


  async function addNote(values){
    await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,values,{
      headers:{
        token:`3b8ny__${localStorage.getItem('Token')}`
      }
    }).then((response)=>{console.log(response)
      setOpenModal(false)
      getNote()
      setnotesLength(response.data.notes.length)
    })
      .catch((error)=>{console.log(error)
        setOpenModal(false)
      }
      )
  }
  async function getNote(){
    await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{
      headers:{
        token:`3b8ny__${localStorage.getItem('Token')}`
      }
    }).then((response)=>{console.log(response)
     setnotes(response.data.notes)
     setnotesLength(response.data.notes.length)
    })
      .catch((error)=>{console.log(error)
        setnotesLength(0);
        
      }
      )
  }

  async function deleteNote(noteId){
   await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,{
    headers:{
        token:`3b8ny__${localStorage.getItem('Token')}`
    }
   }).then((response=>{console.log(response)
    getNote();
    setnotesLength(response.data.notes.length)
   })).catch((error)=>{console.log(error)
    
   })
  }

  useEffect(()=>{

    getNote()
  },[])

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
      onSubmit: addNote,
    })
  




  return (<>
 
<div className="modal bg-emerald-600 p-10 w-full c">
  <div className="buttons flex">
    <Button className='bg-white text-emerald-600 hover:bg-slate-800  mx-3' onClick={() => setOpenModal(true)}>Add Note</Button>
    <button onClick={logOut} className='py-2 px-9 rounded-lg hover:bg-slate-800 bg-white text-emerald-600'>Log Out</button>
  </div>




  <div className="NotesCounter my-10 ms-2">
    <h1 className='text-3xl font-bold text-gray-800 '>Notes <span>{notesLength}</span> </h1>
    {notesLength?notes?.map((note)=><Note key={note._id} note={note} remove={deleteNote} noteId={note._id} getNote={getNote}></Note>):null}
  </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header ><p className='text-emerald-700'>Your Note List</p></Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="space-y-6" >
           <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title} type="text" placeholder='Note Title' className='w-full rounded-lg my-5' id='title'/>
           <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.content} type="text" placeholder='Note Content' className='w-full rounded-lg my-5' id='content'/>
           
          </form>
        </Modal.Body>
        <Modal.Footer>
        <Button type='submit' className='bg-emerald-600 text-white' onClick={formik.handleSubmit}>Add Note</Button>
        </Modal.Footer>
      </Modal>
</div>

  </>

  )
}
