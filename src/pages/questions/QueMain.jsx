import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { questions } from '../../data';
import './ques.css'

const QueMain = () => {
    const navigate = useNavigate()
  return (
    <div className='main_ques'>
        <div className="main_ques_top">
            <span>Hivi Karibui</span>
            <span>Yaliyoangaliwa zaidi</span>
            <span>Yenye Majibu Mengi</span>
        </div>
        <div className="main_ques_inner">
        {questions?.map(q => (
            <div className="que_card" key={q.id}>
                <div className="que_author">
                    <img src={process.env.PUBLIC_URL+`/${q.photo}`} />
                </div>
                <div className="que_body">
                    <div className="que_date">
                        12 June 2022
                    </div>
                    <div className="que_title">
                        <h2>{q.que}</h2>
                    </div>
                    <div className="que_last">
                        <p>{q.answer}</p>
                    </div>
                    <div className="que_cations">
                        <div className="ques_act_left">
                            <div className="que_answers">
                                125 Majibu
                            </div>
                            <div className="que_answers">
                                12 Wamelitazama
                            </div>
                        </div>
                        <div>
                          <button className='btn_que' onClick={()=>navigate(`/questions/${q.id}`)}>Jibu</button>  
                        </div>
                        
                    </div>
                </div>
            </div> 

        ))}
     
        </div>
    </div>
  )
}

export default QueMain
