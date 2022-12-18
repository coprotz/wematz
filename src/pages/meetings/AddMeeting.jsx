import React from 'react'
import {  meetings } from '../../data'
import {  BsArrowLeft } from "react-icons/bs";
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Loading from '../../components/loading/Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const memberTypes = [
    {id: '1', value: 'F', name: 'Wanawake'},
    {id: '2', value: 'M', name: 'Wanaume'},
    {id: '3', value: '55', name: 'Vijana'},
    {id: '4', value: 'A', name: 'Wote'},
]



const AddMeeting = () => {
    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});
    const { user } = useAuth()
    const { clubs, users, participants } = useData()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    const partsRef = collection(db, 'participants')
    const roomRef = collection(db, 'rooms')
    const [member, setMember] = useState('')

    const members = member === 'A'? users : 
        member === 'M' ? users?.filter(m => m.gender === 'M') : 
        member === 'F' ? users?.filter(m => m.gender === 'F') : 
        member === '55' ? users?.filter(m => m.age < '55') : null
    



    const name = watch('name')
    const clubId = watch('club')
    const type = watch('type')
    const start_date = watch('date')
    const start_time = watch('time')

    console.log('members', members)

    const handleRoom = async(e) => {
        e.preventDefault()

        setLoading(true)
        
        // const member = user.uid
        

        

        const data = {
            name,                    
            start_date,
            start_time,
            type,
            participants: member,
            createdBy: user.uid,
            date: serverTimestamp()         
        }
        try {
            const newRoom =  await addDoc(roomRef, data) 
            // console.log('room', newRoom.id)
            await setDoc(doc(db, 'participants', `${newRoom.id}`), {
                room: newRoom.id,
                participants: members,
                createdAt: serverTimestamp()

            })  
            setLoading(false)
            navigate('/meetings/mymeetings')      
            
           
        } catch (error) {
            setErr(error.message)
        }
        



    }


  return (
    <motion.div 
             initial={{ x:'100vw'}}
             animate={{x:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }}  
            className='add_meeting'>
         <div className="top_meeting_wrapper">
            <div className="meeting_top">            
                <button onClick={() => navigate('/meetings')} className='btn_btn'><BsArrowLeft/></button>
                <h4 className='title'>Anzisha Ukumbi</h4> 
                {err && <span>{err}</span>}
            </div>            
        </div>
        <div className="items_group">
            <h3 className='item_title'>Jina la Ukumbi</h3>
            <div className="sel_items">
                <input 
                    type="text" 
                    placeholder='Jina la Ukumbi'
                    className='sel_input'
                    name='name'
                    {...register("name", { required: true })}
                    style={{width:'100%'}}                  
                    /> 
            </div>       
        </div>  
        <div className="items_group">
            <h3 className='item_title'>Aina ya Mdaharo</h3>
            <div className="selection_btns">               
                    <div className="sel_item">
                        <input 
                            type="radio" 
                            id='ab123333' 
                            value='Wazi' 
                            name='type' 
                            {...register("type", { required: true })}
                            />
                        <label htmlFor='ab123333'>Wazi</label>
                    </div>
                     <div className="sel_item">
                     <input 
                         type="radio" 
                         id='ab11123' 
                         value='Faragha' 
                         name='type' 
                         {...register("type", { required: true })}
                         />
                     <label htmlFor='ab11123'>Faragha</label>
                 </div>
                       
            </div>
                    
        </div>  
        {type === 'Wazi' &&  
        <div className="items_group">
            <h3 className='item_title'>Aina ya Washiriki</h3>
            <div className="selection_btns">
                {memberTypes.map(c => (
                    <div className="sel_item" key={c.id}>
                        <input 
                            type="radio" 
                            id={c?.id} 
                            value={c?.value} 
                            name='members' 
                            onChange={(e) =>setMember(e.target.value)}
                            // {...register("members", { required: true })}
                            />
                        <label htmlFor={c?.id}>{c?.name}</label>
                    </div>
                ))}        
            </div>
                    
        </div>}
        {type === 'Faragha' &&  
        <div className="items_group">
            <h3 className='item_title'>Weka Washiriki</h3>
            <div className="sel_items">
                <select name="" id="" className="sel_input">
                {users.map(c => (
                    <option value="">
                        <div className="part_card">
                            {c.fname}
                        </div>
                    </option>        

                ))} 
                </select>
                     
            </div>
                    
        </div>}
        <div className="items_group">
            <h3 className='item_title'>Tarehe ya Ukumbi</h3>
            <div className="sel_items">
                <input 
                    type="date" 
                    placeholder='Jina la Mkutano'
                    className='sel_input'
                    name='date'
                    {...register("date", { required: true })}
                    style={{width:'100%'}}
                    /> 
            </div>       
        </div>
        <div className="items_group">
            <h3 className='item_title'>Muda wa Ukumbi</h3>
            <div className="sel_items">
                <input 
                    type="time" 
                    placeholder='Muda wa Ukumbi'
                    className='sel_input'
                    name='time'
                    {...register("time", { required: true })}
                    style={{width:'100%'}}
                    /> 
            </div>       
        </div>
        <div className="items_group">
            <button 
                className='btn_reg'
                onClick={handleRoom}
                >{loading? <Loading/> : 'ANZISHA UKUMBI'}</button>
        </div>
    </motion.div>
  )
}

export default AddMeeting
