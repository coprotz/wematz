import React from 'react'
import { doctors } from '../../data'
import {  BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Search from '../../components/search/Search';
import DoctorCard from './DoctorCard';


const Doctors = () => {
    const navigate = useNavigate()
  return (
    <div className='doctors_wrappers'>
        <div className="meeting_top">            
                <button onClick={() => navigate(-1)} className='btn'><BsArrowLeft/></button>            
                <h4>Machapisho</h4>
        </div>
        <div className="doctors_top">
            <h1>Karibu kwenye ukurasa wa Madaktari wetu, Madaktari wapo tayari kukusikiliza na kukushauri!!!</h1>
            <div>
              <button className='btn_sign' onClick={() => navigate('/health')} >Tazama Clinics</button>  
            </div>
            
        </div>
        <div className="nikah_search">
           <Search title='Tafuta Daktari'/> 
        </div>
        <div className="doctors_inner">
            {doctors.map(d => (
              <DoctorCard d={d}/>
            ))}
            
        </div>
     
    </div>
  )
}

export default Doctors
