import React from 'react'
// import { doctors } from '../../data'
import {  BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Search from '../../components/search/Search';
import DoctorCard from './DoctorCard';
import useData from '../../hooks/useData';
import { useState } from 'react';
import Appointment from '../appointments/Appointment';


const Doctors = () => {
    const navigate = useNavigate()
    const { doctors } = useData()
    const [appoint, setAppoint] = useState(null)
    
  return (
    <div className='doctors_wrappers'>
        {appoint && <Appointment doctor={appoint} setAppoint={setAppoint}/>}
        <div className="doctors_top">
            <h1>Karibu kwenye ukurasa watu wa WemaDocta, Madaktari wapo tayari kukusikiliza na kukushauri!!!</h1>
            <div>
              <button className='btn_sign' onClick={() => navigate('/health')} >Tazama Clinics</button>  
            </div>
            
        </div>
        <div className="nikah_search">
           <Search title='Tafuta Daktari'/> 
        </div>
        <div className="doctors_inner">
            {doctors.filter(m =>m.status==='Amethibitishwa').map(d => (
              <DoctorCard d={d} setAppoint={setAppoint}/>
            ))}
            
        </div>
     
    </div>
  )
}

export default Doctors
