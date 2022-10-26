import React from 'react'
import { clinics, doctors } from '../../data'
import './health.css'
import {  BsThreeDotsVertical } from "react-icons/bs";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat } from "react-icons/fa";
import ClinicCard from './ClinicCard';

const MainHealth = () => {
    const navigate = useNavigate()
  return (
    <div className='main_health'>
          <div className="health_top">
            <div className="health_t_1">
                <h1>Karibu katika Ukumbi wa Afya na Ushauri wa Kitabibu</h1>
                <span className='health_p'>Shauriana na Daktari juu ya masuala yako ya Afya, 
                    weka appointment na daktari wa shida yako kutoka katika listi ya madaktari tulionao.
                </span>
                <button className='btn_sign' onClick={() =>navigate('/health/doctors')}>Angalia Madaktari</button>
            </div>
            <div className="health_logo">
                <FaHeartbeat/>
            </div>
        </div>     
     
      <div className="health_inner">
        <div className="health_body">
              {/* <h3>Chagua Clinic Uendelee</h3> */}
              <div className="clinics_rap">  
                  {clinics?.map(c => (
                   <ClinicCard c={c}/>
                  ))}
  
            </div>
        </div>
        <div className="page_side">
          <h4>Doctors online</h4>
          <div className="doctors_grid">
            {doctors?.slice(0,5).map(d=> (
              <div className="doctor_card" key={d.id} onClick={() =>navigate(`/health/doctors/${d.id}`)}>
                  <img src={process.env.PUBLIC_URL+`/${d.photo}`} alt="" />
                  <small>{d.name}</small>
              </div>
            ))}
             
          </div>
          <div className="more_doctors">
              <div className="user_action">
                <button className='btn'><BsThreeDotsVertical/></button>
              </div>
              <h4>Angalia Madaktari Wote</h4>
            </div>
          
         
        </div>
      </div>
      
    </div>
  )
}

export default MainHealth
