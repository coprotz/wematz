import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { chats, users } from '../../data'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import moment from 'moment'

const ChatCard = ({chat}) => {

    const { id } = useParams()

    const { user } = useAuth();
    const { messages, users, marriages, doctors, chats } = useData()

    // const activeChat = chats?.find(c =>c.id === id)

    // const marry = marriages?.find(p=>p.userId === user.uid)

    // const cuUser = users?.find(u => u.id === user.uid)
    // const marry = marriages?.find(a => a.userId === user.uid)

    // const userChats = chat?.members?.find(m =>m !== cuUser?.id)
    // const marryChats = chat?.members?.find(m =>m !== marry?.id)

    // const allChats = userChats.concat(marryChats)

    // console.log('activeChat', activeChat)

 
    // const memberId =  marry? chat?.members?.find(m =>m !== marry?.id) : null

    const cuMsgs = messages && messages.filter(m => m.room === chat.id)
    const lastMsg = messages && messages.findLast((m) => m.room === chat.id)

    const memberId = chat.members?.find(m => m?.memberId)?.memberId

    const member =
    doctors?.find(a => a.id === memberId) ||           
    marriages?.find(a => a.id === memberId)

    const Name = () => {
      if(marriages?.find(a => a.id === memberId)){
        return (
          <>{member?.username }</>
        )
      }else if(doctors?.find(a => a.id === memberId)){
        return (
          <>{member?.name}</>
        )
      }else {
        return (
          <>{member?.fname+" "+member?.lname}</>
        )
      }
    }

  
    const navigate = useNavigate()

  return (
    <div className={chat.id === id? 'active_chat_card' : "chat_card"} key={chat.id} onClick={() =>navigate(`/messages/${chat.id}`)}>
      <div className="chat_wrap">
        <div className="chat_wrleft">
          <div className="chat_rec_photo">
              <img src={member?.photo} />
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
