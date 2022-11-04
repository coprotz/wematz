import React from 'react'
import './error.css'
import {GrClose } from "react-icons/gr";

const Error = ({err, setErr}) => {
  return (
    <div className='error_wrapper'>
        <div className='error_top'>
           <h4 >Makosa</h4> 
           <button className='btn_error' onClick={() => setErr("")}><GrClose/></button>
        </div>
        
        <div className="error_inner">
            <span>{err}</span>
        </div>
    </div>
  )
}

export default Error
