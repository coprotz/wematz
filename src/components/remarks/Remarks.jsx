import React from 'react'
import { GrLike } from 'react-icons/gr'
import useData from '../../hooks/useData'
import './remarks.css'


const Remarks = ({p}) => {
  const { comments } = useData()

  const coms = comments?.filter(c => c.docId === p?.id)
  console.log('coms', coms)
  return (
    <div className="mada_remarks">
        <div className="likes">
          <button className='btn_likes'><GrLike/></button>
          <span>12 Penda</span> 
        </div>
              
        <span>{coms?.length} Maoni</span>
    </div>
  )
}

export default Remarks