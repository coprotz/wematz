import React from 'react'
import { useNavigate } from 'react-router-dom'

import useData from '../../hooks/useData'

const ClinicCard = ({c}) => {
    const navigate = useNavigate()
    const { doctors } = useData()
    const docs = doctors?.filter(m =>m.status === 'Amethibitishwa').filter(d => d.specialize.includes(`${c?.name}`))

    console.log('docs', docs)
  return (
    <div className="clinic_card" key={c.id} onClick={() =>navigate(`/health/clinics/${c.swahir}`)}>
        <img src={process.env.PUBLIC_URL+`/${c.url}`} />
        <h3>{c?.swahir}</h3>
        <span>{c?.name}</span>
        <h4>{docs?.length} Madaktari</h4>
    </div>
  )
}

export default ClinicCard
