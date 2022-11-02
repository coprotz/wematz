import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { chats, users } from '../../data'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import moment from 'moment'

const ChatCard = ({chat}) => {

    const { id } = useParams()

    const { user } = useAuth();
    const { messages, marriages, doctors, lawyers, users } = useData()

    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(p=>p.userId === user.uid)
    const doc = doctors?.find(p=>p.userId === user.uid)
    const law = lawyers?.find(p=>p.userId === user.uid)

    // const userChat = chat.members.find(m =>m !== cuUser?.id)
    // const marryChat = chat.members.find(m =>m !== marry?.id)
    // const docChat = chat.members.find(m =>m !== doc?.id)

    const memberId = 
      chat?.members.find(m =>m !== cuUser?.id) ||
      chat?.members.find(m =>m !== marry?.id) ||
      chat?.members.find(m =>m !== law?.id) ||
      chat?.members.find(m =>m !== doc?.id)

    

    const isMarry = marriages?.find(m => m.id === memberId)
    const isDoc = doctors?.find(d => d.id === memberId)
    const isLaw = lawyers?.find(l => l.id === memberId)
    const isUser = users?.find(a =>a.id === memberId) 
    

    const cuMsgs = messages && messages.filter(m => m.room === chat.id)
    const lastMsg = messages && messages.findLast((m) => m.room === chat.id)

    // console.log('userchat',userChat)
    // console.log('marryChat',marryChat)
    // console.log('docChat',docChat)

    // const myId = 
    //   user.uid || 
    //   doctors?.find(d => d.userId === user.uid)?.id || 
    //   marriages?.find(m =>m.userId === user.uid)?.id ||
    //   lawyers?.find(l => l.userId === user.uid)?.id


   

    // console.log('chat', chat)

    // const member = 
    //   doctors?.find(a => a.id === memberId) || 
    //   marriages?.find(a => a.id === memberId) || 
    //   lawyers?.find(a => a.id === memberId) || 
    //   users?.find(a =>a.id === memberId) 

    console.log('isDoc', isDoc)
    console.log('isLaw', isLaw)
    console.log('memberId', memberId)
    console.log('isMarry', isMarry)

    console.log('marry', marry?.id)
    
    
    // console.log('member', member)
    // console.log('id', chat.id)
    // console.log('chatid', chat?.chatId)
    

    const Name = () => {
      if(isMarry){
        return (
          <>{isMarry?.username }</>
        )
      }else if(isDoc){
        return (
          <>{isDoc?.name}</>
        )
      }else if(isLaw){
        return (
          <>{isLaw?.name}</>
        )
      }else {
        return (
          <>{isUser?.fname+" "+isUser?.lname}</>
        )
      }
    }


    const Photo = () => {
      if(isMarry){
        return (
          // <>{member?.photo }</>
          <img src={isMarry?.photo} />
        )
      }else if(isDoc){
        return (
          <img src={isDoc?.photo} />
        )
      }else if(isLaw){
        return (
          <img src={isLaw?.photo} />
        )
      }else {
        return (
          <img src={isUser?.photo} />
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
