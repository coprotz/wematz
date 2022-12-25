import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { HiOutlineCamera, HiOutlinePaperClip } from 'react-icons/hi'
import { MdOutlineSend } from 'react-icons/md'
import Loading from '../../components/loading/Loading'
import { ChatContext } from '../../hooks/chatsContext'
import { db, useAuth } from '../../hooks/useAuth'
import { v4 as uuid } from 'uuid'
import { addDoc, arrayUnion, collection, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'

const SendChat = () => {
    const { user } = useAuth()
    const { data } = useContext(ChatContext)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(null)

    // console.log('user', user.uid)

    // console.log('data', data)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const newNotific = {
            target_id: data.isUser.uid,
            uid: user.uid,
            type: 'message',
            action: 'amekutumia messagi',      
            type_id: data.chatId,
            isSeen: false,
            createdAt: serverTimestamp()
          }

          const notificRef = collection(db, 'notifics')
   

        try {
            await updateDoc(doc(db, 'chats', `${data.chatId}`), {
                messages: arrayUnion({
                    id: uuid(),
                    message,
                    uid: user.uid,
                    data: Timestamp.now()
                })
                
            }) 

            await updateDoc(doc(db, 'userChats', `${user.uid}`), {
                [data.chatId + ".lastMessage"]: {
                    message,
                },
                [data.chatId + ".createdAt"]: serverTimestamp(),
            })
            await updateDoc(doc(db, 'userChats', `${data.isUser.uid}`), {
                [data.chatId + ".lastMessage"]: {
                    message,
                },
                [data.chatId + ".createdAt"]: serverTimestamp(),
            })

            await addDoc(notificRef, newNotific)

            setLoading(false)
            setMessage('')
        } catch (error) {
            console.log(error.message)
        }

        


    }
  return (
    <div className='form_container' >      
    <form onSubmit={handleSubmit} className='form_inner_wrapper'>       
      <div className="form_outer">
          {!message &&          
          <div className="emoj">
            <button className='btn_form' type='button'><HiOutlinePaperClip/></button>
          </div> 
          }
          <input 
            type="text" 
            value={message} 
            className='send_input' 
            placeholder='Message'
            onChange={(e) =>setMessage(e.target.value)} 
            />  
            {!message &&        
            <button className='btn_form' type='button'><HiOutlineCamera/></button>
            }
      </div> 
      <button 
        className='btn_send_msg'
        disabled={!message}
        >{loading? <Loading/> : <MdOutlineSend/>}
      </button>   
  </form>
  </div>
  )
}

export default SendChat
