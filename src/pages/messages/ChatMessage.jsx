import { doc, onSnapshot } from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../../hooks/chatsContext'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'

const ChatMessage = ({message}) => {
  const { user } = useAuth()
  const { users } = useData()

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  const { data } = useContext(ChatContext)
  const cuUser = users?.find(u => u.id === user.uid)
  const member = users?.find(u => u.id === data.isUser.uid)
  const bgClass = message?.uid === user?.uid ? 'bg_blue' : 'bg_white';
    

  return (
    <div className='chats_messages_wrapper' ref={ref}>
      <div className={message?.uid === cuUser?.id ? "message_owner" : "message_contents" }>
        <div className="chat_rec_photo">
          <img src={ 
            message.uid === user.uid
            ? cuUser?.photo || process.env.PUBLIC_URL + `${cuUser?.avatar}`
            :  member?.photo || process.env.PUBLIC_URL + `${member?.avatar}`
            }/>     
        </div>
        <div className={`message_body ${bgClass}`}>
          <p className='message_p'>{message?.message}</p> 
          <small className='mes_body_time'>{moment(message?.data.toDate()).format('MMM Do YY, LT')}</small>  
        </div>
      </div>       
    </div>
  )
}

export default ChatMessage
