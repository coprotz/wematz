import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate()
  return (
    <div className="register_nav">
        <div className="logo" onClick={() => navigate(-1)}>
            Wema
        </div>
        <div className="mneu_items">
            <span>Nyumbani</span>
            <span>Kuhusu sisi</span>
            <span>Bei</span>
            <span>Mawasiliano</span>
        </div>
        <div className="sign_in">
            <span>Tayari ni mwanachama?</span>
            <button className='btn_sign' onClick={() =>navigate('/home/posts')}>Ingia</button>
        </div>
    </div>
  )
}

export default Nav
