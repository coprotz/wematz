import React from 'react'
import { GrClose } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import './success.css'


const Success = ({message}) => {
    const navigate = useNavigate()
  return (
    <div className='success_wrapper'>
        <h4 className="success_title">
            Fanikio
            <button className='btn_error' onClick={() => navigate(-1)}><GrClose/></button>
        </h4>
        <span className="success_body">
             {message}
        </span>
       
    </div>
  )
}

export default Success
