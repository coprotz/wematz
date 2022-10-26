import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CreateReview from '../../components/reviews/CreateReview'
import { questions, answers } from '../../data'
import {  HiOutlineArrowLeft } from "react-icons/hi";

const ViewQue = () => {
    const { id } = useParams()
    const que = questions?.find(q => q.id === id)
    const navigate = useNavigate()
    const ans = answers?.filter(a => a.queId === que?.id)
  return (
    <div className='view_que'>
        <div className="view_que_back">
            <button onClick={() =>navigate(-1)} className='btn_back'><HiOutlineArrowLeft/>Rudi Nyuma</button>
        </div>
        <div className="view_que_top">
            <h1>{que.que}</h1>
        </div>
        <div className="view_que_author">
            <span>Limeulizwa na</span>
            <div className='view_que_photo'>
                <img src={process.env.PUBLIC_URL+`/${que.photo}`} />
            </div>           
            <h4>{que.name}</h4>          
            <span>{que.createdAt}</span>
        </div>
        <div className="view_que_answers">
            <h3>Majibu</h3>
            <div className="view_answers_grid">
                {ans?.map(a => (
                    <div className="que_grid_anwers" key={a.id}>
                        <div className="answerd_photo">
                            <img src={process.env.PUBLIC_URL+`/${a.photo}`} />
                        </div>
                        <div className="answered_body">
                            <p>{a.text}</p>
                            <small className='answered_small'>
                                {a.answeredAt}
                            </small>
                        </div>
                    </div>
                ))}
            </div>
            <div className="view_que_create">
                <h3>Toa Jibu lako</h3>
              <CreateReview title='Andika jibu lako'/>  
            </div>
            
        </div>
    </div>
  )
}

export default ViewQue
