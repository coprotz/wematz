import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import {  BsSearch } from "react-icons/bs";
import { CgSmileNone } from 'react-icons/cg';
import { HiSearchCircle } from "react-icons/hi";
import { db } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import SearchUser from './SearchUser';

const Search = ({setCurrentUser}) => {
    const [name,setName] = useState('')
    const [cuUser, setCuUser] = useState(null)
    // const [searchTerm, setSearchTerm] = useState("")
    const { users } = useData()

    // console.log('name', name)

    const handleSearch = async () => {
      
    }

    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch()
    }
  return (
    <div class="search_container">    
        <div class="finder">
          <div class="finder__outer">
            <div class="finder__inner">
              <button className='btn_btn1'><HiSearchCircle/></button>
              <input 
                class="finder__input" 
                type="text" 
                name="q" 
                placeholder='Tafuta MwanaWema'
                onKeyDown={handleKey}
                onChange={(e) =>setName(e.target.value)}
                />
            </div>
          </div>
        </div> 
        {name && (
        <div className="users_found">
            {users?.filter((val) => {
              if(name === ''){
                return undefined
              }else if(val.name.toLowerCase().includes(name.toLocaleLowerCase())){
                return val
              }
            }).map(d => (
              <SearchUser d={d}/>
            ))}
        </div>)} 
    </div> 
  )
}

export default Search
