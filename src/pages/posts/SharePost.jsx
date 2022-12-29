import React from 'react'
import './posts.css'
// import me from '../../assets/images/img8.jpg'
import {  BsCardImage, BsPaperclip, BsCaretRightSquareFill, BsSoundwave, BsFillShareFill } from "react-icons/bs";
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import { useEffect } from 'react';


const SharePost = ({setVideo,setAudio, setImage}) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users, followers } = useData()


    const cuUser = users?.find(u => u.id === user?.uid)

    const postRef = collection(db, 'posts')
    const notificRef = collection(db, 'notifics')

    const myfollowings = followers?.filter(f => f.following_id === user.uid)
    const res = myfollowings.map(({follower_id}) => follower_id)

   
    const handlePost = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            userId: user.uid,
            name: cuUser?.name,
            createdAt: serverTimestamp(),
            tex: message,
            type: 'text',
            photo: cuUser?.photo? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar
        }

        const newNotific = {
            target_ids: res,
            uid: user.uid,
            type:'post',
            action: 'ametuma post mpya, pitia na comment',
            isSeen: false,
            seen: [], 
            // type_id: newQue?.id,
            createdAt: serverTimestamp()
          }

        try {
            await addDoc(postRef, data)
            setLoading(null)
            setMessage('')
            await addDoc(notificRef, newNotific)
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
                <div className="share_text post_cover_1">
                    <textarea 
                        type= 'textarea'  
                        placeholder='Unataka kuwaambia nini WanaWema?' 
                        className='sel_input'
                        name='message'                        
                        value={message} 
                        style={{width:'100%', height: message? '200px': '30px'}}
                        onChange={(e) =>setMessage(e.target.value)}>
                    </textarea> 
                                     
                     <div className="share_others">
                     {!message && <>
                        <button className='btn_btn' onClick={() =>setImage(true)}>
                            <BsCardImage/>
                        </button>              
                        <button className='btn_btn' onClick={() =>setVideo(true)}>
                            <BsCaretRightSquareFill />
                        </button>
                        <button className='btn_btn'>
                            <BsPaperclip/>
                        </button>
                        <button className='btn_btn' onClick={() =>setAudio(true)}>
                            <BsSoundwave/>
                        </button> </>}
                        <button 
                            className='btn_sign'
                            style={{minWidth: '70px', height: '50px'}}
                            disabled={!message}
                            onClick={handlePost}
                            >{loading? 'Sending' : <BsFillShareFill/>}
                        </button>
                    </div>
                    
                    
                </div>
               
            </div>
            
        </div>
      
    </div>
  )
}

export default SharePost