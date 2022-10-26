import React from 'react'
import { Outlet } from 'react-router-dom';

const AllRecipies = () => {
  return (
    <div className='all_recipies'>
      <Outlet/>
    </div>
  )
}

export default AllRecipies
