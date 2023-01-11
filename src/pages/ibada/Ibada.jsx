import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

// import { news } from '../../data';
import useData from '../../hooks/useData';
import './ibada.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';


const Ibada = () => {
//   const { news } = useData()
    const [active, setActive] = useState(false)
  const navigate = useNavigate()
  return (
    <div className='news_wrapper'>
      <div className="news_body">
        <div className="ibada_top">
            <NavLink  to='/ibada/quran' className='ibada_link' >Quran</NavLink>
            <NavLink to='/ibada/sunnah' className='ibada_link'>Sunnah</NavLink>
            <NavLink to='/ibada/swala' className='ibada_link' >Mida ya Swala</NavLink>
            <NavLink to='/ibada/nyiradi' className='ibada_link'>Nyiradi</NavLink>
        </div>
        <Outlet/>
      </div>      
    </div>
  )
}
export default Ibada
