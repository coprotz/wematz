import React from 'react'
import { useState } from 'react'
import './button.css'

const Button = ({active, setActive}) => {
    // const [active, setActive] = useState(null)
  return (
    <div className={active? 'm_active': "m_button"} onClick={() => setActive(!active)}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}

export default Button
