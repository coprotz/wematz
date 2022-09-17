import React from 'react'
import './search.css'
import {  BsSearch } from "react-icons/bs";
import { HiSearchCircle } from "react-icons/hi";

const Search = () => {
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
    <div class="search_container">
      <form autocomplete="off">
        <div class="finder">
          <div class="finder__outer">
            <div class="finder__inner">
              <button className='btn_btn1'><HiSearchCircle/></button>
              <input class="finder__input" type="text" name="q" />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search
