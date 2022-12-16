import React from 'react'
import moment from 'moment'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const MessageCard = ({m}) => {

    // console.log('msg', message)
    const { user } = useAuth();
    const navigate = useNavigate()

    const { uid, text, name, createdAt, photo, id } = m
    const messageClass = uid === user?.uid ? 'sent' : 'received';
    const bgClass = uid === user?.uid ? 'right' : 'left';
  return (
    <motion.div 
    layout
      className='messages_inner'>       
        <div className={`message_card ${messageClass}`}>
            <div className="chat_rec_photo">
                <img src={photo? photo : process.env.PUBLIC_URL + `${m?.avatar}`}/>
            </div>
            <div className={`message_body ${bgClass}`}>
                <p className='message_p'>{text}</p> 
                <small className='mes_body_time'>{moment(createdAt && createdAt.toDate()).format('MMM Do YY, LT')}</small>  
            </div>
       </div>
    </motion.div>
  )
}

export default MessageCard