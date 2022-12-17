import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo_1.png'

const Nav = () => {
    const navigate = useNavigate()
  return (
    <div className="register_nav">
        <div className="logo" style={{width:'90px', height: '90px'}} onClick={() => navigate('/')}>
            <img src={logo} alt="" />
        </div>
        <div className="mneu_items">
            <span onClick={() =>navigate('/')}>Nyumbani</span>
            <span onClick={() =>navigate('/about')}>Kuhusu sisi</span>
            {/* <span>Bei</span> */}
            <span>Mawasiliano</span>
        </div>
        <div className="sign_in">
            <span>Tayari ni mwanachama?</span>
            <button className='btn_sign' onClick={() =>navigate('/login')}>Ingia</button>
        </div>
    </div>
  )
}

export default Nav
