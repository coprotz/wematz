import React from 'react'
import { GoLaw } from "react-icons/go";
import Search from '../../components/search/Search';
// import { lawyers } from '../../data';
import useData from '../../hooks/useData';
// import CreateMada from '../mada/CreateMada';
import LawyerCard from './LawyerCard';
import './legals.css'


const Mainlegals = () => {

  const { lawyers } = useData()

  console.log('lawyers', lawyers)
  
  return (
    <div className='main_legals'>
      
        {/* <CreateMada/> */}
        <div className="health_top">
            <div className="health_t_1">
                <h1>Kona ya Sheria</h1>
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
            {lawyers.map(d => (
              <LawyerCard d={d}/>
            ))}
            
        </div>
    </div>
  )
}

export default Mainlegals
 