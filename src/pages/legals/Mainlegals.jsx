import React from 'react'
import { GoLaw } from "react-icons/go";
import Search from '../../components/search/Search';
// import { lawyers } from '../../data';
import useData from '../../hooks/useData';
// import CreateMada from '../mada/CreateMada';
import LawyerCard from './LawyerCard';
import './legals.css'
import {  HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';


const Mainlegals = () => {

  const { lawyers } = useData()
  const navigate = useNavigate()

  // console.log('lawyers', lawyers)
  
  return (
    <div className='main_legals'>
      
        {/* <CreateMada/> */}
        <div className="health_top">
            <div className="health_t_1">               
                <div className="heading_top">                
                  <div className="view_que_back">
                    <button onClick={() =>navigate(-1)} className='btn_btn'><HiOutlineArrowLeft/></button>
                  </div>
                  <h2 className='title'>Kona ya Sheria</h2>           
                </div>
                <span className='health_p'>Kama una tatizo lolote linalohitaji masaada wa kisheria, wasiliana na wanaWema wenzako waliobobea na mambo ya kisheria ili wakusaidie.
                </span>
                {/* <button className='btn_sign' >Omba Maelezo ya Mapishi</button> */}
            </div>
            <div className="health_logo">
                <GoLaw/>
            </div>
        </div>
        
        <div className="recipies_cat" style={{marginTop: '15px', marginBottom: '15px'}}>
          <div className="cat_recipies">
            <h4>Kesi za Kifamilia</h4>
          </div>
          <div className="cat_recipies">
            <h4>Kesi ya Madai</h4>
          </div>
          <div className="cat_recipies">
            <h4>Kesi ya Jinai</h4>
          </div>
        </div>
        <h3 className='sub_title'>Wanasheria Wetu</h3>
        <div className="nikah_search">
           <Search title='Tafuta Mwanasheria'/> 
        </div>
        <div className="doctors_inner">
            {lawyers?.filter(l => l.status === 'Amethibitishwa').map(d => (
              <LawyerCard d={d} key={d.id}/>
            ))}
            
        </div>
    </div>
  )
}

export default Mainlegals
 