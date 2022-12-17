import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo_512.png'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'

const Nav = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { users } = useData()
    const cuUser = users?.find(u => u.id === user?.uid)
  return (
    <div className="register_nav">
        <div className="logo" style={{width:'90px', height: '90px'}} onClick={() => navigate('/')}>
            <img src={logo} alt="" />
        </div>
        <div className="mneu_items">
            <span onClick={() =>navigate('/')}>Nyumbani</span>
            <span onClick={() =>navigate('/about')}>Kuhusu sisi</span>
            {/* <span>Bei</span> */}
            <span onClick={() =>navigate('/contacts')}>Mawasiliano</span>
        </div>
        {cuUser ? 
        
        <div className="profile_img" onClick={() => navigate('/')}>
            <img src={cuUser?.photo ? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar} />
        </div>
        :
    
        <div className="sign_in">
            <span>Tayari ni mwanachama?</span>
            <button className='btn_sign' onClick={() =>navigate('/login')}>Ingia</button>
        </div>}
    </div>
  )
}

export default Nav
