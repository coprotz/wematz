import React from 'react'
import { Outlet } from 'react-router-dom';

const Messages = () => {
  return (
    <div className='messages'>
      <Outlet/>      
    </div>
  )
}

export default Messages
