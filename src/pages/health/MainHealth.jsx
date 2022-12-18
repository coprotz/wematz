import React from 'react'
import { clinics } from '../../data'
import './health.css'
import {  BsThreeDotsVertical } from "react-icons/bs";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat } from "react-icons/fa";
import ClinicCard from './ClinicCard';
import Footer from '../../components/footer/Footer';
import useData from '../../hooks/useData';
import { HiOutlineArrowLeft } from 'react-icons/hi'


const MainHealth = () => {
    const navigate = useNavigate()
    const { doctors } = useData()
  return (
    <div className='main_health'>
        <div className="health_top">
            <div className="health_t_1">
              <div className="heading_top">                
                <div className="view_que_back">
                  <button onClick={() =>navigate(-1)} className='btn_btn'><HiOutlineArrowLeft/></button>
                </div>
                <h2 className='title'>Afya</h2>           
              </div>
              <h1>Karibu katika Ukumbi wa Afya na Ushauri wa Kitabibu</h1>
              <span className='health_p'>Shauriana na Daktari juu ya masuala yako ya Afya, 
                weka appointment na daktari wa shida yako kutoka katika listi ya madaktari tulionao.
              </span>     
              <div className='clinics_btns'>
                <button className='btn_sign' onClick={() => navigate('/health/doctors')} >Madaktari</button>  
                <button className='btn_sign' onClick={() => navigate('/health/makala')} style={{backgroundColor: 'white', border: '1px solid blue', color:'blue'}}>Makala</button>  
              </div>
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
            {doctors?.filter(m => m.status === 'Amethibitishwa')?.slice(0,5).map(d=> (
              <div className="doctor_card" key={d.id} onClick={() =>navigate(`/health/doctors/${d.id}`)}>
                  <img src={d.photo} alt="" />
                  <small>{d.name}</small>
              </div>
            ))}
             
          </div>
          <div className="more_doctors">
              <div className="user_action">
                <button className='btn' onClick={() =>navigate('/health/doctors')}><BsThreeDotsVertical/></button>
              </div>
              <h4>Angalia Madaktari Wote</h4>
            </div>
          
         
        </div>
      </div>
      {/* <Footer /> */}
      
    </div>
  )
}

export default MainHealth
