import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import {   BsFillShareFill } from "react-icons/bs";
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


        const exiAnswers = [...item?.answers]

        setLoading(true)

        const data = {
            docId: item.id,
            uid: user.uid,
            name: cuUser?.name, 
            answeredAt: Date.now(),     
            text: message,           
            photo: cuUser?.photo ? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar
        }

        try {
            await updateDoc(doc(db, 'questions', `${item.id}`), {answers: [...exiAnswers, data]})
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
            <Tiptak setBody={setMessage}/>
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
export default CreateAnswer
