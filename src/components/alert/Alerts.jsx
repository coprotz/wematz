import React from 'react'
import { useState } from 'react';
import {GrClose } from "react-icons/gr";
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import AlertCard from './AlertCard';


const Alerts = ({setAlert, allnots}) => {    
    
  return (
    <div className="not_wrapper">
        <div className="not_inner">
            <div className="not_inner_top">
                <h2>Arifa</h2>
                <button className='btn_btn' onClick={() => setAlert(null)}><GrClose/></button>
            </div>
            {allnots?.length > 0 ?
            <div className="alerts_inner">
                {allnots?.map(a => (
                    <AlertCard item={a} key={a.id} allnots={allnots} setAlert={setAlert}/>
                ))}             
            </div>:
            
             <div className="not_inner_body">
                <h1 className='fade_note'>Hakuna Arifa</h1>
            </div> }
        </div>
    </div>
  )
}

export default Alerts
