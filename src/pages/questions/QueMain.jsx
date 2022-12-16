import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import useData from '../../hooks/useData';
import './ques.css'
import QueCard from './QueCard';
import { HiOutlineArrowLeft } from 'react-icons/hi';


const QueMain = () => {
    const navigate = useNavigate()
    const { questions } = useData()
  return (
    <div className='main_ques'>
        <div className="main_ques_top">
            <div className="main_que_top">
                <div className="view_que_back">
                    <button onClick={() =>navigate(-1)} className='btn_btn'><HiOutlineArrowLeft/></button>   
                    <h3 className='title'>Maswali na Majibu</h3>                 
                </div>
                {/* <h3>Maswali na Majibu</h3> */}
            </div>                
            <div className='qu_btn'>
                <button className='btn_que' onClick={() =>navigate('/questions/createQue')}>Uliza Swali</button>
            </div>
        </div>
        
        <div className="main_ques_inner">
            {questions?.map(q => (
                <QueCard q={q} key={q.id}/>

            ))}
     
        </div>
    </div>
  )
}

export default QueMain
