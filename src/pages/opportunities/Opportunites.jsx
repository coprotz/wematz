import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import './opports.css'


const Opportunities = () => {
  const navigate = useNavigate()
  return (
    <div className='opportunites'>      
      <div className="oppo_head">
        <button onClick={() => navigate(-1)} className='btn'><BsArrowLeft/></button>
        {/* <h1>Karibu katika Fursa</h1> */}
        <h3 className='title'>Karibu katika Fursa</h3>
      </div>
      <div className="oppo_body">
        <h3>Fursa zilizopo sasa</h3>
        <div className="opp_body_inner">
          <button className='btn_sign' onClick={() => navigate('/opportunities/doctors')}>Udaktari</button>
          <button className='btn_sign' onClick={() => navigate('/opportunities/lawyers')}>Uanasheria</button>
        </div>
      </div>            
    </div>
  )
}

export default Opportunities
