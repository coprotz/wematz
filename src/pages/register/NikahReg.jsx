import React from 'react'
import { motion } from 'framer-motion';
import { ages, bloods, heights, tribes, weights } from '../../data';
import Nav from '../../components/nav/Nav';
import {GrClose, GrLike } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BsCamera } from 'react-icons/bs';
import { useForm } from "react-hook-form";
import useStorage from '../../hooks/useStorage';
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';




const NikahReg = () => {

    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const { user } = useAuth()
    const { users } = useData()
    const cuUser = users?.find(u => u.id === user.uid)

    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { perc, url } = useStorage(file)

    const navigate = useNavigate()

    const username = watch('username')
    const tribe = watch('tribe')
    const weight = watch('weight')
    const height = watch('height')
    const blood = watch('blood')
    const body = watch('body')
    const marital = watch('marital')
    const child = watch('child')
    const liveWith = watch('liveWith')
    const desc = watch('desc')
    const page = watch('page')
    const ptribe = watch('ptribe')
    const pislam = watch('pislam')
    const pset = watch('pset')
    const pquran = watch('pquran')
    const pedu = watch('pedu')
    const pheight = watch('pheight')
    const pweight = watch('pweight')
    const pblood = watch('pblood')
    const pbody = watch('pbody')
    const pmarital = watch('pmarital')
    const pchild = watch('pchild')
    const plive = watch('plive')
    const pdesc = watch('pdesc')
    const pemploy = watch('pemploy')

    const types = ['image/png', 'image/jpeg']

    const handleSelect = (e) => {
        let selected = e.target.files[0];  
        if (selected && types.includes(selected.type)){
            setFile(selected)
            setError('')
        }else {
            setFile(null)
            setError('Please select an image file (png or jpeg)')
        }
    }

    const NikahRef = collection(db, 'marriages')


    const handleNikah = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            photo: url,
            username,
            userId: user.uid,
            age: cuUser?.age,
            islam: cuUser?.islam,
            set: cuUser?.set,
            quran: cuUser?.quran,
            edu: cuUser?.edu,
            employ: cuUser?.emplo,
            location: cuUser?.location,
            prayer: cuUser?.prayer,
            gender: cuUser?.gender,
            tribe,
            weight,
            height,
            blood,
            body,
            marital,
            child,
            liveWith,
            desc,
            page,
            ptribe,
            pislam,
            pset,
            pquran,
            pedu,
            pheight,
            pemploy,
            pweight,
            pblood,
            pbody,
            pmarital,
            pchild,
            plive,
            pdesc,
            createdAt: serverTimestamp()

        }

        try {
            await addDoc(NikahRef, data)
            setLoading(null)
            navigate('/nikah')
        } catch (error) {
            console.log(error.message)
        }
    }

    // const user_gender = 'F'
  return (
    <div className='nikah_reg'>
        <div className="nikah_reg_nav">
            <h1 className="logo" onClick={() => navigate('/')}>Wema</h1>
            <button className='btn' onClick={() => navigate(-1)}><GrClose/></button>
        </div>
        <div className="nikah_reg_inner">
            <motion.div 
                initial={{ y:'100vw'}}
                animate={{y:0}} 
                transition={{ ease: "easeOut", duration: 0.5 }} 
                className="register_body">
                <h1 className='register_title'>Tunaomba utupe taarifa zako</h1>
                {/* <span className='res_span'></span> */}
                <div className="register_form">
                <motion.div 
                    initial={{y:'100vh', opacity:0}}
                    animate={{y: '0', opacity:1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }} >
                    <div className="profile_header">
                        <div className="user_photo">
                            { file?                         
                                <img src={URL.createObjectURL(file)} alt="" /> :                                
                                <label htmlFor="photo" className='profile_photo'>
                                    <input 
                                        type="file" 
                                        name='photo' 
                                        id="photo" style={{display: 'none'}}
                                        onChange={handleSelect}
                                    />
                                    <span className='attached_photo'><BsCamera/></span>
                                </label>
                            }
                        </div>                  
                        {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}                                     
                        {file && <>                                       
                        {/* <div className="progress-bar"  style={{width: perc + '%'}}></div>   */}
                        <div className="profile_photo_edit">                            
                            <button className='btn_cancel' onClick={() =>setFile(null)}>ONDOA</button>
                        </div>
                        </>
                    
                        }       
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Jina la kutumika</h3>
                        <div className="sel_items">
                            <input 
                            type="text" 
                            placeholder='Jina la Kutumika'
                            className='sel_input'
                            name='username'
                            {...register("username", { required: true })}
                            style={{width: '100%'}}
                            /> 
                        </div>                      
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Kabila lako</h3>
                        <div className="selection_btns">
                            <div className="sel_items">
                                <select 
                                    name='tribe'  
                                    className='sel_input'
                                    style={{width: '100%'}}
                                    {...register("tribe", { required: true })}
                                    >
                                        <option value='' >Chagua</option> 
                                        {tribes.map((age, index) => (
                                        <option value={age} key={index}>{age}</option> 
                                        ))}
                                    
                                </select>                          
                            </div>
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Uzito wako</h3>
                        <div className="selection_btns">
                            <div className="sel_items">
                            <select 
                                name='weight'  
                                className='sel_input'
                                style={{width: '100%'}}
                                {...register("weight", { required: true })}
                                >
                                    <option value='' >Chagua</option> 
                                    {weights.map((item, index) => (
                                    <option value={`${item} kg`} key={index}>{item} kg</option> 
                                    ))}
                                
                                </select>                          
                            </div>
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Urefu wako</h3>
                        <div className="selection_btns">
                            <div className="sel_items">
                            <select 
                                name='height'  
                                className='sel_input'
                                style={{width: '100%'}}
                                {...register("height", { required: true })}
                                >
                                    <option value='' >Chagua</option> 
                                    {heights.map((item, index) => (
                                    <option value={`${item} cm`}  key={index}>{item} cm</option> 
                                    ))}
                                
                                </select>                          
                            </div>
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Kundi lako la damu</h3>
                        <div className="selection_btns">
                            <div className="sel_items">
                            <select 
                                name='blood'  
                                className='sel_input'
                                {...register("blood", { required: true })}
                                style={{width: '100%'}}>
                                    <option value='' >Chagua</option> 
                                    {bloods.map((item, index) => (
                                    <option value={item} key={index}>{item}</option> 
                                    ))}
                                
                                </select>                          
                            </div>
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Aina la umbile lako</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input type="radio" id='1001' value='Mnene' name='body' {...register("body", { required: true })}/>
                                <label htmlFor="1001">Mnene</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='1011' value='Mwembamba' name='body' {...register("body", { required: true })}/>
                                <label htmlFor="1011">Mwembamba</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='1012' value='Mwenye misuli' name='body' {...register("body", { required: true })}/>
                                <label htmlFor="1012">Mwenye misuli</label>
                            </div>
                        
                        
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Hali yako ya ndoa</h3>
                        <div className="selection_btns">
                            {cuUser?.gender === 'M' &&<>  
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='10011' 
                                    value='Sijaoa' 
                                    {...register("marital", { required: true })}
                                    name='marital'/>
                                <label htmlFor="10011">Sijaoa</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='10113' 
                                    value='Nimetaliki' 
                                    {...register("marital", { required: true })}
                                    name='marital'/>
                                <label htmlFor="10113">Nimetaliki</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='10115' 
                                    value='Naongeza Mke' 
                                    {...register("marital", { required: true })}
                                    name='marital'/>
                                <label htmlFor="10115">Naongeza Mke</label>
                            </div>
                            </>}
                            {cuUser?.gender === 'F' &&<>           
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='10111ww' 
                                    value='Sijaolewa' 
                                    {...register("marital", { required: true })}
                                    name='marital'/>
                                <label htmlFor="10111ww">Sijaolewa</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='10112ww' 
                                    value='Nimetalikiwa' 
                                    {...register("marital", { required: true })}
                                    name='marital'/>
                                <label htmlFor="10112ww">Nimetalikiwa</label>
                            </div></>}
                            
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='10114ee' 
                                    value='Mjane' 
                                    {...register("marital", { required: true })}
                                    name='marital'/>
                                <label htmlFor="10114ee">Mjane</label>
                            </div>
                        
                        
                        
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Una mtoto au watoto?</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1001122' 
                                    value='Sina' 
                                    {...register("child", { required: true })}
                                    name='child'/>
                                <label htmlFor="1001122">Sina</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1011122' 
                                    value='Ninao naishi nao' 
                                    {...register("child", { required: true })}
                                    name='child'/>
                                <label htmlFor="1011122">Ninae-ninao naishi nao</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1011222' 
                                    value='Ninao siishi nao'
                                    {...register("child", { required: true })} 
                                    name='child'/>
                                <label htmlFor="1011222">Ninae-ninao siishi nao</label>
                            </div>
                        
                        
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Una ishi na nani?</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='100111' 
                                    value='Peke yangu' 
                                    {...register("liveWith", { required: true })}
                                    name='liveWith'/>
                                <label htmlFor="100111">Peke yangu</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='101112' 
                                    value='Na familia' 
                                    {...register("liveWith", { required: true })}
                                    name='liveWith'/>
                                <label htmlFor="101112">Na familia</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='101123' 
                                    value='Na marafiki'
                                    {...register("liveWith", { required: true })} 
                                    name='liveWith'/>
                                <label htmlFor="101123">Na marafiki</label>
                            </div>
                        
                        
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Maelezo kwa ufupi Kuhusu Wewe</h3>  
                        <div className="sel_items">
                            <textarea  
                                name='desc' 
                                placeholder='Sifa za ziada' 
                                {...register("desc", { required: true })}
                                className='sel_textarea'/> 
                        </div>                 
                                        
                    </div>

                    <h1 className='register_title'>Tunaomba utupe Sifa za Mwenza wako</h1>
                    <div className="items_group">
                        <h3 className='item_title'>Umri Wake</h3>
                        <div className="sel_items">
                                <select 
                                    name='page'  
                                    className='sel_input'
                                    {...register("page", { required: true })}
                                    style={{width: '100%'}}
                                    > 
                                    <option value='Wowote' >Wowote</option>                                    
                                        {ages.map((age, index) => (
                                        <option value={`Aizidi ${age}`} key={index}>Asizidi {age}</option> 
                                        ))}
                                    
                                </select>                          
                            </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Kabila lake</h3>
                        <div className="selection_btns">
                            <div className="sel_items">
                                <select 
                                    name='ptribe'  
                                    className='sel_input'
                                    {...register("ptribe", { required: true })}
                                    style={{width: '100%'}}
                                    >
                                        <option value='Lolote' >Lolote</option> 
                                        {tribes.map((age, index) => (
                                        <option value={age} key={index}>{age}</option> 
                                        ))}
                                    
                                </select>                          
                            </div>
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Muislamu kwa</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input type="radio" id='4122100' value='Vyovyote' name='pislam' {...register("pislam", { required: true })}/>
                                <label htmlFor="4122100">Vyovyote</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='41100' value='Kuzaliwa' name='pislam' {...register("pislam", { required: true })}/>
                                <label htmlFor="41100">Kuzaliwa</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='51100' value='Alibadili Dini' name='pislam' {...register("pislam", { required: true })}/>
                                <label htmlFor="51100">Alibadili Dini</label>
                            </div>                      
                        
                        </div>
                        
                    </div>
                    <div className="items_group">
                    <h3 className='item_title'>Chagua Dhehebu lake</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input type="radio" id='07' value='Lolote' name='pset' {...register("pset", { required: true })}/>
                                <label htmlFor="07">Lolote</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='700' value='Sunni' name='pset' {...register("pset", { required: true })}/>
                                <label htmlFor="700">Sunni</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='800' value='Sarafi' name='pset' {...register("pset", { required: true })}/>
                                <label htmlFor="800">Sarafi</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='900' value='Shia' name='pset' {...register("pset", { required: true })}/>
                                <label htmlFor="900">Shia</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='1000' value='Ibadhi' name='pset' {...register("pset", { required: true })}/>
                                <label htmlFor="1000">Ibadhi</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='1100' value='Kadiani' name='pset' {...register("pset", { required: true })}/>
                                <label htmlFor="1100">Kadiani</label>
                            </div>
                            
                        
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Kiwango chake cha Quran</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input type="radio" id='2900' value='Chochote' name='pquran' {...register("pquran", { required: true })}/>
                                <label htmlFor="2900">Chochote</label>
                            </div> 
                            <div className="sel_item">
                                <input type="radio" id='002900' value='Najua Alfatha tu' name='pquran' {...register("pquran", { required: true })}/>
                                <label htmlFor="002900">Najua Alfatha tu</label>
                            </div> 
                            <div className="sel_item">
                                <input type="radio" id='2100' value='Juzuu Amma' name='pquran' {...register("pquran", { required: true })}/>
                                <label htmlFor="2100">Juzuu Amma</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='2200' value='Nasoma Mashafu' name='pquran' {...register("pquran", { required: true })}/>
                                <label htmlFor="2200">Nasoma Mashafu</label>
                            </div>  
                            <div className="sel_item">
                                <input type="radio" id='2300' value='Sijui Quran' name='quran' {...register("signup", { required: true })}/>
                                <label htmlFor="2300">Sijui Quran</label>
                            </div>                                    
                        </div>
                    </div>
                    
                    <div className="items_group">
                        <h3 className='item_title'>Kiwango chake cha Elimu</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input type="radio" id='0002500' value='Chochote' name='pedu' {...register("pedu", { required: true })}/>
                                <label htmlFor="0002500">Chochote</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='2500' value='Cheti' name='pedu' {...register("pedu", { required: true })}/>
                                <label htmlFor="2500">Cheti</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='2600' value='Stashahada' name='pedu' {...register("pedu", { required: true })}/>
                                <label htmlFor="2600">Stashahada</label>
                            </div>  
                            <div className="sel_item">
                                <input type="radio" id='2700' value='Shahada' name='pedu' {...register("pedu", { required: true })}/>
                                <label htmlFor="2700">Shahada</label>
                            </div>   
                            <div className="sel_item">
                                <input type="radio" id='2800' value='Zaidi' name='pedu' {...register("pedu", { required: true })}/>
                                <label htmlFor="28000">Zaidi ya Shahada</label>
                            </div>              
                        </div>
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Hali yake ya Ajira</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input type="radio" id='0002500454' value='Vyovyote' name='pemploy' {...register("pemploy", { required: true })}/>
                                <label htmlFor="0002500454">Vyovyote</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='2500454' value='Awe Muajiriwa' name='pemploy' {...register("pemploy", { required: true })}/>
                                <label htmlFor="2500454">Awe Muajiriwa</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='2600454' value='Awe Mfanyabiashara' name='pemploy' {...register("pemploy", { required: true })}/>
                                <label htmlFor="2600454">Awe Mfanyabiashara</label>
                            </div>  
                            <div className="sel_item">
                                <input type="radio" id='2700454' value='Awe Mwanafunzi' name='pemploy' {...register("pemploy", { required: true })}/>
                                <label htmlFor="2700454">Awe Mwanafunzi</label>
                            </div>   
                                        
                        </div>
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Urefu wake</h3>
                        <div className="selection_btns">
                            <div className="sel_items">
                            <select 
                                name='pheight'  
                                className='sel_input'
                                {...register("pheight", { required: true })}
                                style={{width: '100%'}}
                                >
                                <option value='Wowote' >Wowote</option> 
                                    {heights.map((item, index) => (
                                    <option value={`Asizidi ${item} cm`} key={index}>Asizidi {item} cm</option> 
                                    ))}
                                
                                </select>                          
                            </div>
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Uzito wake</h3>
                        <div className="selection_btns">
                            <div className="sel_items">
                            <select 
                                name='pweight'  
                                className='sel_input'
                                {...register("pweight", { required: true })}
                                style={{width: '100%'}}
                                >
                                    <option value='Wowote' >Wowote</option> 
                                    {weights.map((item, index) => (
                                    <option value={`Asizidi ${item} kg`} key={index}>Asizidi {item} kg</option> 
                                    ))}
                                
                                </select>                          
                            </div>
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Kundi lake la damu</h3>
                        <div className="selection_btns">
                            <div className="sel_items">
                            <select 
                                name='pblood'  
                                className='sel_input'
                                {...register("pblood", { required: true })}
                                style={{width: '100%'}}
                                >                                   
                                    <option value='Lolote' >Lolote</option> 
                                    {bloods.map((item, index) => (
                                    <option value={item} key={index}>{item}</option> 
                                    ))}
                                
                                </select>                          
                            </div>
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Aina la umbile lake</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input type="radio" id='000100100' value='Lolote' name='pbody' {...register("pbody", { required: true })}/>
                                <label htmlFor="000100100">Lolote</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='100100' value='ndio' name='pbody' {...register("pbody", { required: true })}/>
                                <label htmlFor="100100">Mnene</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='101100' value='hapana' name='pbody' {...register("pbody", { required: true })}/>
                                <label htmlFor="101100">Mwembamba</label>
                            </div>
                            <div className="sel_item">
                                <input type="radio" id='101200' value='hapana' name='pbody' {...register("pbody", { required: true })}/>
                                <label htmlFor="101200">Mwenye misuli</label>
                            </div>
                        
                        
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Hali yake ya ndoa</h3>
                        <div className="selection_btns">
                            {cuUser?.gender !== 'M' &&<> 
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='001001100' 
                                    value='Vyovyote' 
                                    {...register("pmarital", { required: true })}
                                    name='pmarital'/>
                                <label htmlFor="001001100">Vyovyote</label>
                            </div> 
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1001100' 
                                    value='Hajaoa' 
                                    {...register("pmarital", { required: true })}
                                    name='pmarital'/>
                                <label htmlFor="1001100">Hajaoa</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1011300' 
                                    value='Ametaliki' 
                                    {...register("pmarital", { required: true })}
                                    name='pmarital'/>
                                <label htmlFor="1011300">Ametaliki</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1011500' 
                                    value='Anaongeza Mke' 
                                    {...register("pmarital", { required: true })}
                                    name='pmarital'/>
                                <label htmlFor="1011500">Anaongeza Mke</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='101140011' 
                                    value='Mjane' 
                                    {...register("pmarital", { required: true })}
                                    name='pmarital'/>
                                <label htmlFor="101140011">Mjane</label>
                            </div>
                            </>}
                            {cuUser?.gender !== 'F' &&<>           
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='001011100' 
                                    value='Vyovyote' 
                                    {...register("pmarital", { required: true })}
                                    name='pmarital'/>
                                <label htmlFor="001011100">Vyovyote</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1011100' 
                                    value='Hajaolewa' 
                                    {...register("pmarital", { required: true })}
                                    name='pmarital'/>
                                <label htmlFor="1011100">Hajaolewa</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1011200' 
                                    value='Ametalikiwa' 
                                    {...register("pmarital", { required: true })}
                                    name='pmarital'/>
                                <label htmlFor="1011200">Ametalikiwa</label>
                            </div>
                            
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1011400' 
                                    value='Mjane' 
                                    {...register("pmarital", { required: true })}
                                    name='pmarital'/>
                                <label htmlFor="1011400">Mjane</label>
                            </div>
                            
                            </>}
                        
                        
                        
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Kuhusu watoto?</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='0001001100'
                                    {...register("pchild", { required: true })} 
                                    value='Vyovote' 
                                    name='pchild'/>
                                <label htmlFor="0001001100">Vyovote</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='100110088' 
                                    value='Asiwe' 
                                    {...register("pchild", { required: true })}
                                    name='pchild'/>
                                <label htmlFor="100110088">Asiwe</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='101110077777' 
                                    value='Hakuna ubaya akiwa nao ila asiishi nao'
                                    {...register("pchild", { required: true })} 
                                    name='pchild'/>
                                <label htmlFor="101110077777">Hakuna ubaya akiwa nao ila asiishi nao</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1011200777' 
                                    value='Hakuna ubaya na akiishi nao'
                                    {...register("pchild", { required: true })} 
                                    name='pchild'/>
                                <label htmlFor="1011200777">Hakuna ubaya na akiishi nao</label>
                            </div>
                        
                        
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Kuhusu kuishi na nani?</h3>
                        <div className="selection_btns">
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='0010011100' 
                                    value='Vyovyote' 
                                    {...register("plive", { required: true })}
                                    name='plive'/>
                                <label htmlFor="0010011100">Vyovyote</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='10011100' 
                                    value='Peke yake' 
                                    {...register("plive", { required: true })}
                                    name='plive'/>
                                <label htmlFor="10011100">Peke yake</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='10111200' 
                                    value='Na familia' 
                                    {...register("plive", { required: true })}
                                    name='plive'/>
                                <label htmlFor="10111200">Na familia</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='10112300' 
                                    value='Na marafiki' 
                                    {...register("plive", { required: true })}
                                    name='plive'/>
                                <label htmlFor="10112300">Na marafiki</label>
                            </div>
                        
                        
                        </div>
                        
                    </div>
                    <div className="items_group">
                        <h3 className='item_title'>Maelezo kwa ufupi Kuhusu Mwenza</h3>  
                        <div className="sel_items">
                            <textarea  
                                name='pdesc' 
                                placeholder='Sifa za ziada'
                                {...register("pdesc", { required: true })} 
                                className='sel_textarea'/> 
                        </div>                 
                                        
                    </div>
                    <div className="items_group">
                        <button className='btn_reg' onClick={handleNikah}>{loading? 'Inatuma': 'TUMA USAJIRI'}</button>
                    </div>


                </motion.div>
                </div>
            </motion.div>
        </div>

    </div>
  )
}

export default NikahReg
