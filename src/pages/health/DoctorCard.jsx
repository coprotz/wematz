import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsChatLeftDotsFill,BsFillPersonFill, BsCalendarDay } from "react-icons/bs";

const DoctorCard = ({d}) => {
    const navigate = useNavigate()
  return (
    <div className="doc_card" key={d.id}>
        <img src={process.env.PUBLIC_URL+`/${d.photo}`} />
        <div className="doc_card_details">
            <div className="doc_info">
                <h4>{d.name}</h4>
                {d.specializes[0]}  
            </div>
            <div className="meetings_actions">                    
                <button className='btn'><BsCalendarDay/></button>
                <button className='btn' onClick={() =>navigate(`/health/doctors/${d.id}`)}><BsFillPersonFill/></button>
                <button className='btn'><BsChatLeftDotsFill/></button>          
            </div>
            
        </div>
    </div> 
  )
}

export default DoctorCard
