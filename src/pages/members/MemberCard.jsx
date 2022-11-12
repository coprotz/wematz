import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import Loading from '../../components/loading/Loading'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'


const MemberCard = ({member}) => {
    const { followers } = useData()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const myFollowers = followers.filter(f => f?.follower_id === user.uid)
    const isFollower = myFollowers.find(f =>f?.following_id === member?.id)
    const myFollowings = followers.filter(f =>f?.following_id === user.uid)
    console.log('myfoll', myFollowers)

    const followRef = collection(db, 'followers')

    const handleFollow = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            follower_id: user.uid,
            following_id: member?.id
        }
        if(!isFollower){
           try {
            await addDoc(followRef, data)
            setLoading(null)
            } catch (error) {
            console.log(error.message)
            }  
        }else{
            alert('Unamfatilia huyu ndugu')
            setLoading(null)
        }
       
    }

  return (
    <div className="wema_card" key={member?.id}>
        <div className="part_info">
            <img src={member?.photo} alt="" />                                            
        </div>
        <div className="wema_info">
            <h3>{member?.fname+" "+member?.lname}</h3>
            <span>{member?.profes}</span>
            <button 
                className={isFollower? 'btn_isFollow' : 'btn_follow'}
                onClick={handleFollow}
                >{loading? <Loading/> : isFollower? 'Unamfatilia' : 'Mfatilie'}</button>
        </div>
    </div>
  )
}

export default MemberCard
