import React from 'react'
import { motion } from 'framer-motion';
import Nav from '../../components/nav/Nav';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from "react-hook-form";
import './login.css'


const Login = () => {
    const [signup, setSignup] = useState('')
    const navigate = useNavigate();
    const { user, signIn } = useAuth()
    const [loading, setLoading] = useState()
    const [err, setErr] = useState('')
    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const email = watch('email')
    const password = watch('password')

    const handleLogin = async(e)=> {
        e.preventDefault()

        setLoading(true)

        try {
            await signIn(email, password)
            navigate('/')
        } catch (error) {
            setErr(error.message);
        }
    }

  return (
    <div className='register'>
        <div className="register_nav">
            <div className="logo" onClick={() => navigate('/')}>
                Wema
            </div>
            <div className="mneu_items">
                <span>Nyumbani</span>
                <span>Kuhusu sisi</span>
                <span>Bei</span>
                <span>Mawasiliano</span>
            </div>
            <div className="sign_in">
                <span>Sio mwanachama?</span>
                <button className='btn_sign' onClick={() =>navigate('/register')}>Jisajiri</button>
            </div>
        </div>
        <motion.div 
             initial={{ y:'100vw'}}
             animate={{y:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }} 
            className="register_body">
            <h1 className='register_title'>Weka Taarifa Kuingia</h1>
            <span className='res_span'></span>
            {err && <span>{err}</span>}
            <div className="register_form">
                <div className="items_group">
                    <h3 className='item_title'>Chagua njia ya Kuingia</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='1' 
                                value='normal' 
                                name='signup' 
                                onChange={(e) => setSignup(e.target.value)}
                                />
                            <label htmlFor="1">Barua Pepe na Neno la Siri</label>
                        </div>
                        {signup !== 'normal' && <>
                        
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='2' value='google' 
                                name='signup' 
                                onChange={(e) => setSignup(e.target.value)}
                                />
                            <label htmlFor="2">Google</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='3' 
                                value='facebook' 
                                name='signup' 
                                onChange={(e) => setSignup(e.target.value)}
                                />
                            <label htmlFor="3">Facebook</label>
                        </div>
                        </>}
                     
                    </div>
                    
                </div>
                {signup === 'normal' && 
                
                <motion.div 
                    initial={{y:'100vh', opacity:0}}
                    animate={{y: '0', opacity:1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    style={{width:'100%'}} >
                    <div className="items_group">
                        <h3 className='item_title'>Barua pepe</h3>
                        <div className="sel_items">

                            <input 
                            type="text" 
                            placeholder='Barua Pepe'
                            className='sel_input login_input'
                            name='email'
                            {...register("email", { required: true })}
                            /> 
                        </div>
                       
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Neno la Siri</h3>
                        <div className="sel_items">

                            <input 
                            type="password" 
                            placeholder='Neno la Siri'
                            className='sel_input login_input'
                            name='password'
                            {...register("password", { required: true })}
                            />
                        </div>
                        
                        
                    </div>
                    <div className="items_group">
                        <button className='btn_reg' onClick={handleLogin}>INGIA</button>
                    </div>
                    <div className="profile_photo_edit">                            
                        <button className='btn_cancel' onClick={() =>setSignup('')}>ONDOA</button>
                    </div>
                </motion.div>
                }
            
                </div>
               
               </motion.div>
    </div>
  )
}

export default Login
