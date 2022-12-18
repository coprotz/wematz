import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { db } from '../../hooks/useAuth'
import Loading from '../loading/Loading'
import './confirm.css'

const DeleteConfirm = ({id, body, setConfirm, setAlert}) => {
    const [loading, setLoading] = useState(null)

    const deleteItem = async () => {
        setLoading(true)
        try {
            await deleteDoc(doc(db, 'posts', `${id}`))            
            setLoading(false)
            setConfirm(null)
            setAlert('Posti imeondolewa kwenye kanzudata')
            setTimeout(() => {
                setAlert('')
            },3000)
            
        } catch (error) {
            console.log(error.message)
        }
    }
    
  return (
    <div className='confirm_wrapper'>
        <div className="confirm_inner">
            <h2 className="confirm_title">Thibitisha Kufuta</h2>
            <span className='confirm_body'>{body}</span>
            <div className="confirm_btn">
                <button className='btn_yes' onClick={deleteItem}>{loading ? <Loading/> : 'Ndio'}</button>
                <button className='btn_no' onClick={() =>setConfirm(null)}>Hapana</button>
            </div>
        </div>
      
    </div>
  )
}

export default DeleteConfirm
