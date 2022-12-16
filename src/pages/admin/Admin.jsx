import React, { useState } from 'react'
import {  BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import useData from '../../hooks/useData';
import './admin.css'
import moment from 'moment';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, useAuth } from '../../hooks/useAuth';
import Loading from '../../components/loading/Loading';
import Doctors from './Doctors';
import Lawyers from './Lawyers';
import Users from './Users';
import Nikah from './Nikah';
import Mujaheed from './Mujaheed';
import Admins from './Admins';

const Admin = () => {
  const navigate = useNavigate()
  const [add, setAdd] = useState(null)
  const { doctors, lawyers, marriages, users, donates } = useData();
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(null)
  const [active, setActive] = useState(null)
  const { setNewMada } = useAuth()

  const admins = users.filter(u =>u.isAdmin == true)

  // console.log('admins', admins)


  const RenderPage = () => {
    if(page === 1) {
      return (     
      <div className='admin_wrapper'>
        <div className="top_wrapper">
          <div className="dash_top">            
            <button onClick={() => navigate(-1)} className='btn_btn'><BsArrowLeft/></button>
            <h4 className='title'>Dashboard</h4> 
          </div> 
          
        </div>
        
        <div className="admin_top">
            <div className="admin_card" onClick={() => setPage(2)}>
              <div className="card_title1">
                <span>{doctors?.length}</span>
                <h3>Doctors</h3>
              </div>           
            </div>
            <div className="admin_card" onClick={() => setPage(3)}>
              <div className="card_title1">
                <span>{lawyers?.length}</span>
                <h3>Lawyers</h3>
              </div>           
            </div>
            <div className="admin_card" onClick={() => setPage(4)}>
              <div className="card_title1">
                <span>{users?.length}</span>
                <h3>Users</h3>
              </div>           
            </div>
            <div className="admin_card" onClick={() => setPage(5)}>
              <div className="card_title1">
                <span>{marriages?.length}</span>
                <h3>Nikah</h3>
              </div>           
            </div>
            <div className="admin_card" onClick={() => setPage(6)}>
              <div className="card_title1">
                <span>{donates?.length}</span>
                <h3>Mujaheed</h3>
              </div>           
            </div>
            <div className="admin_card" onClick={() => setPage(7)}>
              <div className="card_title1">
                <span>{admins?.length}</span>
                <h3>Admins</h3>
              </div>           
            </div>
          
        </div>
        <div className="admins_info">
          <div className="a_info_card">

          </div>
          <div className="a_info_card">
            
          </div>
          <div className="a_info_card admin_mada" onClick={() => setNewMada(true)}>
              <h3>Add Mada of the Week</h3>
          </div>
        </div>
      </div> 
      )
    }else if(page === 2){
      return (
       <Doctors setPage={setPage} />
      )
    }else if(page === 3){
      return (
       <Lawyers setPage={setPage} />
      )
    }else if(page === 4){
      return (
       <Users setPage={setPage} />
      )
    }else if(page === 5){
      return (
       <Nikah setPage={setPage} />
      )
    }else if(page === 6){
      return (
       <Mujaheed setPage={setPage} />
      )
    }else if(page === 6){
      return (
       <Mujaheed setPage={setPage} />
      )
    }else if(page === 7){
      return (
       <Admins setPage={setPage} />
      )
    }
  }
  return (
    <div className="admin_container">     
      {RenderPage()}     
    </div>
  )
}

export default Admin
