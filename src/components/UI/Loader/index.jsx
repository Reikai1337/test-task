import React from "react";
import  "./index.css";

const Loader = () => {
  return ( 
    <div className='wrapper'>
      <div className='container'>
        <div className='topLeft'></div>
        <div className='topRight'></div>
        <div className='bottomLeft'></div>
        <div className='bottomRight'></div>
      </div>
    </div>
  );
}; 

export default Loader;
