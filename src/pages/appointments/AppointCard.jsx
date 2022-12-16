import React from 'react'
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import moment from 'moment';
import { doc, updateDoc } from 'firebase/firestore';

const AppointCard = ({item, isLaw, isDoc}) => {
    const { user } = useAuth()
    const { users, appoints, doctors, lawyers } = useData()
    const cuUser = users?.find(u =>u.id === item?.uid)
    const target = doctors?.find(d => d.id === item?.target_id) || lawyers?.find(d => d.id === item?.target_id)

    const RenderCard = () => {
        if(isDoc){
            return (
                <div className="appoint_card1">
                    <div className="card_app_top">
                        <div className="app_details">
                            <img src={cuUser?.photo? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar} alt="" />
                            <h4 className='app_name'>{cuUser?.name}</h4>
                        </div>
                        <>
                            {item?.status === 'Confirmed' && <div className='app_accepted'>{item?.status}</div>}
                            {item?.status === 'Pending' && <div className='app_pending'>{item?.status}</div>}
                            {item?.status === 'Rejected' && <div className='app_rejected'>{item?.status}</div>}
                        </>
                    </div>
                    
                                
                    <div className="apo_wrapper">
                        <span>On</span>
                        <h4>{moment(item?.date).format("ddd, MMM Do YYYY")}</h4>
                        <span>at</span>
                        <h4>{item?.time}</h4>  
                    </div>
                    <p>{item?.body}</p>
                    
                    <div className="apo_actions_btns">
                        {item?.status !== 'Confirmed' &&
                        <button 
                            className='app_accepted' 
                            style={{width: '100%'}}
                            onClick={() => updateDoc(doc(db, 'appoints', `${item?.id}`), {status: 'Confirmed'})}
                            >Confirm
                        </button>}
                        {item?.status !== 'Rejected' && 
                        <button 
                            className='app_rejected'
                            style={{width: '100%'}}
                            onClick={() => updateDoc(doc(db, 'appoints', `${item?.id}`), {status: 'Rejected'})}
                            >Reject
                        </button>}
                    </div>
                                
                </div>
            )
        }else if(isLaw){
            return (
                <div className="appoint_card1">
                    <div className="card_app_top">
                        <div className="app_details">
                            <img src={cuUser?.photo? cuUser?.photo : process.env.PUBLIC_URL + cuUser?.avatar} alt="" />
                            <h4 className='app_name'>{cuUser?.name}</h4>
                        </div>
                        <>
                            {item?.status === 'Confirmed' && <div className='app_accepted'>{item?.status}</div>}
                            {item?.status === 'Pending' && <div className='app_pending'>{item?.status}</div>}
                            {item?.status === 'Rejected' && <div className='app_rejected'>{item?.status}</div>}
                        </>
                    </div>
                    
                                
                    <div className="apo_wrapper">
                        <span>On</span>
                        <h4>{moment(item?.date).format("ddd, MMM Do YYYY")}</h4>
                        <span>at</span>
                        <h4>{item?.time}</h4>  
                    </div>
                    <p>{item?.body}</p>
                    
                    <div className="apo_actions_btns">
                        {item?.status !== 'Confirmed' &&
                        <button 
                            className='app_accepted' 
                            style={{width: '100%'}}
                            onClick={() => updateDoc(doc(db, 'appoints', `${item?.id}`), {status: 'Confirmed'})}
                            >Confirm
                        </button>}
                        {item?.status !== 'Rejected' && 
                        <button 
                            className='app_rejected'
                            style={{width: '100%'}}
                            onClick={() => updateDoc(doc(db, 'appoints', `${item?.id}`), {status: 'Rejected'})}
                            >Reject
                        </button>}
                    </div>
                                
                </div>
            )
        }else {
            return (
                <div className="appoint_card1">
                    <div className="app_details">
                        <img src={target?.photo} alt="" />
                        <h4 className='app_name'>{target?.name}</h4>
                    </div>
                                
                    <div className="apo_wrapper">
                        <span>On</span>
                        <h4>{moment(item?.date).format("ddd, MMM Do YYYY")}</h4>
                        <span>at</span>
                        <h4>{item?.time}</h4>  
                    </div>
                    {item?.status === 'Confirmed' && <div className='app_accepted'>{item?.status}</div>}
                    {item?.status === 'Pending' && <div className='app_pending'>{item?.status}</div>}
                    {item?.status === 'Rejected' && <div className='app_rejected'>{item?.status}</div>}
                    
                
                                
                </div>
            )
        }
    }
    
    console.log('item', item)
  return (
    <>{RenderCard()}</>
  )
}

export default AppointCard
