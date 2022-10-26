import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { chats, messages, users } from '../../data'
import {  HiOutlineArrowLeft } from "react-icons/hi";
import ChatLists from './ChatLists'


const ViewChat = () => {
    const { id } = useParams()
    const myId = 'gdggdgdgd'
    const chat = chats?.find(c => c.id === id)
    const memberId = chat.members.find(m =>m !== myId) 
    const member = users?.find(u => u.id === memberId)
    const chatMessages = messages?.filter(m =>m.chatId === id)
    const navigate = useNavigate()

  return (   
    <div className='main_messages'>
        <div className="view_chatlists">
            <ChatLists/>
        </div>
          
          <div className="chat_room_body">
            <div className="chatroom_head">
            <div className="view_que_back">
                <button onClick={() =>navigate('/messages')} className='btn_back'><HiOutlineArrowLeft/></button>
            </div>
                <div className="chat_rec_photo">
                    <img src={process.env.PUBLIC_URL+`/${member.photoUrl}`} />
                </div>
                <div className="chat_body">
                    <h4>{member.name}</h4>                    
                </div>
            </div>
            <div className="chat_room_bottom">
                <div className="chat_messages">
                    {chatMessages?.map(m => (
                        <div className="message_card">
                            <div className="chat_rec_photo">
                                <img src={process.env.PUBLIC_URL+`/${m.photo}`} />
                            </div>
                            <div className="message_body">
                              <p>{m.text}</p> 
                              <small className='mes_body_time'>12 min ago</small>  
                            </div>
                             
                        </div>
                      
                    ))}
                </div>
                <div className="chat_new">
                    <input type="text" className='chat_input'/>
                    <button>send</button>
                </div>
            </div>
          </div>
    </div>
    )
 
}

export default ViewChat
