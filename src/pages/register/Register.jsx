import React from 'react'
import './register.css'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { ages, heights, tribes, weight } from '../../data';
import { useState } from 'react';



const Register = () => {
    const navigate = useNavigate();
    const [gender, setGender] = useState('')
    const [religion, setReligion] = useState('')
    const [nikah, setNikah] = useState('')
    const [signup, setSignup] = useState('')
    const [revert, setRevert] = useState('')

    console.log('gender', gender)
    console.log('revert', revert)
  return (
    <div className='register'>
        <div className="register_nav">
            <div className="logo" onClick={() => navigate('/')}>
                Forum
            </div>
            <div className="mneu_items">
                <span>Nyumbani</span>
                <span>Kuhusu sisi</span>
                <span>Bei</span>
                <span>Mawasiliano</span>
            </div>
            <div className="sign_in">
                <span>Tayari ni mwanachama?</span>
                <button className='btn_sign' onClick={() =>navigate('/home/posts')}>Ingia</button>
            </div>
        </div>
        <motion.div 
             initial={{ y:'100vw'}}
             animate={{y:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }} 
            className="register_body">
            <h1 className='register_title'>Tunaomba utupe taarifa zako</h1>
            <span className='res_span'></span>
            <div className="register_form">
                <div className="items_group">
                    <h3 className='item_title'>Chagua njia ya Kuingia</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='1' value='normal' name='signup' onChange={(e) => setSignup(e.target.value)}/>
                            <label htmlFor="1">Barua Pepe na Neno la Siri</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='2' value='google' name='signup' onChange={(e) => setSignup(e.target.value)}/>
                            <label htmlFor="2">Google</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='3' value='facebook' name='signup' onChange={(e) => setSignup(e.target.value)}/>
                            <label htmlFor="3">Facebook</label>
                        </div>
                     
                    </div>
                    
                </div>
                {signup === 'normal' && 
                
                <motion.div 
                    initial={{y:'100vh', opacity:0}}
                    animate={{y: '0', opacity:1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }} >
                    <div className="items_group">
                        <h3 className='item_title'>Jina la kutumika</h3>
                        <div className="sel_items">

                            <input 
                            type="text" 
                            placeholder='Jina la Kutumika'
                            className='sel_input'
                            name='username'
                            /> 
                        </div>
                       
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Neno la Siri</h3>
                        <div className="sel_items">

                            <input 
                            type="password" 
                            placeholder='Neno la Siri'
                            className='sel_input'
                            name='password'
                            />
                        </div>
                        
                        
                    </div>
                </motion.div>
                }
                {signup === 'google'  && 
                <motion.div 
                    initial={{y:'100vh', opacity:0}}
                    animate={{y: '0', opacity:1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }} 
                    className="items_group">
                        <h3 className='item_title'>Barua Pepe</h3>
                        <div className="sel_items">

                             <input 
                            type="email" 
                            placeholder='forum@forum.com'
                            className='sel_input'
                            name='email'
                            />
                        </div>
                       
                        
                 
                </motion.div>
                }
                {signup === 'facebook' && 
                <motion.div 
                    initial={{y:'100vh', opacity:0}}
                    animate={{y: '0', opacity:1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className="items_group">
                        <h3 className='item_title'>Barua Pepe</h3>
                        <div className="sel_items">
                            <input 
                            type="email" 
                            placeholder='forum@forum.com'
                            className='sel_input'
                            name='email'
                            />
                        </div>
                </motion.div>                
                }
               
                
                <div className="items_group">
                    <h3 className='item_title'>Chagua Iinsia</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='17' value='M' name='gender' onChange={(e) =>setGender(e.target.value)}/>
                            <label htmlFor="17">Mume</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='18' value='F' name='gender' onChange={(e) =>setGender(e.target.value)}/>
                            <label htmlFor="18">Mke</label>
                        </div>
                      </div>
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Umri</h3>
                    <div className="sel_items">
                            <select name='tribe'  className='sel_input'>                                    
                                    {ages.map((age, index) => (
                                    <option value={age} key={index}>{age}</option> 
                                    ))}
                                
                            </select>                          
                        </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Chagua Dini yako</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='4' value='islam' name='religion' onChange={e => setReligion(e.target.value)}/>
                            <label htmlFor="4">Muislamu</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='5' value='christian' name='religion' onChange={e => setReligion(e.target.value)}/>
                            <label htmlFor="5">Mkristu</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='6' value='others' name='religion' onChange={e => setReligion(e.target.value)}/>
                            <label htmlFor="6">Dini nyingine</label>
                        </div>
                     
                    </div>
                    
                </div>
                {religion === 'islam' && <>
              
                <div className="items_group">
                    <h3 className='item_title'>Muislamu kwa</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='411' value='birth' name='religion'/>
                            <label htmlFor="411">Kuzaliwa</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='511' value='revert' name='religion'/>
                            <label htmlFor="511">Ulibadili Dini</label>
                        </div>                      
                     
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Chagua Dhehebu lako</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='7' value='Sunni' name='set'/>
                            <label htmlFor="7">Sunni</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='8' value='Sarafi' name='set'/>
                            <label htmlFor="8">Sarafi</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='9' value='Shia' name='set'/>
                            <label htmlFor="9">Shia</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='10' value='Ibadhi' name='set'/>
                            <label htmlFor="10">Ibadhi</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='11' value='Kadiani' name='set'/>
                            <label htmlFor="11">Kadiani</label>
                        </div>
                        
                     
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Jina la Msikiti unaoswalia unapokuwa Morogoro</h3>
                    <div className="sel_items">

                        <input 
                        type="text" 
                        placeholder='Jina la Msikiti'
                        className='sel_input'
                        name='mosque'
                        />
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Kiwango chako cha Quran</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='29' value='Alfatha' name='quran'/>
                            <label htmlFor="29">Najua Alfatha tu</label>
                        </div>  
                        <div className="sel_item">
                            <input type="radio" id='21' value='Juzuu Amma' name='quran'/>
                            <label htmlFor="21">Juzuu Amma</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='22' value='Msahafu' name='quran'/>
                            <label htmlFor="22">Nasoma Mashafu</label>
                        </div>  
                        <div className="sel_item">
                            <input type="radio" id='23' value='Sijui' name='quran'/>
                            <label htmlFor="23">Sijui Quran</label>
                        </div>                                    
                    </div>
                </div>
                </>}

                {religion === 'christian' && <>
                <div className="items_group">
                    <h3 className='item_title'>Una Mpango wa kuwa Muislamu?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='12' value='Ndio' name='revert' onChange={e =>setRevert(e.target.value)}/>
                            <label htmlFor="12">Ndio</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='13' value='Hapana' name='revert' onChange={e =>setRevert(e.target.value)}/>
                            <label htmlFor="13">Hapana</label>
                        </div>                 
                    </div>
                    
                </div>
                {revert === 'Ndio'  && <>                
                <div className="items_group">
                    <h3 className='item_title'>Kwanini unataka kuwa Muislamu?</h3>                   
                    <textarea  name='revert' placeholder='Tunaomba Sababu Tafadhari' className='sel_textarea'/>                  
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Lini unataraji kusilimu?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='14' value='Mwaka huu' name='revert_plan'/>
                            <label htmlFor="14">Mwaka huu</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='15' value='Mwakani' name='revert_plan'/>
                            <label htmlFor="15">Mwakani</label>
                        </div>  
                        <div className="sel_item">
                            <input type="radio" id='16' value='sijapanga' name='revert_plan'/>
                            <label htmlFor="16">Bado sijapanga</label>
                        </div>                
                    </div>
                </div>
                </>}
                
                
                </>}
                {religion === 'others' && <>
                <div className="items_group">
                    <h3 className='item_title'>Una Mpango wa kuwa Muislamu?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='12' value='Ndio' name='revert' onChange={e =>setRevert(e.target.value)}/>
                            <label htmlFor="12">Ndio</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='13' value='Hapana' name='revert' onChange={e =>setRevert(e.target.value)}/>
                            <label htmlFor="13">Hapana</label>
                        </div>                 
                    </div>
                    
                </div>
                {revert === 'Ndio'  && <>                
                <div className="items_group">
                    <h3 className='item_title'>Kwanini unataka kuwa Muislamu?</h3>  
                    <div className="sel_items">
                        <textarea  name='revert' placeholder='Tunaomba Sababu Tafadhari' className='sel_textarea'/>  
                    </div>                 
                                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Lini unataraji kusilimu?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='14' value='Mwaka huu' name='revert_plan'/>
                            <label htmlFor="14">Mwaka huu</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='15' value='Mwakani' name='revert_plan'/>
                            <label htmlFor="15">Mwakani</label>
                        </div>  
                        <div className="sel_item">
                            <input type="radio" id='16' value='sijapanga' name='revert_plan'/>
                            <label htmlFor="16">Bado sijapanga</label>
                        </div>                
                    </div>
                </div>
                </>}
                
                
                </>}

                {religion === 'islam' && <>
    
                <div className="items_group">
                    <h3 className='item_title'>Kiwango chako cha Elimu</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='25' value='Cheti' name='edu'/>
                            <label htmlFor="25">Cheti</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='26' value='Stashahada' name='edu'/>
                            <label htmlFor="26">Stashahada</label>
                        </div>  
                        <div className="sel_item">
                            <input type="radio" id='27' value='Shahada' name='edu'/>
                            <label htmlFor="27">Shahada</label>
                        </div>   
                        <div className="sel_item">
                            <input type="radio" id='28' value='Zaidi' name='edu'/>
                            <label htmlFor="28">Zaidi ya Shahada</label>
                        </div>              
                    </div>
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Tuambie ujuzi ulionao</h3>
                    <div className="sel_items">

                         <input 
                        type="text" 
                        placeholder='Ujuzi ulionao'
                        className='sel_input'
                        name='profession'
                        />
                    </div>
                   
                </div>
               
                <div className="items_group">
                    <h3 className='item_title'>Una mpango wa kutafuta Mwenza (Nikah) humu?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='100' value='ndio' name='nikah' onChange={e => setNikah(e.target.value)}/>
                            <label htmlFor="100">Ndio</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='101' value='hapana' name='nikah' onChange={e => setNikah(e.target.value)}/>
                            <label htmlFor="101">Hapana</label>
                        </div>
                       
                     
                    </div>
                    
                </div>
                </>}
                {religion === 'islam' && nikah === 'ndio' &&<>
                <div className="items_group">
                    <h3 className='item_title'>Kabila lako</h3>
                    <div className="selection_btns">
                        <div className="sel_items">
                            <select name='tribe'  className='sel_input'>
                                    <option value='' >Chagua</option> 
                                    {tribes.map((age, index) => (
                                    <option value={age} key={index}>{age}</option> 
                                    ))}
                                
                            </select>                          
                        </div>
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Urefu wako</h3>
                    <div className="selection_btns">
                        <div className="sel_items">
                        <select name='height'  className='sel_input'>
                                <option value='' >Chagua</option> 
                                {heights.map((item, index) => (
                                   <option value={item} key={index}>{item} cm</option> 
                                ))}
                               
                            </select>                          
                        </div>
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Uzito wako</h3>
                    <div className="selection_btns">
                        <div className="sel_items">
                        <select name='weight'  className='sel_input'>
                                <option value='' >Chagua</option> 
                                {weight.map((item, index) => (
                                   <option value={item} key={index}>{item} kg</option> 
                                ))}
                               
                            </select>                          
                        </div>
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Aina la umbile lako</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='1001' value='ndio' name='body'/>
                            <label htmlFor="1001">Mnene</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='1011' value='hapana' name='body'/>
                            <label htmlFor="1011">Mwembamba</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='1012' value='hapana' name='body'/>
                            <label htmlFor="1012">Mwenye misuli</label>
                        </div>
                       
                     
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Hali yako ya ndoa</h3>
                    <div className="selection_btns">
                        {gender === 'M' &&<>  
                        <div className="sel_item">
                            <input type="radio" id='10011' value='Sijaoa' name='marital'/>
                            <label htmlFor="10011">Sijaoa</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='10113' value='Nimetaliki' name='marital'/>
                            <label htmlFor="10113">Nimetaliki</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='10115' value='Naongeza Mke' name='marital'/>
                            <label htmlFor="10115">Naongeza Mke</label>
                        </div>
                        </>}
                        {gender === 'F' &&<>           
                        <div className="sel_item">
                            <input type="radio" id='10111' value='Sijaolewa' name='marital'/>
                            <label htmlFor="10111">Sijaolewa</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='10112' value='Nimetalikiwa' name='marital'/>
                            <label htmlFor="10112">Nimetalikiwa</label>
                        </div></>}
                        
                        <div className="sel_item">
                            <input type="radio" id='10114' value='Mjane' name='marital'/>
                            <label htmlFor="10114">Mjane</label>
                        </div>
                       
                       
                     
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Una mtoto au watoto?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='10011' value='Sina' name='child'/>
                            <label htmlFor="10011">Sina</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='10111' value='Ninao naishi nao' name='child'/>
                            <label htmlFor="10111">Ninae-ninao naishi nao</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='10112' value='Ninao siishi nao' name='child'/>
                            <label htmlFor="10112">Ninae-ninao siishi nao</label>
                        </div>
                       
                     
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Una ishi na nani?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input type="radio" id='100111' value='Peke yangu' name='live'/>
                            <label htmlFor="100111">Peke yangu</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='101112' value='Na familia' name='live'/>
                            <label htmlFor="101112">Na familia</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='101123' value='Na marafiki' name='live'/>
                            <label htmlFor="101123">Na marafiki</label>
                        </div>
                       
                     
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Maelezo kwa ufupi juu ya sifa za ziada ya mwenza unayemtafuta</h3>  
                    <div className="sel_items">
                        <textarea  name='desc' placeholder='Sifa za ziada' className='sel_textarea'/> 
                    </div>                 
                                     
                </div></>}
                
               
                <div className="items_group">
                    <button className='btn_reg' onClick={() =>navigate('/home/posts')}>TUMA USAJIRI</button>
                </div>
                
                
            </div>
        </motion.div>
      
    </div>
  )
}

export default Register
