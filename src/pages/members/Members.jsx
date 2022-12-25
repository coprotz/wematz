import React from 'react'
import Search from '../../components/search/Search'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import NewDonate from '../donates/NewDonate'
import NewChat from '../messages/NewChat'
import MemberCard from './MemberCard'
import './members.css'
import moment from 'moment';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'




const Members = () => {
    const { users, donates } = useData()
    const { user } = useAuth()
    const cuUser = users?.find(u => u.id === user.uid)
    const wemas = users.filter(u =>u.id !== user.uid)
    const [donate, setDonate] = useState(false)
    const [open, setOpen] = useState(null)
    const navigate = useNavigate()

    const mujaheed = donates?.find(d => d?.user_id === user.uid)   
    const a = new Date().getTime()
    const today = moment(a).format('MMM Do YY, LT')
    const expire = moment(mujaheed?.expiredAt).format('MMM Do YY, LT')
    const valid = expire > today

    const handelNew = (item) => {
        // if(valid){           
             setOpen(item)
        //  }else{
            //  setDonate(item)
        //  }
     }
 
   
  return (
    <div className='members_wrapper'>
        {donate && <NewDonate setDonate={setDonate} item={donate}/>}
        {open && <NewChat setOpen={setOpen} cuUser={cuUser} item={open}/>}  
        <div className="health_top">
            <div className="health_t_1">
                <div className="heading_top">                
                    <div className="view_que_back">
                        <button onClick={() =>navigate(-1)} className='btn_btn'><HiOutlineArrowLeft/></button>
                    </div>
                    <h2 className='title'>WanaWema - {users?.length}</h2>
                    {/* <h1>Ukumbi wa Nikah</h1> */}
                </div>               
                <span className='health_p'>Ni jukumu la kila MwanaWema kushiriki katika platform hii bila kumkwaza mtu mwingine, lengo letu ni kushaurian katika Mema na Kukatazana mabaya.
                </span>              
            </div>
            {/* <div className="health_logo">
                <FaHeartbeat/>
            </div> */}
        </div>
        <div className="nikah_search">
           <Search title='Andika kutafuta MwanaWema'/> 
        </div>
        <div className="wema_grids">
            {wemas.map(member => (
               <MemberCard member={member} key={member.id} handelNew={handelNew}/>
            ))}
        </div> 
    </div>
  )
}

export default Members
