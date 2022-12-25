import { type } from '@testing-library/user-event/dist/type';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import {   BsFillShareFill } from "react-icons/bs";
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';

const CreateReview = ({title, doc, setShow, type}) => {
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
      type,
      action: 'amerespond'+" "+{type}+" "+'yako',
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
            cat: type,          
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
            <div className="comment_info">
                <img src={cuUser?.photo ? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar} alt="" />
            </div>
            <textarea 
                type= 'textarea'  
                placeholder={title} 
                className='comment_input'
                name='message'                        
                value={message} 
                 style={{width:'100%', height: message? '100px': '30px'}}
                onChange={(e) =>setMessage(e.target.value)}>
            </textarea>            
        </div>
        <div className="share_action_btns">       
            <button 
                className='btn_yes'
                disabled={!message}
                onClick={handleComment}
            >{loading? 'Inatuma' :'Tuma' }</button>
             <button 
                className='btn_no'                
                onClick={() =>setShow(null)}
            >{loading? 'Inatuma' :"Batilisha" }</button>
        </div>
    
    </div>
  )
}

export default CreateReview
