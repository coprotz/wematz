import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import {   BsFillShareFill } from "react-icons/bs";
import Loading from '../../components/loading/Loading';
import Tiptak from '../../components/tiptap/Tiptap';
import { answers } from '../../data';
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';

const CreateAnswer = ({title, item, type}) => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users, questions } = useData()

    const cuUser = users?.find(u => u.id === user?.uid)
    const cuQue = questions?.find(q => q.id === item.id)

    const commentRef = collection(db, 'comments')
    const likeRef = collection(db, 'likes')
    const notificRef = collection(db, 'notifics')
  
    const newNotific = {
      target_id: item?.userId,
      uid: user.uid,
      type:'que',
      action: 'amejibu swali lako',
      type_id:item?.id,
      isSeen: false,
      createdAt: serverTimestamp()
    }
    // console.log('doc', doc)
    
    const handleComment = async(e) => {
        e.preventDefault()  

        setLoading(true)

        const data = {
            docId: item.id,
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

   const maxWords = message.split('').length
   console.log('max', maxWords)
  return (
    <div className="review_share">
        <div className="share_answer">
            <Tiptak setBody={setMessage} value={message}/>
            <div className="que_counts">
                <small>Herufi zisipungue 100</small>
                <small>{maxWords}</small> 
            </div>
            
            {/* <textarea 
                type= 'textarea'  
                placeholder={title} 
                className='sel_input3'
                name='message'                        
                value={message} 
                 style={{width:'100%', height: message? '200px': '30px'}}
                onChange={(e) =>setMessage(e.target.value)}>
            </textarea>  */}
         
            
        </div>
        <div className="share_action">       
            <button 
                className='btn_sign'
                disabled={maxWords < 100}
                onClick={handleComment}
                >{loading? <Loading/> :'Tuma Jibu Lako' }</button>
        </div>
    
    </div>
  )
}
export default CreateAnswer
