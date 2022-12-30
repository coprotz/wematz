import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Loading from './Loading'
import { FcHighPriority } from 'react-icons/fc';

const LoadingPage = () => {
  const [counts, setCounts] = useState(0)
  const navigate = useNavigate()
  const { user, logOut, } = useAuth()

  // console.log('user', user)

  useEffect(() => {
    setInterval(() => {
      setCounts(5)
    },5000)
  },[])
  
  return (
    <div className='loading_page'>
        {counts === 5? 
          <div className='login_failure'>
            <FcHighPriority/>
            <h1>Kuna kitu hakipo sawa...</h1>
            {/* <button onClick={() =>logOut()} className='btn_reg'>Nyumbani</button> */}
            <button onClick={() =>navigate('/')} className='btn_reg'>Rudi Nyumbani</button>
          </div> : <Loading/>}
    </div>
  )
}

export default LoadingPage
