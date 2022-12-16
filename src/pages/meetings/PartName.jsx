import React from 'react'
import useData from '../../hooks/useData'

const PartName = ({part}) => {
    const { users } = useData()
    const memberName = users.find(u => u.id === part)
  return (
    <span>{memberName?.name}</span>
  )
}

export default PartName
