import React from 'react'
import { useState } from 'react'
import Nav from '../../components/nav/Nav'
import './subscript.css'
import { useForm } from "react-hook-form";
// import { useEffect } from 'react';
import { MdSecurity } from "react-icons/md";
import visa from '../../assets/images/visa.png'
import master from '../../assets/images/master.png'


const Subscriptions = () => {
    // const [cont, setCont] = useState('10')
    const [donate, setDonate] = useState('yes')
    const [amount, setAmount] = useState('10')
    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    // useEffect(() => {
    //     setDonate(e.target.value)
    // })

    // const [form, setForm] = useState({
    //     donate: 'yes',
    //     amount: '10'
    // })
    // const subscript = watch('subscript')
    // const donate = watch('donate')
    // const amount = watch('amount')

    console.log('donate', donate)

  return (
    <div className='subscript'>
        <Nav/>
        <div className="subscript_wrapper">
            <div className="subcript_top">
                <h3>Asante kwa kutembelea ukuraha huu, mchango wako ni muhimu kwetu katika kusimamia 
                    tovuti hii kwa manufaa ya wanaWema wote. Kwa masiku yajayo, tutagawana na wanaohitajia misaada</h3>
            </div>
            <div className="subscript_body">
                <div className="sub_body_top">
                    <h3>Utachangia kila Mwezi?</h3>
                    <div className="sub_selection">
                        <input 
                            type="radio" 
                            name='donate' 
                            value= 'yes' 
                            // {...register("subscript", { required: true })}                          
                            onChange={(e) =>setDonate(e.target.value)}
                            /> Ndio
                        <input 
                            type="radio" 
                            name='donate' 
                            value='no'
                            onChange={(e) =>setDonate(e.target.value)}
                            // {...register("subscript", { required: true })}  
                            // onChange={(e) =>setSubscript(e.target.value)}
                            /> Hapana
                    </div>
                </div>
                <div className="sub_body_selection">
                    <span>Chagua kiwango</span>
                    <div className="support"> 
                        <div className="selection_group">                          
                                <input 
                                    type="radio" 
                                    name='amount' 
                                    value='2' 
                                    id='2'
                                    style={{display: 'none'}}
                                    onChange={(e) =>setAmount(e.target.value)}
                                    // {...register("donate", { required: true })} 
                                    // onChange={(e) => setCont(e.target.value)}
                                />
                                <label htmlFor="2">$2</label>
                                </div>
                            
                            <div className="selection_group">   
                                <input 
                                    type="radio" 
                                    name='amount' 
                                    value='5' 
                                    id='5'
                                    style={{display: 'none'}}
                                    // {...register("donate", { required: true })} 
                                    onChange={(e) =>setAmount(e.target.value)}
                                    // onChange={(e) => setCont(e.target.value)}
                                    /> <label htmlFor="5">$5</label>
                                    </div>
                            
                            <div className="selection_group">   
                                <input 
                                    type="radio" 
                                    name='amount' 
                                    value='10' 
                                    id='10'
                                    style={{display: 'none'}}
                                    // checked
                                    // {...register("donate", { required: true })} 
                                    onChange={(e) =>setAmount(e.target.value)}
                                    // onChange={(e) => setCont(e.target.value)}
                                    /><label htmlFor="10">$10</label>
                                    </div>
                            
                            <div className="selection_group">   
                                <input 
                                    type="radio" 
                                    name='amount' 
                                    value='20' 
                                    id='20'
                                    style={{display: 'none'}}
                                    // {...register("donate", { required: true })} 
                                    onChange={(e) =>setAmount(e.target.value)}
                                    // onChange={(e) => setCont(e.target.value)}
                                    /><label htmlFor="20">$20</label>
                                    </div>
                            
                            <div className="selection_group">   
                                <input 
                                    type="radio" 
                                    name='amount' 
                                    value='50' 
                                    id='50'
                                    style={{display: 'none'}}
                                    // {...register("donate", { required: true })} 
                                    onChange={(e) =>setAmount(e.target.value)}
                                    // onChange={(e) => setCont(e.target.value)}
                                    /><label htmlFor="50">$50</label>
                                    </div>
                            
                            <div className="selection_group">                       
                                <input 
                                    type="radio" 
                                    name='amount' 
                                    value='100'
                                    id='100'
                                    style={{display: 'none'}}
                                    // {...register("donate", { required: true })} 
                                    onChange={(e) =>setAmount(e.target.value)}
                                    // onChange={(e) => setCont(e.target.value)}
                                    /> <label htmlFor="100">$100</label> 
                            </div>
                                    
                        </div>
                        <div className="sel_input amount_fig">
                            <div className="figure_details">
                                <span>$</span>
                                <input 
                                    type="text" 
                                    value={amount}
                                    className='fig_input'
                                    name='amount2'
                                    // {...register("amount", { required: true })} 
                                    style={{fontSize: '1.5rem'}}
                                />
                            </div>
                            
                                <span className='donate_opt'>/{donate==='yes'? 'Kila Mwezi': 'Mara Moja'}</span>
                        </div>
                        <button 
                            className='btn_cont' 
                            style={{width: '100%'}}
                            // onClick={() => setDonate(false)}
                            // disabled={cont === ''}
                            >Endelea
                        </button>
                        <div className="pay_status_1">
                            <div className="pay_options">
                                <span><img src={visa} alt="" /></span>
                                <span ><img  src={master} alt="" /></span>
                            </div>
                            <div className="pay_secure">
                                <MdSecurity/>
                                <span>MCHANGO SALAMA</span>
                            </div>
                        </div>
                   
                       
                </div>
               
                

            </div>
        </div>
      
    </div>
  )
}

export default Subscriptions
