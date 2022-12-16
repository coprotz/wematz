import React from 'react'
import {GrClose } from "react-icons/gr";
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import AppointCard from './AppointCard';

const Appoints = ({setAppoints, target, isDoc, isLaw}) => {
    const { user } = useAuth()
    const { appoints } = useData()
    // const cuUser = users?.find(u =>u.id === user.uid)
    const userappoints = appoints?.filter(a => a.uid === user.uid)
    const docappoints = appoints?.filter(a =>a.target_id === target?.id)
    const lawappoints = appoints?.filter(a =>a.target_id === target?.id)
    // console.log('userappoints', userappoints)
    // console.log('appoints', appoints)
    // console.log('target', target)
    // console.log('docappoints', docappoints)
    // console.log('isTarget', isDoc)

    const RenderAppoints = () => {
        if(isDoc){
            return (
                <>
                {docappoints?.length > 0 ?
                    <div className="alerts_inner">
                        {docappoints?.map(item => (
                            <AppointCard key={item.id} item={item} isDoc={isDoc}/>
                        ))}               
                    </div>:
                    <h1 className='app_no_booked'>No appontment booked</h1>
                }
                </>
            )
        }else if(isLaw){
            return (
                <>
                {lawappoints?.length > 0 ?
                    <div className="alerts_inner">
                        {lawappoints?.map(item => (
                            <AppointCard key={item.id} item={item} isLaw={isLaw}/>
                        ))}               
                    </div>:
                    <h1 className='app_no_booked'>No appontment booked</h1>
                }
                </>
            )
        }else {
            return (
                <>
                {userappoints?.length > 0 ?
                <div className="alerts_inner">
                    {userappoints?.map(item => (
                        <AppointCard key={item.id} item={item}/>
                    ))}               
                </div>:
                <h1 className='app_no_booked'>No appontment booked</h1>
                }
                </>
            )
        }
    }

  return (
    <div className="not_wrapper">
        <div className="not_inner">
            <div className="not_inner_top">
                <h2>Appointment booked</h2>
                <button className='btn_btn' onClick={() => setAppoints(null)}><GrClose/></button>
            </div>
           {RenderAppoints()}
          
        </div>
    </div>
  )
}

export default Appoints
