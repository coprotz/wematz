import React from 'react'
// import me from '../../assets/images/img8.jpg'
import './navbar.css'
import {  BsThreeDotsVertical,BsBell } from "react-icons/bs";
import Search from '../search/Search';
import { useNavigate } from 'react-router-dom'
import Button from '../button/Button';
import { useState } from 'react';
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import Alerts from '../alert/Alerts';
import CreateMada from '../../pages/mada/CreateMada';
import logo from '../../assets/images/logo512.png'
import { doc, updateDoc } from 'firebase/firestore';


const Navbar = ({active, setActive}) => {
    const navigate = useNavigate();

    const { user, logOut, newMada, setNewMada } = useAuth()  
    const { users,doctors, lawyers, notifics, marriages } = useData() 

    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(m => m.userId === user.uid)
    const isMarry = user.uid === marry?.userId
    const [alert, setAlert] = useState(null)

    const [show, setShow] = useState(null)
    // const [photo, setPhoto] = useState(null)

    // const dr = doctors?.find(d => d.userId === user.uid)
    // const law = lawyers?.find(l =>l.userId === user.uid)

    const othernots = notifics?.filter(n => n?.target_ids?.includes(`${user.uid}`))
    // const othernots2 = notifics?.filter(n => n?.target_ids?.find(m =>m===user.uid))
    // const othernots3 = notifics?.filter(n => n?.target_ids?.find(m =>m===user.uid))

    // console.log('othernots', othernots)
    // console.log('othernots2', othernots2)

    const usernots = notifics?.filter(n => n.target_id === user.uid)
    // const drnots = notifics?.filter(n => n.target_id === dr?.id)
    // const lawnots = notifics?.filter(n => n.target_id === law?.id)
    // const marrynots = notifics?.filter(n => n.target_id === marry?.id)

    // const a = drnots.concat(usernots)
    // const b = a.concat(lawnots)
    // const c = b.concat(othernots)
    const allnots = othernots.concat(usernots)
    const mynots = allnots?.filter(a => !a.seen?.includes(`${user.uid}`)).filter(n => n.uid !== user.uid)

    // console.log('cuUser', cuUser)


    const handleLogout = async () => {
        await updateDoc(doc(db, 'users', `${cuUser?.id}`), { isOnline: false})
        await logOut()
      
    }
 
   
  return (
    <div className="home_top_wrapper">
        {newMada && <CreateMada/>} 
        {alert && <Alerts setAlert={setAlert} allnots={mynots}/>}
          
        <div className="home_top">
            <div className="home_logo">
                <div className="logo nav_logo" onClick={() => navigate('/')}>
                    <img src={logo} alt="" />
                </div>
                <Button active={active} setActive={setActive} onClick={() =>setActive(false)}/>
            </div>
            <div className="home_profile">          
                <div className="profile">             
                    <div className="notify">
                        <button className='btn_btn' onClick={() =>setAlert(true)}><BsBell /></button> 
                        {mynots?.length > 0 && <span className="nots_true"></span> }                                        
                    </div>               
                    <div className="profile_img">
                        {cuUser?.photo ? <img src={cuUser?.photo} alt="" />: 
                        <div 
                            className='avatar2'
                            style={{backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`, height:'35px', width:'35px'}}
                            >{cuUser?.name[0]}
                        </div>
                        } 
                        {/* <img src={cuUser?.photo ? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar} /> */}
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
            </div>
        </div>
    </div>
  )
}

export default Navbar