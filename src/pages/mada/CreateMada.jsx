import React from 'react'
import { useState } from 'react'
import Tiptak from '../../components/tiptap/Tiptap'
import parser from 'html-react-parser'
import { db, useAuth } from '../../hooks/useAuth'
import {GrClose } from "react-icons/gr";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Loading from '../../components/loading/Loading'
import AlertSms from '../../components/alert/AlertSms'



const CreateMada = () => {
    const [body, setBody] = useState('')
    const { setNewMada, user, setAlert } = useAuth()
    const [title, setTitle] = useState('')
    const [messageAlert, setMessageAlert] = useState('')
    const [ loading, setLoading ] = useState(null)


    const handleMada = async () => {
      setLoading(true)
      const madaRef = collection(db, 'madas')
      const data = {
        title,
        body,
        uid: user.uid,
        createdAt: serverTimestamp()
      }

      try {
        await addDoc(madaRef, data)
        setLoading(null)
        setNewMada(null)
        setMessageAlert('Mada imewekwa vizuri sana...!')
        setInterval(() => {
          setAlert('')
        },3000)
      } catch (error) {
        console.log(error.message)
      }
    }
    
  return (
    <div className="new_mada_wrapper"> 
       {messageAlert != '' &&
          <AlertSms alert={messageAlert}/>
        }       
      <div className="create_mada">
        <div className="not_inner_top">
            <h2>Anzisha Mada</h2>
            <button className='btn_btn' onClick={() => setNewMada(null)}><GrClose/></button>
          </div>
        
          <textarea 
              name="title" 
              id="" placeholder='Kichwa cha Habari'
              class="finder"
              value={title}
              style={{fontSize: '1.2rem'}}
              onChange={(e) => setTitle(e.target.value)}
              >
          </textarea>
          <Tiptak setBody={setBody}/>         
          {/* <p>{parser(body)}</p> */}
          <button className='btn_create' onClick={handleMada}>{loading? <Loading/> : 'Anzisha'}</button>
      </div> 
    </div> 
  )
}

export default CreateMada
