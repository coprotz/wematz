import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo_512.png'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'


const Nav = () => {
    const navigate = useNavigate()
    const { user, logOut } = useAuth()
    const { users } = useData()
    const cuUser = users?.find(u => u.id === user?.uid)
    const [show, setShow] = useState(null)

    const handleLogout = async () => {
        await updateDoc(doc(db, 'users', `${cuUser?.id}`), { isOnline: false})
        await logOut()
      
    }
  return (
    <div className="register_nav">
        <div className="logo" style={{width:'90px', height: '90px'}} onClick={() => navigate('/')}>
            <img src={logo} alt="" />
        </div>
        <div className="mneu_items">
            <span onClick={() =>navigate('/')}>Nyumbani</span>
            <span onClick={() =>navigate('/about')}>Kuhusu</span>
            {/* <span>Bei</span> */}
            <span onClick={() =>navigate('/contacts')}>Mawasiliano</span>
        </div>
        {cuUser ? 
        <div className='nav_actions'>        
            <div className="profile_img" onClick={() => navigate('/')}>
                <img src={cuUser?.photo ? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar} />
            </div>
            <div className="user_action" onMouseEnter={() =>setShow(true)} onMouseLeave={() =>setShow(false)}>
                <button className='btn_btn' ><BsThreeDotsVertical/></button>
                {show &&
                <div className="user_menu">
                    <span onClick={() => {navigate('/');setShow(null)}}>Nyumbani</span>
                    <span onClick={() => {navigate('/mjaheed');setShow(null)}}>Kuwa Mjaheed</span> 
                    <span onClick={() => {navigate('/myAccounts');setShow(null)}}>Akaunti Zangu</span> 
                    {/* {isMarry &&
                    <span onClick={() => {navigate(`/nikah/${marry?.id}`);setShow(null)}}>Wasifu wa Nikah</span>
                    } */}
                    <span onClick={() => {navigate('/subscriptions');setShow(null)}}>Unga Mkono</span>                      
                    <span onClick={handleLogout}>ONDOKA</span>
                </div>}
            </div>
        </div>
        :
    
        <div className="sign_in">
            {/* <span>Tayari ni mwanachama?</span> */}
            <button className='btn_sign' onClick={() =>navigate('/login')}>Ingia</button>
        </div>}
    </div>
  )
}

export default Nav
