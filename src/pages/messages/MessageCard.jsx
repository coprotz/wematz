import React from 'react'
import moment from 'moment'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'

const MessageCard = ({m}) => {

    // console.log('msg', message)
    const { user } = useAuth();
    const navigate = useNavigate()
    const { users, doctors, lawyers, marriages } = useData()

    const { uid, text, name, createdAt, photo, id, sender } = m

    const target = users?.find(u => u.id === sender) || 
      doctors?.find(d => d.id === sender) || 
      lawyers?.find(l => l.id === sender) || 
      marriages?.find(m => m.id === sender)

    
    const messageClass = uid === user?.uid ? 'sent' : 'received';
    const bgClass = uid === user?.uid ? 'right' : 'left';

  return (
    <motion.div 
    layout
      className='messages_inner'>       
        <div className={`message_card ${messageClass}`}>
            <div className="chat_rec_photo">
                <img src={ target?.photo || process.env.PUBLIC_URL + `${target?.avatar}`}/>
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