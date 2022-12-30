import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CreateReview from '../../components/reviews/CreateReview'
// import {  answers } from '../../data'
import {  HiOutlineArrowLeft } from "react-icons/hi";
import useData from '../../hooks/useData';
import moment from 'moment'
// import CreateAnswer from './CreateAnswer';
import Loading from '../../components/loading/Loading';
import CreateAnswer from './CreateAnswer';
import parser from 'html-react-parser'
import Likes from '../../components/remarks/Likes';
import Remarks from '../../components/remarks/Remarks';
import Reviews from '../../components/reviews/Reviews';
import LoadingPage from '../../components/loading/LoadingPage';


const ViewQue = () => {
    const { id } = useParams()
    const { questions, comments } = useData()
    const que = questions?.find(q => q.id === id)
    const navigate = useNavigate()
    const ans = comments?.filter(a => a.docId === que?.id)
    const [show, setShow] = useState(null)

    const RenderPage = () => {
        if(que){
            return (
                <div className='view_que'>        
                    <div className="view_que_author">
                        <div className="aue_date_userinfo">           
                            <button onClick={() =>navigate('/questions')} className='btn_btn'><HiOutlineArrowLeft/></button>
                            <div className="que_author">
                                {que?.photo?  <img src={que?.photo || process.env.PUBLIC_URL + que?.photo} /> :<Loading/>}
                            </div>                  
                            <div className="showroom">
                                <h4>{que?.name}</h4>                
                                <div className="que_date_status">
                                    <span>{moment(que?.createdAt?.seconds * 1000).format('MMM Do YY, LT') }</span>
                                    <h4>: Ameuliza;</h4> 
                                </div>
                            </div>
                        </div>          
                        
                    </div>
                    <div className="view_que_top">
                        <h3>{que?.que}</h3>
                    </div>
                    
                    <div className="view_que_answers">
                        <h3 className='sub_title'>Majibu({ans?.length})</h3>
                        <div className="view_que_create">
                            {/* <h3 className='sub_title'>Toa Jibu lako</h3> */}
                        <CreateAnswer item={que} type='swali'/>  
                        </div>
                        <div className="view_answers_grid">
                            {ans?.map(a => (
                                <>
                                <div className="que_grid_anwers" key={a.id}>
                                    <div className="answerd_photo">
                                        <img src={a?.photo || process.env.PUBLIC_URL + a?.photo} />
                                    </div>
                                    <div className="answered_body">
                                        
                                        <small className='answered_small'>
                                            <span>{moment(a?.createdAt?.seconds * 1000).format('MMM Do YY, LT') }</span>
                                        </small>
                                        <p className='answer_text'>{parser(`${a.text}`)}</p>
                                        <div className="reaction_div">                                
                                            <Remarks p={a} type='jibu' setShow={setShow}/>
                                            {show &&
                                            <Reviews doc={a} setShow={setShow} type='jibu'/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            
                                </>
                            ))}
                        </div>
                        
                        
                    </div>
                </div>
            )
        }else {
            return (
                <div className="loading_wrapper">
                    <LoadingPage/>
                </div>
                
            )
        }
    } 



    // console.log('que', que)
  return (
    <>{RenderPage()}</>
    
  )
}

export default ViewQue
