
import React from 'react'
import useData from '../../hooks/useData'
import moment from 'moment';

const RoomCard = ({m, setViewParts, index}) => {
    const { rooms } = useData()
    const room = rooms?.find(r => r.id === m?.room)
    console.log('room', room)

  return (
    <tr key={m.id}>
        <td data-label='SN'>{index+1}</td>     
        <td data-label='Jina la Mdaharo' className='tab_column'>{room?.name}</td>
        <td data-label='Aina ya Ukumbi' className='tab_column'>Wazi</td>
        <td data-label='Washiriki' className='tab_column'><button onClick={() =>setViewParts(m)}>Angalia</button></td>
        <td data-label='Tarehe' className='tab_column'>{moment(room?.start_date).format('DD-M-YYYY') }</td>
        <td data-label='Muda' className='tab_column'>{room?.start_time}</td>   
        <td data-label='Hali' className='tab_column'><button onClick={() =>alert('Page under construction')}>Jiunge Sasa</button></td>           
    
    </tr>
  )
}

export default RoomCard
