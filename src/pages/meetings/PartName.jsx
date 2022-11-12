import React from 'react'
import useData from '../../hooks/useData'

const PartName = ({part}) => {
    const { users } = useData()
    const memberName = users.find(u => u.id === part.userId)
  return (
    <span>{memberName?.fname+" "+memberName?.lname}</span>
  )
}

export default PartName
