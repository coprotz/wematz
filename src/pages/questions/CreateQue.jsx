import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import {  HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import { useForm } from "react-hook-form";



const CreateQue = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { users } = useData()

    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const cuUser = users?.find(u => u.id === user?.uid)
    const queRef = collection(db, 'questions')
    const notificRef = collection(db, 'notifics')

    const cat = watch('cat')
    const que = watch('que')

    const res = users.map(({id}) => id)

    // console.log('res', res)

    const handleQue = async(e) => {
        e.preventDefault()

        setLoading(true)

      

        const data = {
            cat,
            que,
            userId: user.uid,
            photo: cuUser.photo ? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar,
            name: cuUser?.name,
            answers: [],
            createdAt: serverTimestamp()
        }

        try {
           const newQue = await addDoc(queRef, data)
            setLoading(null)            
            navigate('/questions')

            const newNotific = {
                target_ids: res,
                uid: user.uid,
                type:'que',
                action: 'ameanzisha swali jipya, kuwa wa kwanza kujibu',
                isSeen: false,
                type_id: newQue?.id,
                createdAt: serverTimestamp()
              }

              await addDoc(notificRef, newNotific)
        } catch (error) {
            console.log(error.message)
        }

    }

  return (
    <div className='create_que'>
        <div className="view_que_back">
            <button onClick={() =>navigate(-1)} className='btn_btn'><HiOutlineArrowLeft/></button>
            {/* <h3>Uliza Swali</h3> */}
            <h3 className='title'>Uliza Swali</h3>
        </div>
       <div className="items_group que_cat">
            <h3 className='item_title'>Kategoria ya Swali</h3>
            <div className="selection_btns">
                <div className="sel_items">
                    <select 
                        name='cat'  
                        className='sel_input que_cat' 
                        style={{width:'100%'}}
                        {...register("cat", { required: true })}

                    >
                        <option value='' >Chagua Kategori ya Swali</option>                      
                        <option value='Fiqh'>Fiqh</option> 
                        <option value='Quran'>Quran</option> 
                        <option value='Sunnah na Hadith'>Sunnah na Hadith</option> 
                        <option value='Terekh'>Tarekh</option> 
                    </select>                          
                </div>
            </div>                    
        </div>
        <div className="items_group">
            <h3 className='item_title'>Uliza Swali</h3>  
            <div className="sel_items">
                <textarea  
                    name='que' 
                    placeholder='Andika Swali' 
                    className='sel_textarea' 
                    {...register("que", { required: true })}
                    /> 
            </div>                 
        </div>

        <div className="items_group">
            <button 
                className='btn_reg' 
                disabled={!isValid}
                onClick={handleQue}
                >{loading? 'Inatuma': 'TUMA SWALI'}</button>
        </div>
    </div>
  )
}

export default CreateQue
