import React from 'react'
import './search.css'
import {  BsSearch } from "react-icons/bs";
import { HiSearchCircle } from "react-icons/hi";

const Search = ({title, setSearchTerm}) => {
//   const input = document.querySelector(".finder__input");
// const finder = document.querySelector(".finder");
// const form = document.querySelector("form");

// input.addEventListener("focus", () => {
//   finder.classList.add("active");
// });

// input.addEventListener("blur", () => {
//   if (input.value.length === 0) {
//     finder.classList.remove("active");
//   }
// });

// form.addEventListener("submit", (ev) => {
//   ev.preventDefault();
//   finder.classList.add("processing");
//   finder.classList.remove("active");
//   input.disabled = true;
//   setTimeout(() => {
//     finder.classList.remove("processing");
//     input.disabled = false;
//     if (input.value.length > 0) {
//       finder.classList.add("active");
//     }
//   }, 1000);

// });


  return (
    <div className="search_container">
      <form autoComplete="off">
        <div className="finder">
          <div className="finder__outer">
            <div className="finder__inner">
              <button className='btn_btn1'><HiSearchCircle/></button>
              <input 
                className="finder__input" 
                type="text" name="q" 
                placeholder={title}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search
