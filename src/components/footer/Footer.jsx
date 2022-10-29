import React from 'react'
import { useNavigate } from 'react-router-dom'
import './footer.css'

const Footer = () => {
    const navigate = useNavigate()
  return (
    <div className='footer_wrapper'>
        <div className="m_f_logo">Wema</div>
        <div className="m_f_items">
            <span>Kuhusu</span>
            {/* <span>Sadaka</span> */}
            <span>Vigezo</span>
            <span>Faragha</span>
            <span onClick={() => navigate('/opportunities')}>Fursa</span>
            <span>Mawasiliano</span>
        </div>
    </div>
  )
}

export default Footer
