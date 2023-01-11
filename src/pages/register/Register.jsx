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
import { FcGoogle } from 'react-icons/fc';
import {  HiOutlineArrowLeft } from "react-icons/hi";
import Loading from '../../components/loading/Loading';
import useData from '../../hooks/useData';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
    } from 'react-places-autocomplete';



const Register = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(null)
    const [page, setPage] = useState(0)

    

    const { signUp, googleSignIn, user } = useAuth()
    const { users } = useData()
    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});
    const [location, setLoaction] = useState('')
    const [userGeo, setUserGeo] = useState(null)

   

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
    const isMosque = watch('isMosque')
    const revert_plan = watch('revert_plan')
    const edu = watch('edu')
    const emplo = watch('emplo')
    const prayer = watch('prayer')
    const profes = watch('profes')
    // const location = watch('location')

    const [thanks, setThanks] = useState(null)
    const [reg, setReg] = useState(0)

    // console.log('ismos', isMosque)

    const data = {
        email: user?.email,           
        name:  user?.displayName ,
        photo: "",
        gender,   
        emplo,
        age,
        religion,
        isOnline: true,
        profes,
        islam: religion === 'islam' ? islam : 'NA',
        set: religion === 'islam' ? set : 'NA',
        isMosque: religion === 'islam' ? isMosque : 'NA',
        mosque: isMosque === 'Ndio Upo' ? mosque : 'NA',
        location,
        avatar: '/images/profile.webp',
        prayer: religion === 'islam' ? prayer : 'NA',
        quran: religion === 'islam' ? quran : 'NA',
        revert: religion === 'christian' ? revert : 'NA',  
        followers:[],
        followings:[],  
        userLat: userGeo?.lat,
        userLng: userGeo?.lng,      
        edu,
   
    }

    const fullname = fname+" "+lname

    const data1 = {
        email,           
        name: fullname,
        photo: '',
        gender,   
        emplo,
        age,
        religion,
        profes,
        isOnline: true,
        islam: religion === 'islam' ? islam : 'NA',
        set: religion === 'islam' ? set : 'NA',
        isMosque: religion === 'islam' ? isMosque : 'NA',
        mosque: isMosque === 'Ndio Upo' ? mosque : 'NA',
        location,
        avatar: '/images/profile.webp',
        prayer: religion === 'islam' ? prayer : 'NA',
        quran: religion === 'islam' ? quran : 'NA',
        revert: religion === 'christian' ? revert : 'NA', 
        followers:[],
        followings:[], 
        userLat: userGeo?.lat,
        userLng: userGeo?.lng,    
        edu,
   
    }

    // console.log(location)

    const handleChange = address => {
        setLoaction(address);
        };
    
    const handleSelect = address => {
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => setUserGeo(latLng))
        .catch(error => console.error('Error', error));
        setLoaction(address)
        
        };

    // console.log('userGeo', userGeo)

    const handleRegister = async(e) => {
        e.preventDefault()
        
        setLoading(true)
        const existemail = users?.find(u => u.email === user.email)

        if(existemail){
            alert('Email hii inatumika humu, tafadhari login au chagua email nyingine')
        }else{

        

        if(user) {
            try {
                await setDoc(doc(db, 'users', `${user.uid}`), {
                   ...data,
                   createdAt: serverTimestamp()
               })
            //    await setDoc(doc(db, 'userChats', `${user.uid}`), {})
               setLoading(false)
               navigate('/')
           } catch (error) {
               setErr(error.message)
           }
        }else{
            try {
                const newUser = await signUp(email, password)
                await setDoc(doc(db, 'users', `${newUser.user.uid}`), {
                ...data1,
                createdAt: serverTimestamp()
                });
                // await setDoc(doc(db, 'userChats', `${newUser.user.uid}`), {})
                setLoading(false)
                navigate('/')

                        // console.log('data', data)
                } catch (error) {
                setErr(error.message)
            }
        }

    }

        
 
       
    }

   
    const signWithGoogle = async (e) => {
        e.preventDefault();

        try {
           await googleSignIn()
           setPage(1)
            
        } catch (error) {
            setErr(error.message)
        }

    }

    const RenderPage = () => {
        if(page === 0){
            return (
                <motion.div 
                    initial={{ y:'100vw'}}
                    animate={{y:0}} 
                    transition={{ ease: "easeOut", duration: 0.5 }} 
                    className="register_body">
                    <h1 className='register_title'>{reg === 1? 'Umechagua kuingia kwa Google' : reg === 2 ? 'Umechagua kuingia kwa Email na Password' : 'Tafadhari Chagua njia ya Kuingia'}</h1>
                    <span className='res_span'></span>
                    {err && <span>{err}</span>}
                    <div className="register_form">
                        <div className="items_group">
                            {reg === 0 && 
                            <div className="selection_btns">
                                <div className="sel_item">
                                    <input 
                                        type="radio" 
                                        id='2' 
                                        value='google' 
                                        name='signup'
                                        onClick={() => setReg(1)} 
                                        // onChange={(e) => setSignup(e.target.value)}
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
                                        onClick={() => setReg(2)} 
                                        // onChange={(e) => setSignup(e.target.value)}
                                        {...register("signup", { required: true })}
                                        />
                                    <label htmlFor="1"  className='g_signup'>Barua Pepe na Neno la Siri</label>
                                </div>            
                            </div>}
                            
                        </div>
                        {reg === 2 &&                 
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
                                        {...register("fname", { required: reg === 2 ? true : false })}
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
                                        {...register("lname", { required: reg === 2 ? true : false })}
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
                                        {...register("email", { required: reg === 2  ? true : false })}
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
                                        {...register("password", { required: reg === 2  ? true : false })}
                                        />
                                    </div>
                                    
                                    
                                </div>
                                <button onClick={() =>setPage(1)} className='btn_reg' disabled={!isValid}>Endelea</button>
                                <div className="profile_photo_edit">                            
                                    <button className='btn_cancel' onClick={() =>setReg(0)}>ONDOA</button>
                                </div>
                            </motion.div>
                            }
                             {reg === 1 && 
                
                                <motion.div 
                                    initial={{y:'100vh', opacity:0}}
                                    animate={{y: '0', opacity:1}} 
                                    transition={{ ease: "easeOut", duration: 0.5 }}
                                    style={{width:'100%'}} >       
                                    <div className="items_group">
                                        <button className='btn_reg' onClick={signWithGoogle}>{loading && !err? <Loading/>  : 'Ingia kwa Google'}</button>
                                    </div>
                                    <div className="profile_photo_edit">                            
                                        <button className='btn_cancel' onClick={() =>setReg(0)}>ONDOA</button>
                                    </div>
                                </motion.div>
                                }
                   </div>
                </motion.div>
            )
        }else if(page === 1){
            return (
                <motion.div 
                    initial={{ y:'100vw'}}
                    animate={{y:0}} 
                    transition={{ ease: "easeOut", duration: 0.5 }} 
                    className="register_body">
                        <div className="view_que_back" style={{width: '90%'}}>
                            <button onClick={() =>setPage(0)} className='btn_btn'><HiOutlineArrowLeft/></button>
                            <h4>Rudi Nyuma</h4>
                        </div>
                    <h1 className='register_title'>Malizia usajili</h1>
                    <span className='res_span'></span>
                    {err && <span>{err}</span>}
                    <div className="register_form">
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
                <div className="items_group" >
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
                <div className="items_group" >
                    <h3 className='item_title'>Unaishi</h3>
                    <div className="sel_items">
                        <PlacesAutocomplete
                            value={location}
                            onChange={handleChange}
                            onSelect={handleSelect}
                        >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>  (
                        <div style={{width: '100%'}}>
                            <input
                            {...getInputProps({
                            placeholder: 'Tafuta eneo...',
                            className: 'location-search-input',
                            
                            })}
                            className='sel_input'
                            style={{width: '93%'}}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                <div
                                {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                                })}
                                >
                                <span>{suggestion.description}</span>
                                </div>
                                );
                                })}
                            </div>
                        </div>
                        )}
                        </PlacesAutocomplete>
                                        {/* <select 
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
                            </select>                           */}
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
                                {...register("islam", { required: religion === 'islam' ? true : false })}
                                />
                            <label htmlFor="411">Kuzaliwa</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='511' 
                                value='Nilisimu'
                                name='islam'
                                {...register("islam", { required: religion === 'islam' ? true : false })}
                                />
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
                                {...register("set", { required: religion === 'islam' ? true : false })}
                                />
                            <label htmlFor="7">Sunni</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='8' 
                                value='Sarafi' 
                                name='set'
                                {...register("set", { required: religion === 'islam' ? true : false })}
                                />
                            <label htmlFor="8">Sarafi</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='9' 
                                value='Shia' 
                                name='set'
                                {...register("set", { required: religion === 'islam' ? true : false })}
                                />
                            <label htmlFor="9">Shia</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='10' 
                                value='Ibadhi' 
                                name='set'
                                {...register("set", { required: religion === 'islam' ? true : false })}
                                />
                            <label htmlFor="10">Ibadhi</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='11' 
                                value='Kadiani' 
                                name='set'
                                {...register("set", { required: religion === 'islam' ? true : false })}
                                />
                            <label htmlFor="11">Kadiani</label>
                        </div>
                        
                     
                    </div>
                    
                </div>
                <div className="items_group">
                    <h3 className='item_title'>Kuna msikiti karibu na unapoishi?</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" id='70' 
                                value='Ndio Upo' 
                                name='isMosque'
                                {...register("isMosque", { required: religion === 'islam' ? true : false })}
                                />
                            <label htmlFor="70">Ndio Upo</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='80' 
                                value='Hapana Msikiti' 
                                name='isMosque'
                                {...register("isMosque", { required: religion === 'islam' ? true : false })}
                                />
                            <label htmlFor="80">Hapana Hakuna</label>
                        </div>                     
                        
                     
                    </div>
                    
                </div>
                {isMosque === 'Ndio Upo' &&
                <div className="items_group">
                    <h3 className='item_title'>Jina la Msikiti unaoswalia unapokuwa {location}</h3>
                    <div className="sel_items">

                        <input 
                            type="text" 
                            placeholder='Jina la Msikiti'
                            className='sel_input'
                            name='mosque'
                            style={{width: '100%'}}
                            {...register("mosque", { required: isMosque === 'Ndio Upo' ? true : false })}
                        />
                    </div>
                    
                </div>}
                <div className="items_group">
                    <h3 className='item_title'>Kiwango chako cha Quran</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" id='29' 
                                value='Alfatha' 
                                name='quran'
                                {...register("quran", { required: religion === 'islam' ? true : false })}
                                />
                            <label htmlFor="29">Najua Alfatha tu</label>
                        </div>  
                        <div className="sel_item">
                            <input 
                                type="radio" id='21' 
                                value='Juzuu Amma' 
                                name='quran'
                                {...register("quran", { required: religion === 'islam' ? true : false })}
                                />
                            <label htmlFor="21">Juzuu Amma</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" id='22' 
                                value='Nasoma Msahafu' 
                                name='quran'
                                {...register("quran", { required: religion === 'islam' ? true : false })}
                                />
                            <label htmlFor="22">Nasoma Mashafu</label>
                        </div>  
                        <div className="sel_item">
                            <input 
                                type="radio" 
                                id='23' 
                                value='Sijui Quran' 
                                name='quran'
                                {...register("quran", { required: religion === 'islam' ? true : false })}
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
                                    {...register("prayer", { required: religion === 'islam' ? true : false })}/>
                                <label htmlFor="1001454">Nachunga vipindi vyote vya swala</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1011454' 
                                    value='Kuna wakati baadhi ya swala zinanipita' 
                                    name='prayer' 
                                    {...register("prayer", { required: religion === 'islam' ? true : false })}/>
                                <label htmlFor="1011454">Kuna wakati baadhi ya swala zinanipita</label>
                            </div>
                            <div className="sel_item">
                                <input 
                                    type="radio" 
                                    id='1012454' 
                                    value='Sijaanza bado kuswal' 
                                    name='prayer' {...register("prayer", { required: religion === 'islam' ? true : false })}/>
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
                                {...register("revert", { required: religion === 'christian'? true : false })}
                                />
                            <label htmlFor="12">Ndio</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" id='13' 
                                value='Hapana' 
                                name='revert' 
                                // onChange={e =>setRevert(e.target.value)}
                                {...register("revert", { required: religion === 'christian'? true : false  })}
                                />
                            <label htmlFor="13">Hapana</label>
                        </div>                 
                    </div>
                    
                </div>
               
                
                
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
                                {...register("revert", { required: religion === 'others'? true : false })}
                                
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
                                {...register("revert", { required: religion === 'others'? true : false })}
                                />
                            <label htmlFor="13">Hapana</label>
                        </div>                 
                    </div>
                    
                </div>          
                
                
                </>}

               
    
                <div className="items_group">
                    <h3 className='item_title'>Kiwango chako cha Elimu</h3>
                    <div className="selection_btns">
                        <div className="sel_item">
                            <input 
                                type="radio" id='25' 
                                value='Cheti' 
                                name='edu'
                                {...register("edu", {  required:  true  })}
                                />
                            <label htmlFor="25">Cheti</label>
                        </div>
                        <div className="sel_item">
                            <input 
                                type="radio" id='26' 
                                value='Stashahada'
                                 name='edu'
                                 {...register("edu", { required: true} )}
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
                                value='Zaidi ya Shahada' 
                                name='edu'
                                {...register("edu", {required: true })}
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
                            <label htmlFor="27yyyy">Nimeajiriwa</label>
                        </div>   
                        <div className="sel_item">
                            <input 
                                type="radio" id='28yyyy' 
                                value='Sina Shughuri Maalum' 
                                name='emplo'
                                {...register("emplo", { required: true })}
                                />
                            <label htmlFor="28yyyy">Sina Shughuli Maalum</label>
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
               
             
                
              
   
                <div className="items_group">
                    {revert === 'Hapana'? <button className='btn_reg' onClick={() => setThanks(true)}>TUMA</button> :                    
                    <button className='btn_reg' onClick={handleRegister} disabled={!isValid}>{loading? <Loading/> : 'TUMA USAJILI'}</button> 
                    }
                </div>
                </div>
            </motion.div>
            )
        }
    }
  return (
    <div className='register'>
        {thanks && <div className='thanks_wrapper'>
            <div className="thanks_inner">
                Asante kwa maombi yako, ila tunasikita kuwa jukwaa hili ni kwa Waislamu au wale wanaotarajia kuwa Waislam tu.
                <button onClick={() =>setThanks(null)} className='btn_reg'>Rudi</button>
            </div>
        </div>}
        <Nav/>
        {RenderPage()}   
      
    </div>
  )
}

export default Register
