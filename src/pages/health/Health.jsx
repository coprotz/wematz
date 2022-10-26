import React from 'react'
import { clinics, doctors } from '../../data'
import './health.css'
import {  BsThreeDotsVertical } from "react-icons/bs";
import { Outlet } from 'react-router-dom';
import { FaHeartbeat } from "react-icons/fa";

const Health = () => {

  
  return (
    <div className='health_wrapper'>      
      <Outlet/>
    </div>
  )
}

export default Health
