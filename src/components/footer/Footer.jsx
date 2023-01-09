import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './footer.css'

const Footer = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
  return (
    <div className='footer_wrapper'>
      <div className="footer_inner">      
        <div className="m_f_logo" onClick={() =>navigate('/')}>WemaForum</div>
        <div className="m_f_items">
            <span onClick={() =>navigate('/about')}>Kuhusu</span>
            {/* <span>Sadaka</span> */}
            <span>Vigezo</span>
            <span>Faragha</span>
            {user &&
            <span onClick={() => navigate('/opportunities')}>Fursa</span>}
            <span onClick={() => navigate('/contacts')}>Mawasiliano</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
