import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import useData from '../../hooks/useData';
import './ques.css'
import QueCard from './QueCard';

const QueMain = () => {
    const navigate = useNavigate()
    const { questions } = useData()
  return (
    <div className='main_ques'>
        <div className="main_ques_top">
            <h3>Maswali na Majibu</h3>
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
