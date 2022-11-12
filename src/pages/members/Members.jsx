import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import MemberCard from './MemberCard'
import './members.css'

const Members = () => {
    const { users } = useData()
    const { user } = useAuth()
    const wemas = users.filter(u =>u.id !== user.uid)
   
  return (
    <div className='members_wrapper'>
        <div className="health_top">
            <div className="health_t_1">
                <h1>WanaWema - {users?.length}</h1>
                <span className='health_p'>Ni jukumu la kila MwanaWema kushiriki katika platform hii bila kumkwaza mtu mwingine, lengo letu ni kushaurian katika Mema na Kukatazana mabaya.
                </span>              
            </div>
            {/* <div className="health_logo">
                <FaHeartbeat/>
            </div> */}
        </div>
        <div className="wema_grids">
            {wemas.map(member => (
               <MemberCard member={member} />
            ))}
        </div> 
    </div>
  )
}

export default Members
