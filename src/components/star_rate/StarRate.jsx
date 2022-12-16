import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { db, useAuth } from '../../hooks/useAuth'
import Loading from '../loading/Loading'
import './starRate.css'

const StarRate = ({setRate, item}) => {
    const [rate, setValue] = useState('')
    const [loading, setLoading] = useState(null)
    const { user } = useAuth()
    // console.log('rate', rate)

    const handleRate = async () => {
        setLoading(true)
        const rateRef = collection(db, 'ratings')
        const data = {
            target_id: item.id,
            uid: user.uid,
            rate: parseInt(rate),
            ratedAt: serverTimestamp()
        }

        try {
            await addDoc(rateRef, data)
            setLoading(null)
            setRate(null)
        } catch (error) {
            console.log(error.message)
        }

    }
  return (
    <div className='star_rate_container'>
        <div className="star_rate_inner">
            <div className="rate_photo">
                <img src={item?.photo} alt="" />                
            </div>
            <h4>{item?.name}</h4>
            <div className="rate_body" value={rate} onChange={(e) =>setValue(e.target.value)}>
                <input type="radio" id="star5" name="rate" value="5" />
                <label for="star5" title="text">5 stars</label>
                <input type="radio" id="star4" name="rate" value="4" />
                <label for="star4" title="text">4 stars</label>
                <input type="radio" id="star3" name="rate" value="3" />
                <label for="star3" title="text">3 stars</label>
                <input type="radio" id="star2" name="rate" value="2" />
                <label for="star2" title="text">2 stars</label>
                <input type="radio" id="star1" name="rate" value="1" />
                <label for="star1" title="text">1 star</label>
            </div>
            <div className="rate_btns">
                <button className='btn_reg' onClick={handleRate} disabled={!rate}>{loading ? <Loading/> : 'Tuma Kiwango'}</button>
                <button className='btn_remove' onClick={() =>setRate(null)}>Batilisha</button> 
            </div>
            
        </div>
    </div>
  )
}

export default StarRate
