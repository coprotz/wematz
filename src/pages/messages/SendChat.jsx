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
import useData from '../../hooks/useData'
import { getMessaging } from 'firebase/messaging'

const SendChat = () => {
    const { user } = useAuth()
    const { data } = useContext(ChatContext)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(null)
    const { notifics } = useData()

    const regToken = 'dO72p24nKgqILq5yC0XEUS:APA91bGXdO0bexXFGiF5f3XMyHAdf8W3bUGuTMcgF_Q9k7yg9mm5eudubUwm8ai_2v6oxhm0oq2iooGDmOR9ckQPcjXrVgy3HgnlXYK_e9a15SdpWDLET8ElRvPd4gIV5-0faVxQi_b-'

    // console.log('user', user.uid)
    // const getNot = notifics?.filter(n => n.uid === user.uid)?.filter(v => v.target_id === data?.isUser.uid)?.find(f => f.type=== 'message')

    // console.log('getNot', getNot)
   

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const getNot = notifics?.filter(n => n.uid === user.uid)?.filter(v => v.target_id === data?.isUser.uid)?.find(f => f.type=== 'message')


        const newNotific = {
            target_id: data.isUser.uid,
            uid: user.uid,
            type: 'message',
            action: message,      
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
            if(getNot){
              await updateDoc(doc(db, 'notifics', getNot.id), {
                isSeen: false, 
                action: message,
                createdAt: serverTimestamp()
              })
              
            }else{
             await addDoc(notificRef, newNotific)
            }

            const sendData = {
              data: {
                name: "Ally",
                body: "hey guy i like you"
              },
              token: regToken
            }

            getMessaging().send(sendData).then((response) => {
              console.log('Successiful', response)
            }).catch((error) => {
              console.log('Error sending message:',error)
            })

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
            id='textarea'            
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
