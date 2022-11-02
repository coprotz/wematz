import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsChatLeftDotsFill,BsFillPersonFill, BsCalendarDay } from "react-icons/bs";
import NewChat from '../messages/NewChat';
import useData from '../../hooks/useData';
import { useAuth } from '../../hooks/useAuth';

const LawyerCard = ({d}) => {
    const navigate = useNavigate()
    const {  lawyers} = useData()
    const { user } = useAuth()

    const isLaw = user.uid === lawyers?.find(l =>l.userId === user.uid)
    console.log('islaw', isLaw)

    console.log('d', d)
  return (
    <div className="doc_card" key={d.id}>
        <img src={d.photo} />
        <div className="doc_card_details">
            <div className="doc_info">
                <h4>{d.name}</h4>
                {d.specialize}  
            </div>
            <div className="meetings_actions">                    
                <button className='btn'><BsCalendarDay/></button>
                <button className='btn' onClick={() =>navigate(`/legals/${d.id}`)}><BsFillPersonFill/></button>
                {!isLaw &&
                <NewChat item={d}/>   }       
            </div>
            
        </div>
    </div> 
  )
}

export default LawyerCard
