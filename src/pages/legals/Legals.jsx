import React from 'react'
import { Outlet } from 'react-router-dom';
import './legals.css'

const Legals = () => {
  return (
    <div className='legals'>
      <Outlet/>  
    </div>
  )
}

export default Legals
