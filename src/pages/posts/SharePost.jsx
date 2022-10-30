import React from 'react'
import './posts.css'
import me from '../../assets/images/img8.jpg'
import {  BsCardImage, BsPaperclip, BsCaretRightSquareFill, BsSoundwave, BsFillShareFill } from "react-icons/bs";
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';


const SharePost = ({setVideo,setAudio, setImage}) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users } = useData()

    const cuUser = users?.find(u => u.id === user?.uid)

    const postRef = collection(db, 'posts')


    const handlePost = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            userId: user.uid,
            name: cuUser?.fname+" "+cuUser?.lname,
            createdAt: serverTimestamp(),
            tex: message,
            type: 'text',
            photo: cuUser?.photo
        }

        try {
            await addDoc(postRef, data)
            setLoading(null)
            setMessage('')
        } catch (error) {
            console.log(error.message)
        }



    }
  return (
    <div className="share_post">
        <div className="share_info">
            {/* <div className="share_photo">
                <img src={me} alt="" />
            </div> */}
            <div className="share_details">
                <div className="share_text">
                    <textarea 
                        type= 'textarea'  
                        placeholder='Unataka kuwaambia nini WanaWema?' 
                        className='sel_input'
                        name='message'                        
                        value={message} 
                        style={{width:'100%', height: message? '200px': '30px'}}
                        onChange={(e) =>setMessage(e.target.value)}>
                    </textarea> 
                    {!message &&                  
                     <div className="share_others">
                        <button className='btn_btn' onClick={() =>setImage(true)}>
                            <BsCardImage/>
                        </button>               
                        <buttton className='btn_btn' onClick={() =>setVideo(true)}>
                            <BsCaretRightSquareFill />
                        </buttton>
                        <buttton className='btn_btn'>
                            <BsPaperclip/>
                        </buttton>
                        <buttton className='btn_btn' onClick={() =>setAudio(true)}>
                            <BsSoundwave/>
                        </buttton>
                    </div>}
                    
                    <button 
                    className='btn_sign'
                    style={{minWidth: '70px', height: '50px'}}
                    disabled={!message}
                    onClick={handlePost}
                    >{loading? 'Sending' : <BsFillShareFill/>}</button>
                </div>
               
            </div>
            
        </div>
      
    </div>
  )
}

export default SharePost