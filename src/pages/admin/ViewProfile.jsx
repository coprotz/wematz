import React from 'react'
import {GrClose } from "react-icons/gr";
import useData from '../../hooks/useData';
import Vappoint from './Vappoint';
import Vchat from './Vchat';
import Vsms from './Vsms';

const ViewProfile = ({setView, view}) => {
  const { users, doctors, chats, messages, appoints } = useData()
  const dr_userId = doctors?.find(d => d.id === view.id)?.userId
  const vchats = chats.filter(c =>c?.members.includes(`${view?.id}`))
  const vsms = messages?.filter(m => m.uid === dr_userId)
  const incomes = vsms?.length * 0.1
  const vappoints = appoints?.filter(a => a.doctor_id === view?.id)
  // console.log('vchats', vchats)
  // console.log('dr_userId', dr_userId)

  return (
    <div className='view_outer'>
      <div className='view_wrapper'>
        <div className='view_inner_top'>
          <button className='btn_btn' onClick={() => setView(null)}><GrClose/></button>
        </div>
        <div className='view_body'>          
          <div className='view_photo'>
            <img src={view.photo}/>
          </div>
          <h1 className='view_inner'>{view.name}</h1>
        </div>
        <div className="view_inner1">
          <h3>{view.hospital}</h3>,
          <span>{view.clinic}</span>
        </div> 
        <div className="view_inner1">
          <h2>{view.specialize}</h2>         
        </div>   
        <div className="admin_top view_card">
          <div className="admin_card">
            <div className="card_title1">
              <span>{vchats?.length}</span>
              <h3>Chats</h3>
            </div>           
          </div>
          <div className="admin_card">
            <div className="card_title1">
              <span>{vsms?.length}</span>
              <h3>Messages</h3>
            </div>           
          </div>
          <div className="admin_card">
            <div className="card_title1">
              <span>{vappoints?.length}</span>
              <h3>Appointments</h3>
            </div>           
          </div>
          <div className="admin_card">
            <div className="card_title1">
              <span>$ {(incomes).toFixed(2)}</span>
              <h3>Incomes</h3>
            </div>           
          </div>
          
        </div>
        <div className="view_updates">
          <div className="view_update_card">
            <div className="title">Recent Chats</div>
            <div className="v_chats_wrapper">
              {vchats?.slice(0,5).map(v => (
                <Vchat key={v.id} item_id={dr_userId} item={v}/>
              ))}       
            </div>
          </div>
          <div className="view_update_card">
            <div className="title">Recent Messages</div>
            <div className="v_messages_wrapper">
              {vsms?.slice(0,3).map(item => (
                <Vsms item={item} key={item.id}/>
              ))}            
             
            </div>
          </div>
          <div className="view_update_card">
            <div className="title">Recent Appointments</div>
            <div className="v_chats_wrapper">
              {vappoints?.slice(0,5).map(item => (
                <Vappoint item={item} key={item.id}/>
              ))}        
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ViewProfile
