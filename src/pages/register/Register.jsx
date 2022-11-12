import React from 'react'
import './register.css'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { ages, blood, heights, regions, tribes, weight } from '../../data';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import Nav from '../../components/nav/Nav';
import { db, useAuth } from '../../hooks/useAuth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';



const Register = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(null)

    const { signUp } = useAuth()
    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const email = watch('email')
    const password = watch('password')
    const signup = watch('signup')
    const fname = watch('fname')
    const lname = watch('lname')
    const gender = watch('gender')
    const age = watch('age')
    const religion = watch('religion')
    const islam = watch('islam')
    const set = watch('set')
    const mosque = watch('mosque')
    const quran = watch('quran')
    const revert = watch('revert')
    const revert_res = watch('revert_res')
    const revert_plan = watch('revert_plan')
    const edu = watch('edu')
    const emplo = watch('emplo')
    const prayer = watch('prayer')
    const profes = watch('profes')
    const location = watch('location')



    const handleRegister = async(e) => {
        e.preventDefault()

        setLoading(true)
        
        const data = {
            email,           
            fname,
            lname,
            photo: '',
            gender,
            email,
            emplo,
            age,
            religion,
            profes,
            islam,
            set,
            mosque,
            location,
            prayer,
            quran,
            revert: 'NA' || revert,
            revert_res: 'NA' || revert_res,
            revert_plan: 'NA' || revert_plan,
            edu,
       
        }

        try {
            const newUser = await signUp(email, password)
            await setDoc(doc(db, 'users', `${newUser.user.uid}`), {
                ...data,
                createdAt: serverTimestamp()
            })
            setLoading(false)
            navigate('/')

            // console.log('data', data)
        } catch (error) {
            setErr(error.message)
        }
    }
  return (
    <div className='register'>
        <Nav/>
        
        <motion.div 
             initial={{ y:'100vw'}}
             animate={{y:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }} 
            className="register_body">
            <h1 className='register_title'>Tunaomba utupe taarifa zako</h1>
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
                                // onChange={(e) => setSignup(e.target.value)}
                                {...register("signup", { required: true })}
                                />
                            <label htmlFor="1">Barua Pepe na Neno la Siri</label>
                        </div>
                        {/* <div className="sel_item">
                            <input 
                                type="radio" 
                                id='2' 
                                value='google' 
                                name='signup' 
                                // onChange={(e) => setSignup(e.target.value)}
                                {...register("signup", { required: true })}
                                />
                            <label htmlFor="2">Google</label>
                        </div> */}
                        {/* <div className="sel_item">
                            <input 
                                type="radio" 
                                id='3' 
                                value='facebook' 
                                name='signup' 
                                // onChange={(e) => setSignup(e.target.value)}
                                {...register("signup", { required: true })}
                                />
                            <label htmlFor="3">Facebook</label>
                        </div> */}
                     
                    </div>
                    
                </div>
                {signup === 'normal' && 
                
                <motion.div 
                    initial={{y:'100vh', opacity:0}}
                    animate={{y: '0', opacity:1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    style={{width: '100%'}} >
                    <div className="items_group">
                        <h3 className='item_title'>Jina la Kwanza</h3>
                        <div className="sel_items">

                            <input 
                            type="text" 
                            placeholder='Jina la Kwanza'
                            className='sel_input'
                            name='fname'
                            style={{width: '100%'}}
                            {...register("fname", { required: true })}
                            /> 
                        </div>
                       
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Jina la Mwisho</h3>
                        <div className="sel_items">

                            <input 
                            type="text" 
                            placeholder='Jina la Mwisho'
                            className='sel_input'
                            name='lname'
                            style={{width: '100%'}}
                            {...register("lname", { required: true })}
                            /> 
                        </div>
                       
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Barua Pepe</h3>
                        <div className="sel_items">

                            <input 
                            type="email" 
                            placeholder='Barua Pepe'
                            className='sel_input'
                            name='email'
                            style={{width: '100%'}}
                            {...register("email", { required: true })}
                            /> 
                        </div>
                       
                        
                    </div>
                    <div className="items_group" >
                        <h3 className='item_title'>Neno la Siri</h3>
                        <div className="sel_items">

                            <input 
                            type="password" 
                            placeholder='Neno la Siri'
                            className='sel_input'
                            name='password'
                            style={{width: '100%'}}
                            {...register("password", { required: true })}
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
                            style={{width: '100%'}}
                            {...register("email", { required: true })}
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
                            style={{width: '100%'}}
                            {...register("email", { required: true })}
                            />
                        </div>
                </motion.div>                
                }
               
                
                <div className="items_group" style={{width: '93%'}}>
                    <h3 className='item_title'>Chagua Iinsia</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='17' 
                                value='M' 
                                name='gender' 
                                // style={{width: '100%'}}
                                // onChange={(e) =>setGender(e.target.value)}
                                {...register("gender", { required: true })}
                                />
                            <label htmlFor="17">Mume</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='18' 
                                value='F' 
                                name='gender' 
                                // style={{width: '100%'}}
                                // onChange={(e) =>setGender(e.target.value)}
                                {...register("gender", { required: true })}
                                />
                            <label htmlFor="18">Mke</label>
                        </div>
                      </div>
                </div>
                <div className="items_group" style={{width: '93%'}}>
                    <h3 className='item_title'>Umri</h3>
                    <div className="sel_items" style={{width: '100%'}}>
                        <select 
                            name='age'  
                            className='sel_input'
                            style={{width: '100%'}}
                            {...register("age", { required: true })}
                            >                                    
                            {ages.map((age, index) => (
                                <option 
                                    value={age} 
                                    key={index}
                                    
                                    >{age}</option> 
                            ))}                                
                            </select>                          
                        </div>
                    
                </div>
                <div className="items_group" style={{width: '93%'}}>
                    <h3 className='item_title'>Unaishi - Mkoa</h3>
                    <div className="sel_items">
                        <select 
                            name='location'  
                            className='sel_input'
                            style={{width: '100%'}}
                            {...register("location", { required: true })}
                            > 
                            <option value="">Chagua</option>                                   
                            {regions.map((item, index) => (
                               
                                <option 
                                    value={item.name} 
                                    key={index}
                                    
                                    >{item.name}</option> 
                            ))}                                
                            </select>                          
                        </div>
                    
                </div>
                <div className="items_group" style={{width: '93%'}}>
                    <h3 className='item_title'>Chagua Dini yako</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='4' 
                                value='islam' 
                                name='religion' 
                                
                                // onChange={e => setReligion(e.target.value)}
                                {...register("religion", { required: true })}
                                />
                            <label htmlFor="4">Muislamu</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='5' 
                                value='christian' 
                                name='religion' 
                                // onChange={e => setReligion(e.target.value)}
                                {...register("religion", { required: true })}
                                />
                            <label htmlFor="5">Mkristu</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='6' 
                                value='others' 
                                name='religion'
                                // onChange={e => setReligion(e.target.value)}
                                {...register("religion", { required: true })}
                                 />
                            <label htmlFor="6">Dini nyingine</label>
                        </div>
                     
                    </div>
                    
                </div>
                {religion === 'islam' && <>
              
                <div className="items_group" style={{width: '93%'}}>
                    <h3 className='item_title'>Muislamu kwa</h3>
                    <div className="selection_btns">
                        <div className="sel_item" >
                            <input 
                                type="radio" 
                                id='411' 
                                value='Kuzaliwa' 
                                name='islam'
                                {...register("islam", { required: true })}
                                />
                            <label htmlFor="411">Kuzaliwa</label>
                        </div>
                        <div className="sel_item">
                            <input type="radio" id='511' value='Nilisimu' name='religion'/>
                            <label htmlFor="511">Ulibadili Dini</label>
                        </div>                      
                     
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Chagua Dhehebu lako</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" id='7' 
                                value='Sunni' 
                                name='set'
                                {...register("set", { required: true })}
                                />
                            <label htmlFor="7">Sunni</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='8' 
                                value='Sarafi' 
                                name='set'
                                {...register("set", { required: true })}
                                />
                            <label htmlFor="8">Sarafi</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='9' 
                                value='Shia' 
                                name='set'
                                {...register("set", { required: true })}
                                />
                            <label htmlFor="9">Shia</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='10' 
                                value='Ibadhi' 
                                name='set'
                                {...register("set", { required: true })}
                                />
                            <label htmlFor="10">Ibadhi</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='11' 
                                value='Kadiani' 
                                name='set'
                                {...register("set", { required: true })}
                                />
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
                            style={{width: '100%'}}
                            {...register("mosque", { required: true })}
                        />
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Kiwango chako cha Quran</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" id='29' 
                                value='Alfatha' 
                                name='quran'
                                {...register("quran", { required: true })}
                                />
                            <label htmlFor="29">Najua Alfatha tu</label>
                        </div>  
                        <div className="sel_item">
                            <input 
                                type="radio" id='21' 
                                value='Juzuu Amma' 
                                name='quran'
                                {...register("quran", { required: true })}
                                />
                            <label htmlFor="21">Juzuu Amma</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" id='22' 
                                value='Nasoma Msahafu' 
                                name='quran'
                                {...register("quran", { required: true })}
                                />
                            <label htmlFor="22">Nasoma Mashafu</label>
                        </div>  
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='23' 
                                value='Sijui Quran' 
                                name='quran'
                                {...register("quran", { required: true })}
                                />
                            <label htmlFor="23">Sijui Quran</label>
                        </div>                                    
                    </div>
                </div>
                <div className="items_group">
                        <h3 className='item_title'>Utekelezaji wa Ibada ya Swala</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1001454' 
                                    value='Nachunga vipindi vyote vya swala' 
                                    name='prayer' 
                                    {...register("prayer", { required: true })}/>
                                <label htmlFor="1001454">Nachunga vipindi vyote vya swala</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1011454' 
                                    value='Kuna wakati baadhi ya swala zinanipita' 
                                    name='prayer' 
                                    {...register("prayer", { required: true })}/>
                                <label htmlFor="1011454">Kuna wakati baadhi ya swala zinanipita</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1012454' 
                                    value='Sijaanza bado kuswal' 
                                    name='prayer' {...register("prayer", { required: true })}/>
                                <label htmlFor="1012454">Sijaanza bado kuswali</label>
                            </div>
                        </div>
                        
                    </div>
                </>}

                {religion === 'christian' && <>
                <div className="items_group">
                    <h3 className='item_title'>Una Mpango wa kuwa Muislamu?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" id='12' 
                                value='Ndio' 
                                name='revert' 
                                // onChange={e =>setRevert(e.target.value)}
                                {...register("revert", { required: true })}
                                />
                            <label htmlFor="12">Ndio</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" id='13' 
                                value='Hapana' 
                                name='revert' 
                                // onChange={e =>setRevert(e.target.value)}
                                {...register("revert", { required: true })}
                                />
                            <label htmlFor="13">Hapana</label>
                        </div>                 
                    </div>
                    
                </div>
                {revert === 'Ndio'  && <>                
                <div className="items_group">
                    <h3 className='item_title'>Kwanini unataka kuwa Muislamu?</h3>                   
                    <textarea  
                        name='revert_res' 
                        placeholder='Tunaomba Sababu Tafadhari' 
                        className='sel_textarea'
                        style={{width: '100%'}}
                        {...register("revert_res", { required: true })}
                        />                  
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Lini unataraji kusilimu?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" id='14' 
                                value='Mwaka huu' 
                                name='revert_plan'
                                {...register("revert_plan", { required: true })}
                                />
                            <label htmlFor="14">Mwaka huu</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" id='15' 
                                value='Mwakani' 
                                name='revert_plan'
                                {...register("revert_plan", { required: true })}
                                />
                            <label htmlFor="15">Mwakani</label>
                        </div>  
                        <div className="sel_item">
                            <input 
                                type="radio" id='16' 
                                value='sijapanga' 
                                name='revert_plan'
                                {...register("revert_plan", { required: true })}
                                />
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
                            <input 
                                type="radio" id='12' 
                                value='Ndio' 
                                name='revert' 
                                // onChange={e =>setRevert(e.target.value)}
                                {...register("revert", { required: true })}
                                
                                />
                            <label htmlFor="12">Ndio</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='13' 
                                value='Hapana' 
                                name='revert' 
                                // onChange={e =>setRevert(e.target.value)}
                                {...register("revert", { required: true })}
                                />
                            <label htmlFor="13">Hapana</label>
                        </div>                 
                    </div>
                    
                </div>
                {revert === 'Ndio'  && <>                
                <div className="items_group">
                    <h3 className='item_title'>Kwanini unataka kuwa Muislamu?</h3>  
                    <div className="sel_items">
                        <textarea  
                            name='revert_res' 
                            placeholder='Tunaomba Sababu Tafadhari' 
                            className='sel_textarea'
                            style={{width: '100%'}}
                            {...register("revert_res", { required: true })}
                            />  
                    </div>                 
                                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Lini unataraji kusilimu?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" id='14' 
                                value='Mwaka huu' 
                                name='revert_plan'
                                {...register("revert_plan", { required: true })}
                                />
                            <label htmlFor="14">Mwaka huu</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" id='15' 
                                value='Mwakani' 
                                name='revert_plan'
                                {...register("revert_plan", { required: true })}
                                />
                            <label htmlFor="15">Mwakani</label>
                        </div>  
                        <div className="sel_item">
                            <input 
                                type="radio" id='16' 
                                value='sijapanga' 
                                name='revert_plan'
                                {...register("revert_plan", { required: true })}
                                />
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
                            <input 
                                type="radio" id='25' 
                                value='Cheti' 
                                name='edu'
                                {...register("edu", { required: true })}
                                />
                            <label htmlFor="25">Cheti</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" id='26' 
                                value='Stashahada'
                                 name='edu'
                                 {...register("edu", { required: true })}
                                 />
                            <label htmlFor="26">Stashahada</label>
                        </div>  
                        <div className="sel_item">
                            <input 
                                type="radio" id='27' 
                                value='Shahada' 
                                name='edu'
                                {...register("edu", { required: true })}
                                />
                            <label htmlFor="27">Shahada</label>
                        </div>   
                        <div className="sel_item">
                            <input 
                                type="radio" id='28' 
                                value='Zaidi' 
                                name='edu'
                                {...register("edu", { required: true })}
                                />
                            <label htmlFor="28">Zaidi ya Shahada</label>
                        </div>              
                    </div>
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Unafanya Shughuri gani?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" id='25yyyy' 
                                value='Mwanafunzi' 
                                name='emplo'
                                {...register("emplo", { required: true })}
                                />
                            <label htmlFor="25yyyy">Mwanafunzi</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" id='26yyyy' 
                                value='Mfanyabiashara'
                                 name='emplo'
                                 {...register("emplo", { required: true })}
                                 />
                            <label htmlFor="26yyyy">Mfanyabiashara</label>
                        </div>  
                        <div className="sel_item">
                            <input 
                                type="radio" id='27yyyy' 
                                value='Nimeajiliwa' 
                                name='emplo'
                                {...register("emplo", { required: true })}
                                />
                            <label htmlFor="27yyyy">Nimeajiliwa</label>
                        </div>   
                        <div className="sel_item">
                            <input 
                                type="radio" id='28yyyy' 
                                value='Sina Shughuri Maalum' 
                                name='emplo'
                                {...register("emplo", { required: true })}
                                />
                            <label htmlFor="28yyyy">Sina Shughuri Maalum</label>
                        </div>              
                    </div>
                </div>
                <div className="items_group">
                        <h3 className='item_title'>Taaluma yako ipi?</h3>
                        <div className="sel_items">

                            <input 
                            type="text" 
                            placeholder='Taaluma au ujuzi'
                            className='sel_input'
                            name='profes'
                            style={{width: '100%'}}
                            {...register("profes", { required: true })}
                            /> 
                        </div>
                       
                        
                    </div>
               
                {/* <div className="items_group">
                    <h3 className='item_title'>Una mpango wa kutafuta Mwenza (Nikah) humu?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" id='100' 
                                value='ndio' name='nikah' 
                                // onChange={e => setNikah(e.target.value)}
                                {...register("nikah", { required: true })}
                                />
                            <label htmlFor="100">Ndio</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='101' 
                                value='hapana' 
                                name='nikah' 
                                // onChange={e => setNikah(e.target.value)}
                                {...register("nikah", { required: true })}
                                />
                            <label htmlFor="101">Hapana</label>
                        </div>
                       
                     
                    </div>
                    
                </div> */}
                </>}
                {/* {religion === 'islam' && nikah === 'ndio' &&<> */}
                {/* <div className="items_group">
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
                    
                </div> */}
                {/* <div className="items_group">
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
                    
                </div> */}
                {/* <div className="items_group">
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
                    
                </div> */}
                {/* <div className="items_group">
                    <h3 className='item_title'>Kundi lako la damu</h3>
                    <div className="selection_btns">
                        <div className="sel_items">
                        <select name='weight'  className='sel_input'>
                                <option value='' >Chagua</option> 
                                {blood.map((item, index) => (
                                   <option value={item} key={index}>{item}</option> 
                                ))}
                               
                            </select>                          
                        </div>
                    </div>
                    
                </div> */}
                {/* <div className="items_group">
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
                    
                </div> */}
                {/* <div className="items_group">
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
                    
                </div> */}
                {/* <div className="items_group">
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
                    
                </div> */}
                {/* <div className="items_group">
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
                    
                </div> */}
                {/* <div className="items_group">
                    <h3 className='item_title'>Maelezo kwa ufupi juu ya sifa za ziada ya mwenza unayemtafuta</h3>  
                    <div className="sel_items">
                        <textarea  name='desc' placeholder='Sifa za ziada' className='sel_textarea'/> 
                    </div>                 
                                     
                </div> */}
                {/* </>} */}
                
               
                <div className="items_group">
                    <button className='btn_reg' onClick={handleRegister}>{loading? 'Inatuma' : 'TUMA USAJIRI'}</button>
                </div>
                
                
            </div>
        </motion.div>
      
    </div>
  )
}

export default Register
