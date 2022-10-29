import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { clinics } from '../../data'
import {GrClose } from "react-icons/gr";
import DoctorCard from './DoctorCard';
import useData from '../../hooks/useData';
// import {  HiOutlineArrowLeft } from "react-icons/hi";


const ViewClinic = () => {
    const { name } = useParams()
    const clinic = clinics?.find(c => c.swahir === name)
    const { doctors } = useData()
    const docs = doctors.filter(d => d.specialize.includes(`${clinic?.name}`))

    // console.log('docs', docs)
    const navigate = useNavigate()
  return (
    <div className='view_clinic'>
      <div className="view_clinic_top">
      {/* <div className="view_que_back">
            <button onClick={() =>navigate(-1)} className='btn_back'><HiOutlineArrowLeft/>Afya</button>
        </div> */}
        <div className="view_clini_left">
            <h1>{clinic?.swahir}</h1>
            <span>{clinic?.name}</span>
            
        </div>
        <div className="view_clinic_right">
            <img src={process.env.PUBLIC_URL+`/${clinic?.url}`} />
        </div>
        <button className='btn btn_close2' onClick={() => navigate(-1)}><GrClose/></button>
        
      </div>
      <div className="view_clinic_body">
        <h4 className='card_text'>{clinic?.desc}</h4>
      </div>
      <div className="view_ingredients">
            <h2 className='view_title'>Madaktari({docs?.length})</h2>
            <div className="doctors_inner">
                {docs.map(d => (
                <DoctorCard d={d}/>
                ))}
            
        </div>
        </div>
    </div>
  )
}

export default ViewClinic
