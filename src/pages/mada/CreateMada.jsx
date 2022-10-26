import React from 'react'
import { useState } from 'react'
import Tiptak from '../../components/tiptap/Tiptap'
import parser from 'html-react-parser'



const CreateMada = () => {
    const [body, setBody] = useState('')
  return (
    
    <div className="create_mada">
        <textarea 
            name="title" 
            id="" placeholder='Kichwa cha Habari'
            class="finder"
            style={{fontSize: '1.2rem'}}
            >
        </textarea>
        <Tiptak setBody={setBody}/>
        {/* <textarea 
            name="" id="" 
            cols="30" 
            rows="10" 
            value={body}
            placeholder='Mada'
            class="finder"
            style={{fontSize: '1.2rem'}}
            >

        </textarea> */}
        <p>{parser(body)}</p>
        <button className='btn_create'>Anzisha</button>
    </div>  
  )
}

export default CreateMada
