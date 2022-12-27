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
import { RiImage2Fill } from "react-icons/ri";
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../hooks/useAuth'


const ChatCard = ({chat}) => {

    const { users } = useData()
    const { dispatch, data, setActive } = useContext(ChatContext)
    const user = users?.find(u => u.id === chat[1].userInfo.uid)

    // console.log('user', user)

   
  
    const navigate = useNavigate()

    // console.log('last', chat[1].lastMessage)

   

    // const isRead = lastMsg?.isRead == true
    const handleSelect = async (u) => {

      const t = u[1].userInfo
      
      // await updateDoc(doc(db, 'userChats', `${t.uid}`), {
      //   [u[0] + ".lastMessage"]: {           
      //       isRead: true
      //   },
      //   [u[0] + ".readAt"]: serverTimestamp(),
      // })
      dispatch({type: "CHANGE_USER", payload: t})
    }
   

  return (
    <div className="chat_card" onClick={() =>{handleSelect(chat);setActive(true)}} >
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
          {chat[1]?.lastMessage?.type === 'image' ?
          <div className='image_last'><RiImage2Fill/></div> 
            
          : 
          <span className='chat_text'>{chat[1].lastMessage?.message}</span>
        }                
          
        </div>
      </div>
      <div className="chat_timers">
        <small className='chat_la_time'>{moment(chat[1].createdAt?.toDate()).fromNow(true)}</small> 
        {/* {chat[1]?.lastMessage?.isRead === false &&
        <small className="unread">
          NEW
        </small>   }    */}
      </div>
      </div>
  </div>
  )
}

export default ChatCard
