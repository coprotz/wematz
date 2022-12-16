import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  BsArrowLeft } from "react-icons/bs";
import useData from '../../hooks/useData';
import { db, useAuth } from '../../hooks/useAuth';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import Loading from '../../components/loading/Loading';

const donatez = [
    {id: '1', value: '0.99', title: 'Mjaheed kwa Siku', desc: 'Utachat siku nzima (24 hours)', duration: 86400000},
    {id: '2', value: '3.99', title: 'Mjaheed kwa Wiki', desc: 'Utachat kwa wiki moja (7 days)', duration: 604800000},
    {id: '3', value: '9.99', title: 'Mjaheed kwa Mwezi', desc: 'Utachat mwezi mzima (30 days)', duration: 2592000000},
]

const Donates = () => {
    const navigate = useNavigate()
    const { donates } = useData()
    const { user } = useAuth()
    const [loading, setLoading] = useState(null)
    const [active, setActive] = useState(null)

    const donator = donates.find(d => d.user_id === user.uid)
    const donateRef = doc(db, 'donates', `${donator?.id}`)
    const donRef = collection(db, 'donates')
    const userRef = doc(db, 'users', `${user.uid}`)

  

    const handleDonate = async(d) => {
        const a = new Date().getTime()
        const c = d.duration

        const expire = a + c
       
            setLoading(true)
            try {
                if(donator){
                    await updateDoc(donateRef, {
                        expiredAt: expire,
                        amount: d.value,
                        title: d.title,
                        createdAt: serverTimestamp()
                    })
                    
                }else {
                    const data = {
                        user_id: user.uid,
                        expiredAt: expire,
                        amount: d.value,
                        title: d.title,
                        createdAt: serverTimestamp()
                    }
                    await addDoc(donRef, data)
                }
                await updateDoc(userRef, {
                    status: 'Mjaheed'
                })
                setInterval(() => {
                    updateDoc(userRef, {
                        status: 'Bure'
                    })
                }, d.duration)
                setLoading(false)
                navigate(-1)

            } catch (error) {
                console.log(error.message)
            }
        
       
        
        
    }
  return (
    <div className="mjaheed_container">
         <div className="mjaheed_top">
            <button onClick={() => navigate(-1)} className='btn_btn'><BsArrowLeft/></button>
            <h3 className='title'>Kuwa Mjaheed</h3>
        </div>
        <div className='mjaheed_cover'>
            {donatez.map(d => (
                <div className="mjaheed_card" key={d.id}>
                <h2>{d.title}</h2>
                <span>{d.desc}</span>
                <h1>$ {d.value}</h1>
                <button className='btn_sign' onClick={() =>{handleDonate(d);setActive(d.id)}}>{loading && active === d.id? <Loading/> : 'Chagua'}</button>
            </div> 
            ))}
           
            {/* <div className="mjaheed_card">
                <h2>Mjaheed kwa Wiki</h2>
                <span>Utachat kwa wiki moja (7 days)</span>
                <h1>$ 3.99</h1>
                <button className='btn_reg'>Chagua</button>
            </div>
            <div className="mjaheed_card">
                <h2>Mjaheed kwa Mwezi</h2>
                <span>Utachat mwezi mzima (30 days)</span>
                <h1>$ 9.99</h1>
                <button className='btn_reg'>Chagua</button>
            </div> */}
        </div> 
    </div>
   
  )
}

export default Donates
