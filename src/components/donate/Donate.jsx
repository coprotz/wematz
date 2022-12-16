import React from 'react'
// import { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import './donate.css'

const Donate = () => {
    // const [cont, setCont] = useState('')
    const navigate = useNavigate()
  return (
    <div className="nikah_donate">
    <h2>Tunaomba utuunge mkono ili kuangalia ukurasa huu</h2>
    {/* <h3>Select  your donation</h3>
    <div className="support">
        <label htmlFor="2">
            <input 
                type="radio" 
                name='donate' 
                value='$2' 
                id='2'
                onChange={(e) => setCont(e.target.value)}
                />$2
        </label>
        <label htmlFor="5">
            <input 
                type="radio" 
                name='donate' 
                value='$5' 
                id='5'
                onChange={(e) => setCont(e.target.value)}
                />$5
        </label>
        <label htmlFor="10">
            <input 
                type="radio" 
                name='donate' 
                value='$10' 
                id='10'
                onChange={(e) => setCont(e.target.value)}
                />$10
        </label>
        <label htmlFor="20">
            <input 
                type="radio" 
                name='donate' 
                value='$20' 
                id='20'
                onChange={(e) => setCont(e.target.value)}
                />$20
        </label>
        <label htmlFor="50">
            <input 
                type="radio" 
                name='donate' 
                value='$50' 
                id='50'
                onChange={(e) => setCont(e.target.value)}
                />$50
        </label>
        <label htmlFor="100">
            <input 
                type="radio" 
                name='donate' 
                value='$100' 
                id='100'
                onChange={(e) => setCont(e.target.value)}
                />$100
        </label> 
                
    </div> */}
    <button 
        className='btn_cont' 
        onClick={() => navigate('/subscriptions')}
        
        >Endelea</button>
    
</div>
  )
}

export default Donate
