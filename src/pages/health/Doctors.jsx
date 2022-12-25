import React from 'react'
import { useNavigate } from 'react-router-dom';
import Search from '../../components/search/Search';
import DoctorCard from './DoctorCard';
import useData from '../../hooks/useData';
import { useState } from 'react';
import Appointment from '../appointments/Appointment';
import { HiOutlineArrowLeft } from 'react-icons/hi'


const Doctors = () => {
    const navigate = useNavigate()
    const { doctors } = useData()
    const [appoint, setAppoint] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    
  return (
    <div className='doctors_wrappers'>
        {appoint && <Appointment doctor={appoint} setAppoint={setAppoint}/>}
        <div className="doctors_top">
          <div className="heading_top">                
                <div className="view_que_back">
                  <button onClick={() =>navigate(-1)} className='btn_btn'><HiOutlineArrowLeft/></button>
                </div>
                <h2 className='title'>Madaktari</h2>           
              </div>
            <h1>Karibu kwenye ukurasa watu wa WemaDocta, Madaktari wapo tayari kukusikiliza na kukushauri!!!</h1>
            <div className='clinics_btns'>
              <button className='btn_sign' onClick={() => navigate('/health')} >Kliniki</button>  
              <button className='btn_sign' onClick={() => navigate('/health')} style={{backgroundColor: 'white', border: '1px solid blue', color:'blue'}}>Makala</button>  
            </div>
            
        </div>
        <div className="nikah_search">
           <Search title='Tafuta Daktari' setSearchTerm={setSearchTerm}/> 
        </div>
        <div className="doctors_inner">
            {doctors.filter(m =>m.status==='Amethibitishwa').filter((val) => {
              if(searchTerm === ''){
                return val
              }else if(val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                return val
              }
            }).map(d => (
              <DoctorCard d={d} setAppoint={setAppoint}/>
            ))}
            
        </div>
     
    </div>
  )
}

export default Doctors
