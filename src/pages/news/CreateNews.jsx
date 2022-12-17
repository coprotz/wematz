import React from 'react'
import { useState } from 'react'
import Tiptak from '../../components/tiptap/Tiptap'
import parser from 'html-react-parser'
import { db, useAuth } from '../../hooks/useAuth'
import {GrClose } from "react-icons/gr";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Loading from '../../components/loading/Loading'
import AlertSms from '../../components/alert/AlertSms'
import useStorage from '../../hooks/useStorage'
import { BsCardImage } from 'react-icons/bs'



const CreateNews = () => {
    const [body, setBody] = useState('')
    const { setHabari, user, setAlert } = useAuth()
    const [title, setTitle] = useState('')
    const [messageAlert, setMessageAlert] = useState('')
    const [ loading, setLoading ] = useState(null)

    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    const { perc, url } = useStorage(file)

    const types = ['image/png', 'image/jpeg']

    const handleSelect = (e) => {
        let selected = e.target.files[0];
        // setFile(selected)  
        if (selected && types.includes(selected.type)){
            setFile(selected)
            setError('')
        }else {
            setFile(null)
            setError('Please select an image file (png or jpg)')
        }
    }



    const handleMada = async () => {
      setLoading(true)
      const newsRef = collection(db, 'news')
      const data = {
        title,
        pic: url,
        body,
        uid: user.uid,
        createdAt: serverTimestamp()
      }

      try {
        await addDoc(newsRef, data)
        setLoading(null)
        setHabari(null)
        setMessageAlert('Habari imewekwa vizuri sana...!')
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
            <h2>Anzisha Habari</h2>
            <button className='btn_btn' onClick={() => setHabari(null)}><GrClose/></button>
        </div>
        <div className="shared_video1"> 
            <h3>Weka Picha</h3>
            {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}  
            <div className="user_photo5">
             { file?                         
                 <img src={URL.createObjectURL(file)} alt="" /> : 
                 <>
                 
                                               
                 <label htmlFor="photo" className='profile_photo'>
                     <input 
                         type="file" 
                         name='photo' 
                         id="photo" style={{display: 'none'}}
                         onChange={handleSelect}
                     />
                     <span className='attached_photo'><BsCardImage/></span>
                 </label>
                 
              </> 
             }
            </div>
            {/* <div className="profile_photo_edit">                            
                    <button className='btn_cancel' onClick={() =>setFile(null)}>BATILISHA</button>
            </div> */}
            {file &&       
            <div className="profile_photo_edit">                            
                <button className='btn_cancel' onClick={() =>setFile(null)}>ONDOA</button>
            </div>
            }
                
        </div>
        
          <textarea 
              name="title" 
              id="" placeholder='Kichwa cha Habari'
              class="text_head"
              
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

export default CreateNews
