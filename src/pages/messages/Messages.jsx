import React from 'react'
import { Outlet } from 'react-router-dom';
import Chats from './Chats';

const Messages = () => {
  return (
    <div className='messages'>
      <Chats/>     
    </div>
  )
}

export default Messages
