
import React from 'react'
import loading from "../assets/1495.gif"

const Loader = () =>{
    return (
      <div role="status">
        <img src= {loading} alt="loading" />
      </div>
    )
  }
  
export default Loader