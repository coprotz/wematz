import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CreateReview from '../../components/reviews/CreateReview'
import {  answers } from '../../data'
import {  HiOutlineArrowLeft } from "react-icons/hi";
import useData from '../../hooks/useData';
import moment from 'moment'
import CreateAnswer from './CreateAnswer';

const ViewQue = () => {
    const { id } = useParams()
    const { questions, comments } = useData()
    const que = questions?.find(q => q.id === id)
    const navigate = useNavigate()
    const ans = comments?.filter(a => a.docId === que?.id)

    console.log('que', que)
  return (
    <div className='view_que'>
        <div className="view_que_back">
            <button onClick={() =>navigate(-1)} className='btn_btn'><HiOutlineArrowLeft/></button>
        </div>
        <div className="view_que_top">
            <h1>{que?.que}</h1>
        </div>
        <div className="view_que_author">
            {/* <span>Limeulizwa na</span> */}
            <div className='view_que_photo'>
                <img src={que?.photo} />
            </div>           
            <h4>{que?.name}</h4>          
            <span>{moment(que?.createdAt?.seconds * 1000).format('MMM Do YY, LT') }</span>
        </div>
        <div className="view_que_answers">
            <h3 className='sub_title'>Majibu</h3>
            <div className="view_answers_grid">
                {que?.answers?.map(a => (
                    <div className="que_grid_anwers" key={a.id}>
                        <div className="answerd_photo">
                            <img src={a.photo} />
                        </div>
                        <div className="answered_body">
                            <p>{a.text}</p>
                            <small className='answered_small'>
                                <span>{moment(a?.answeredAt).format('MMM Do YY, LT') }</span>
                            </small>
                        </div>
                    </div>
                ))}
            </div>
            <div className="view_que_create">
                {/* <h3 className='sub_title'>Toa Jibu lako</h3> */}
              <CreateAnswer title='Andika jibu lako' item={que}/>  
            </div>
            
        </div>
    </div>
  )
}

export default ViewQue
