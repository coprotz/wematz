import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import {  HiOutlineArrowLeft } from "react-icons/hi";

const MyAccounts = () => {
    const { user } = useAuth()
    const { marriages, doctors, lawyers, users } = useData()
    const mydoc = doctors?.find(d => d.userId === user.uid)
    const myLaw = lawyers?.find(l => l.userId === user.uid)
    const myMarry = marriages?.find(m => m.userId === user.uid)
    const cuUser = users.find(u => u.id === user.uid)
    const navigate = useNavigate()

  return (
    <div className='my_accounts'>  
        <div className="my_acc_top">
            <button onClick={() =>navigate('/messages')} className='btn_btn'><HiOutlineArrowLeft/></button>
            <h3 className='title'>Akaunti Zangu</h3>
        </div>    
        
        {cuUser &&
        <div className="acc_doc">
            <h4>Mtumiaji wa Kawaida</h4>
            <img src={cuUser?.photo ? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar} />
            <h4>{cuUser?.name}</h4>
            <button className='btn_sign' onClick={() => navigate(`/members/${cuUser?.id}`)}>Angalia Profile</button>
        </div>}
        {mydoc &&
        <div className="acc_doc">
            <h4>Daktari</h4>
            <img src={mydoc?.photo} />
            <h4>{mydoc?.name}</h4>
            <button className='btn_sign' onClick={() => navigate(`/health/doctors/${mydoc?.id}`)}>Angalia Profile</button>
        </div>}
        {myLaw && 
        <div className="acc_doc">
            <h4>Mwanasheria</h4>
            <img src={myLaw?.photo} />
            <h4>{myLaw?.name}</h4>
            <button className='btn_sign' onClick={() => navigate(`/legals/${myLaw?.id}`)}>Angalia Profile</button>
        </div>}
        {myMarry &&
        <div className="acc_doc">
            <h4>Nikah</h4>
            <img src={myMarry?.photo} />
            <h4>{myMarry?.username}</h4>
            <button className='btn_sign' onClick={() => navigate(`/nikah/${myMarry?.id}`)}>Angalia Profile</button>
        </div>}
     
    </div>
  )
}

export default MyAccounts
