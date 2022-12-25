import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { chats, users } from '../../data'
// import { db, useAuth } from '../../hooks/useAuth'
// import useData from '../../hooks/useData'
import moment from 'moment'
// import { updateDoc, doc } from 'firebase/firestore'
import { useContext } from 'react'
import { ChatContext } from '../../hooks/chatsContext'
import useData from '../../hooks/useData'

const ChatCard = ({chat}) => {

    const { users } = useData()
    const { dispatch, data, setActive } = useContext(ChatContext)
    const user = users?.find(u => u.id === chat[1].userInfo.uid)

    console.log('user', user)

   
  
    const navigate = useNavigate()

   

    // const isRead = lastMsg?.isRead == true
    const handleSelect = (u) => {
      dispatch({type: "CHANGE_USER", payload: u})
    }
   

  return (
    <div className="chat_card" onClick={() =>{handleSelect(chat[1].userInfo);setActive(true)}} key={chat[0]}>
    <div className="chat_wrap">
      <div className="chat_wrleft">
        <div className="chat_rec_photo">
            <img src={user?.photo || process.env.PUBLIC_URL + `${user?.avatar}`} alt="" /> 
        </div>
        <div className="chat_body">
          <div className="member_status">
              <h3 className='profile_name'>{user?.name}</h3>
              {user?.isOnline == true ? 
              <span className="status_ind" style={{backgroundColor: '#0df60f'}}></span> :
              <span className="status_ind" style={{backgroundColor: '#aaa'}}></span>
              }
          </div>                 
          <span className='chat_text'>{chat[1].lastMessage?.message}</span>
        </div>
      </div>
      <div className="chat_timer">
        <small className='chat_la_time'>{moment(chat[1].createdAt?.toDate()).fromNow(true)}</small>       
      </div>
      </div>
  </div>
  )
}

export default ChatCard
