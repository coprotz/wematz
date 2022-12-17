import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsArrowLeft, BsCamera } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import { clinics } from '../../data';
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import useStorage from '../../hooks/useStorage';




const FormLaw = ({setPage}) => {
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
    const office = watch('office')
    const court = watch('court')
    const specialize = watch('specialize')
    const desc = watch('desc')

    const lawRef = collection(db, 'lawyers')
    

    const handleDoctor = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            photo: url,
            name,
            office,
            court,
            specialize,
            desc,
            userId: user.uid,
            age: cuUser?.age,
            location: cuUser?.location,
            gender: cuUser?.gender,
            isOnline: true,
            approved: false,
            edu: cuUser?.edu,
            status: 'Hajathibitishwa',
            createdAt: serverTimestamp()

        }

        try {
            await addDoc(lawRef, data)
            setLoading(null)
            setPage(3)
        } catch (error) {
            console.log(error.message)
        }
    }
  
  return (
    <div className="opp_form">
    <div className="oppo_head">
      <button onClick={() => setPage(1)} className='btn_btn'><BsArrowLeft/></button>
      {/* <h1>Maombi ya Kuwa WemaSheria</h1> */}
      <h3 className='title'>Maombi ya Kuwa WemaSheria</h3>
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
          <h3 className='item_title'>Ofisi unayofanyia Kazi</h3>
          <div className="sel_items">
            <input 
              type="text" 
              placeholder='Jina la Ofisi'
              className='sel_input'
              name='office'
              {...register("office", { required: true })}
              style={{width: '100%'}}
            /> 
          </div>                      
      </div>
      <div className="items_group">
          <h3 className='item_title'>Mahakama Unayopatikana Mara kwa Mara?</h3>
          <div className="sel_items">
            <input 
              type="text" 
              placeholder='Jina la Mahakama'
              className='sel_input'
              name='court'
              {...register("court", { required: true })}
              style={{width: '100%'}}
            /> 
          </div>                      
      </div>
      <div className="items_group">
        <h3 className='item_title'>Mbobezi kwenye Kesi Zipi?</h3>
        <div className="selection_btns">
            <div className="sel_items">
              <select 
                name='specialize'  
                className='sel_input'
                style={{width: '100%'}}
                {...register("specialize", { required: true })}
              >
                <option value='' >Chagua</option>                 
                <option value='Kesi za Familia'>Kesi za Familia</option> 
                <option value='Kesi za Madai'>Kesi za Madai</option> 
                <option value='Kesi za Jinai'>Kesi za Jinai</option> 
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
            disabled={!isValid || !url}
            onClick={handleDoctor}>{loading? <Loading/>: 'TUMA USAJIRI'}</button>
      </div>
    
  </div>
  )
}

export default FormLaw
