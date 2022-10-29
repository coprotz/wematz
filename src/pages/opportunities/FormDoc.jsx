import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsArrowLeft, BsCamera } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { clinics } from '../../data';
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import useStorage from '../../hooks/useStorage';




const FormDoc = ({setPage}) => {
    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const { user } = useAuth()
    const { users } = useData()
    const cuUser = users?.find(u => u.id === user.uid)

    const navigate = useNavigate()

    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { perc, url } = useStorage(file)
  
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


    const name = watch('name')
    const hospital = watch('hospital')
    const clinic = watch('clinic')
    const specialize = watch('specialize')
    const desc = watch('desc')

    const docRef = collection(db, 'doctors')
    

    const handleDoctor = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            photo: url,
            name,
            hospital,
            clinic,
            specialize,
            desc,
            userId: user.uid,
            age: cuUser?.age,
            location: cuUser?.location,
            gender: cuUser?.gender,
            isOnline: true,
            approved: false,
            edu: cuUser?.edu,
            createdAt: serverTimestamp()

        }

        try {
            await addDoc(docRef, data)
            setLoading(null)
            setPage(3)
        } catch (error) {
            console.log(error.message)
        }
    }
  
  return (
    <div className="opp_form">
    <div className="oppo_head">
      <button onClick={() => setPage(1)} className='btn'><BsArrowLeft/></button>
      <h1>Maombi ya Kuwa WemaDocta</h1>
    </div>
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
              name='name'
              {...register("name", { required: true })}
              style={{width: '100%'}}
            /> 
          </div>                      
      </div>
      <div className="items_group">
          <h3 className='item_title'>Hospitali Unayofanyia Kazi</h3>
          <div className="sel_items">
            <input 
              type="text" 
              placeholder='Jina la Hospitali'
              className='sel_input'
              name='hospital'
              {...register("hospital", { required: true })}
              style={{width: '100%'}}
            /> 
          </div>                      
      </div>
      <div className="items_group">
          <h3 className='item_title'>Clinic gani?</h3>
          <div className="sel_items">
            <input 
              type="text" 
              placeholder='Jina la Clinic'
              className='sel_input'
              name='clinic'
              {...register("clinic", { required: true })}
              style={{width: '100%'}}
            /> 
          </div>                      
      </div>
      <div className="items_group">
        <h3 className='item_title'>Bingwa wa Kitu gani?</h3>
        <div className="selection_btns">
            <div className="sel_items">
              <select 
                name='specialize'  
                className='sel_input'
                style={{width: '100%'}}
                {...register("specialize", { required: true })}
              >
              <option value='' >Chagua</option> 
                {clinics.map((item, index) => (
                  <option value={item.name} key={index}>{item.name} - {item.swahir}</option> 
                ))}
                              
            </select>                          
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
      <div className="items_group">
        <button 
            className='btn_reg' 
            disabled={!isValid}
            onClick={handleDoctor}>{loading? 'Inatuma': 'TUMA USAJIRI'}</button>
      </div>
    
  </div>
  )
}

export default FormDoc
