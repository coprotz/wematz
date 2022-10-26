import React from 'react'
import ChatLists from './ChatLists'
import './messages.css'

const MainMessages = () => {
   
    // const friend = mychats?.find(m => m.members.find(m =>m.id !== myId)?.id)
    // console.log('friend', friend)

  return (
    <div className='main_messages'>
      <ChatLists/>
      <div className="messages_body">
        <h3>Chagua kutoka kushoto kuendeleza mazungumzo</h3>
      </div>
    </div>
  )
}

export default MainMessages
