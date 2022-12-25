import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import Loading from '../../components/loading/Loading'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import { BsChatLeftDotsFill,BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import moment from 'moment'


const MemberCard = ({member, handelNew}) => {
    const { followers } = useData()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const myFollowers = followers.filter(f => f?.follower_id === user.uid)
    const isFollower = myFollowers.find(f =>f?.following_id === member?.id)
    const myFollowings = followers.filter(f =>f?.following_id === user.uid)
    // console.log('myfoll', myFollowers)
    const navigate = useNavigate()

    const followRef = collection(db, 'followers')
    const notificRef = collection(db, 'notifics')
  
    const newNotific = {
      target_id: member?.id,
      uid: user.uid,
      type: 'follow',
      type_id: user.uid,
      action: 'anakufatilia',
      isSeen: false,
      createdAt: serverTimestamp()
    }

  

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
            await addDoc(notificRef, newNotific)
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
            <img src={member?.photo? member?.photo : process.env.PUBLIC_URL + member?.avatar} alt="" />                                            
        </div>
        <div className="wema_info">
            <div className="member_status">
                <h3 onClick={() =>navigate(`/members/${member?.id}`)} className='profile_name'>{member?.name}</h3>
                {member?.isOnline == true ? 
                <span className="status_ind" style={{backgroundColor: '#0df60f'}}></span> :
                <span className="status_ind" style={{backgroundColor: '#aaa'}}></span>
                }
            </div>
            
            <span>{member?.profes}</span>
            <small className='member_time'>Amejiunga : {moment(member?.createdAt.seconds * 1000).format('MMM Do YY') }</small>
            <div className="member_adctions">
                <button 
                    className={isFollower? 'btn_isFollow' : 'btn_follow'}
                    onClick={handleFollow}
                    >{loading? <Loading/> : isFollower? 'Unamfatilia' : 'Mfatilie'}
                </button>
                <button className='btn_btn' onClick={() =>handelNew(member)}><BsChatLeftDotsFill/></button> 
            </div>
            
        </div>
    </div>
  )
}

export default MemberCard
