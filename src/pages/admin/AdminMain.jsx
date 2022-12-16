import React from 'react'
import { Outlet } from 'react-router-dom';
import './admin.css'

const AdminMain = () => {
  return (
    <div className='legals'>
      <Outlet/>  
    </div>
  )
}


export default AdminMain
