import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { chats, users } from '../../data'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import moment from 'moment'

const ChatCard = ({chat}) => {

    const { id } = useParams()

    const { user } = useAuth();
    const { messages, marriages, doctors, lawyers } = useData()
    

    const cuMsgs = messages && messages.filter(m => m.room === chat.id)
    const lastMsg = messages && messages.findLast((m) => m.room === chat.id)

    const myId = user.uid || doctors?.find(d => d.userId === user.uid)?.id || 
    marriages?.find(m =>m.userId === user.uid)?.id ||
    lawyers?.find(l => l.userId === user.uid)?.id


    const memberId = chat.members?.find(m => m !== myId)

    console.log('memberId', memberId)

    const member = 
      doctors?.find(a => a.id === memberId) || 
      marriages?.find(a => a.id === memberId) || 
      lawyers?.find(a => a.id === memberId) || 
      users?.find(a =>a.id === memberId) 
    
    
    // console.log('member', member)
    // console.log('id', chat.id)
    // console.log('chatid', chat?.chatId)
    

    const Name = () => {
      if(marriages?.find(a => a.id === memberId)){
        return (
          <>{member?.username }</>
        )
      }else if(doctors?.find(a => a.id === memberId)){
        return (
          <>{member?.name}</>
        )
      }else if(lawyers?.find(a => a.id === memberId)){
        return (
          <>{member?.name}</>
        )
      }else {
        return (
          <>{member?.fname+" "+member?.lname}</>
        )
      }
    }

    const Photo = () => {
      if(marriages?.find(a => a.id === memberId)){
        return (
          // <>{member?.photo }</>
          <img src={member?.photo} />
        )
      }else if(doctors?.find(a => a.id === memberId)){
        return (
          <img src={member?.photo} />
        )
      }else if(lawyers?.find(a => a.id === memberId)){
        return (
          <img src={member?.photo} />
        )
      }else {
        return (
          <img src={member?.photo} />
        )
      }
    }

  
    const navigate = useNavigate()

  return (
    <div className={chat.id === id? 'active_chat_card' : "chat_card"} key={chat.id} onClick={() =>navigate(`/messages/${chat.id}`)}>
      <div className="chat_wrap">
        <div className="chat_wrleft">
          <div className="chat_rec_photo">
              {Photo()} 
          </div>
          <div className="chat_body">
              <h4 className='chat_member_name'>{Name()}</h4>
              <span className='chat_text'>{lastMsg?.text}</span>
          </div>
        </div>
        <div className="chat_timer">
          <small className='chat_la_time'>{moment(lastMsg?.createdAt?.toDate()).fromNow(true)}</small> 
          <span className='card_small_qty'>{cuMsgs && cuMsgs.length}</span>
        </div>
        </div>
    </div>
  )
}

export default ChatCard
