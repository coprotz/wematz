import React from 'react'
// import img9 from '../../assets/images/img9.jpg'
import Remarks from '../../components/remarks/Remarks'
import './madas.css'
import moment from 'moment'
// import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'

const MadaCard = ({m}) => {
    const { users } = useData()
    const author = users?.find(u => u.id === m?.uid)
    // console.log('author', author)
    // console.log('m', m)

  return (
    <div className='mada_card'>
        <div className="mada_time">
            <small>{moment(m?.createdAt?.toDate()).format('MMM Do YY, LT')}</small>
            <small>5 Rajab 1444</small>
        </div>
        <h4 className='mada_title'>{m?.title}</h4>
        <div className="mada_details">
            <div className="author_info">
                <div className="author_wrapper">
                    <div className="author_photo">
                        <img src={author?.photo || process.env.PUBLIC_URL + author?.avatar } alt="" />
                    </div>
                    <h5>{author?.name}</h5>
                </div>
                                   
                
            </div>
            <Remarks p={m}/>
        </div>
    </div>
  )
}

export default MadaCard