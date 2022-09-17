import React from 'react'
import { useState } from 'react'
import './donate.css'

const Donate = ({setDonate}) => {
    const [cont, setCont] = useState('')
  return (
    <div className="nikah_donate">
    <h2>Please support us to view this page</h2>
    <h3>Select  your donation</h3>
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
                
    </div>
    <button 
        className='btn_cont' 
        onClick={() => setDonate(false)}
        disabled={cont === ''}
        >Continue</button>
    
</div>
  )
}

export default Donate
