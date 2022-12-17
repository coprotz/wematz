import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import {   BsFillShareFill } from "react-icons/bs";
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';

const CreateReview = ({title, doc}) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users } = useData()

    const cuUser = users?.find(u => u.id === user?.uid)

    const commentRef = collection(db, 'comments')
    const likeRef = collection(db, 'likes')
    const notificRef = collection(db, 'notifics')
  
    const newNotific = {
      target_id: doc?.userId,
      uid: user.uid,
      type: 'swali lako',
      action: 'amejibu',
      isSeen: false,
      createdAt: serverTimestamp()
    }
    // console.log('doc', doc)
    
    const handleComment = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            docId: doc.id,
            userId: user.uid,
            name: cuUser?.name,
            createdAt: serverTimestamp(),
            text: message,           
            photo: cuUser?.photo ? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar
        }

        try {
            await addDoc(commentRef, data)
            await addDoc(notificRef, newNotific)
            setMessage('')
            setLoading(null)
            
           
        } catch (error) {
            console.log(error.message)
        }

        


    }
  return (
    <div className="review_share">
        <div className="share_text">
            <textarea 
                type= 'textarea'  
                placeholder={title} 
                className='sel_input3'
                name='message'                        
                value={message} 
                 style={{width:'100%', height: message? '200px': '30px'}}
                onChange={(e) =>setMessage(e.target.value)}>
            </textarea> 
         
            
        </div>
        <div className="share_action">       
            <button 
                className='btn_sign'
                disabled={!message}
                onClick={handleComment}
                >{loading? 'Inatuma' :<BsFillShareFill/> }</button>
        </div>
    
</div>
  )
}

export default CreateReview
