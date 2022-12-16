import React from 'react'
import { motion } from 'framer-motion';
import Nav from '../../components/nav/Nav';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from "react-hook-form";
import './login.css'
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { FcGoogle } from 'react-icons/fc';
import logo from '../../assets/images/logo500.png'


const Login = () => {
    const [signup, setSignup] = useState('')
    const [go, setGo] = useState(null)
    const [login, setLogin] = useState(0)
    const navigate = useNavigate();
    const { user, signIn, googleSignIn } = useAuth()
    const [loading, setLoading] = useState()
    const [err, setErr] = useState('')
    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const email = watch('email')
    const password = watch('password')

    console.log('user', user)

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

    const signWithGoogle = async (e) => {
        e.preventDefault();

        try {
           await googleSignIn()
           navigate('/')
            
        } catch (error) {
            setErr(error.message)
        }

    }


  return (
    <div className='register'>
        <div className="register_nav">
            <div className="logo" onClick={() => navigate('/')}>
                <img src={logo} alt="" />
            </div>
            <div className="mneu_items">
                <span>Nyumbani</span>
                <span>Kuhusu sisi</span>             
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
            {err && 
            <Error err={err} setErr={setErr}/>}
           
            <div className="register_form">
                <div className="items_group">
                    <h3 className='item_title'>
                        {login === 1? 'Umechagua kuingia kwa Google' : 
                        login === 2 ? 'Umechagua kuingia kwa Email na Password' : 
                        'Chagua njia ya Kuingia'}
                        </h3>
                    {login === 0 &&
                    <div className="selection_btns">                                              
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='2' 
                                value='google' 
                                name='signup' 
                                onClick={() => setLogin(1)}
                                {...register("signup", { required: true })}
                                />
                            <label htmlFor="2" className='g_signup'><FcGoogle/>Google</label>
                        </div>                     
                        
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='1' 
                                value='normal' 
                                name='signup' 
                                onClick={() => setLogin(2)}
                                />
                            <label htmlFor="1" className='g_signup'>Barua Pepe na Neno la Siri</label>
                        </div>
                       
                     
                    </div>}
                    
                </div>
                {login === 2 && 
                
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
                        <button className='btn_reg' onClick={handleLogin}>{loading && !err? <Loading/>  : 'INGIA'}</button>
                    </div>
                    <div className="profile_photo_edit">                            
                        <button className='btn_cancel' onClick={() =>setLogin(0)}>ONDOA</button>
                    </div>
                </motion.div>
                }
                 {login === 1 && 
                
                <motion.div 
                    initial={{y:'100vh', opacity:0}}
                    animate={{y: '0', opacity:1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    style={{width:'100%'}} >       
                    <div className="items_group">
                        <button className='btn_reg' onClick={signWithGoogle}>{loading && !err? <Loading/>  : 'INGIA'}</button>
                    </div>
                    <div className="profile_photo_edit">                            
                        <button className='btn_cancel' onClick={() =>setLogin(0)}>ONDOA</button>
                    </div>
                </motion.div>
                }
            
                </div>
               
               </motion.div>
    </div>
  )
}

export default Login
