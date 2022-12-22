import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import useData from '../../hooks/useData'
import { GrLike } from 'react-icons/gr'
import Loading from '../../components/loading/Loading'
import Remarks from '../../components/remarks/Remarks'
import Likes from '../../components/remarks/Likes'




const QueCard = ({q}) => {
    const navigate = useNavigate()
    const { comments, questions, users } = useData()
    const coms = comments?.filter(c => c.docId === q.id)

    const lastanswer = comments?.findLast(c => c.docId === q.id)
    const author = users?.find(u => u.id === q?.userId)

    console.log('lastanswer', lastanswer)

  return (
    <div className="que_card" key={q.id}>
        <div className="que_author">
            <img src={author?.photo || process.env.PUBLIC_URL + author?.avatar} /> 
        </div>
        <div className="que_body">
            <div className="que_date">
                <small>{moment(q?.createdAt?.seconds * 1000).format('MMM Do YY, LT') }</small>
            </div>
            <div className="que_title" onClick={()=>navigate(`/questions/${q.id}`)}>
                <h2>{q.que}</h2>
            </div>
            {lastanswer &&
            <div className="que_last">
                <div className="answered_guy">
                    <div className="activity_photo">
                        <img src={lastanswer?.photo} /> 
                    </div>
                    amejibu 
                    <small className='last_time'>{moment(lastanswer?.createdAt?.seconds * 1000).format('MMM Do YY, LT') }</small>
                </div>
                <p className='p'>{lastanswer?.text}</p>
                <Likes p={lastanswer} type='jibu'/>
            </div>}
            
            <div className="que_cations">
                <div className="ques_act_left">
                    <div className="que_answers" onClick={()=>navigate(`/questions/${q.id}`)}>
                        {coms?.length > 0 ? coms?.length : 0} Majibu
                    </div>
                    {/* <div className="que_answers">
                        <Remarks p={q}/>                        
                    </div> */}
                </div>
                <div>
                    <button className='btn_que' onClick={()=>navigate(`/questions/${q.id}`)}>Jibu</button>  
                </div>
                        
            </div>
        </div>
    </div> 
  )
}

export default QueCard
