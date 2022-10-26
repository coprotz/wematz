import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { chats, users } from '../../data'

const ChatCard = ({chat, myId}) => {

  const { id } = useParams()

 
    const memberId = chat.members.find(m =>m !== myId) 
    const member = users?.find(u => u.id === memberId)
    const navigate = useNavigate()

  return (
    <div className={chat.id === id? 'active_chat_card' : "chat_card"} key={chat.id} onClick={() =>navigate(`/messages/${chat.id}`)}>
        <div className="chat_rec_photo">
            <img src={process.env.PUBLIC_URL+`/${member.photoUrl}`} />
        </div>
        <div className="chat_body">
            <h4>{member.name}</h4>
            <small>Salamu kutoka kuzimu</small>
        </div>
    </div>
  )
}

export default ChatCard
