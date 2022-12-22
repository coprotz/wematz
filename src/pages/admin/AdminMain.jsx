import React from 'react'
import { Outlet } from 'react-router-dom';


const AdminMain = () => {
  return (
    <div className='legals'>
      <Outlet/>  
    </div>
  )
}


export default AdminMain
