import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({path}) => {
    const [count,setCount]=useState(3);
    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
        const Interval=setInterval(()=>{
            setCount((preVal) => --preVal)
        },1000)

        count === 0 && navigate(`${path}`,{
            state:location.pathname,
        });
        return () => clearInterval(Interval);
    },[count,navigate])

  return (
    <div style={{width:'100vw',height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <h1>we are redirection you in {count} seconds</h1><br></br>
      <h2>Wait</h2>
    </div>
  )
}

export default Spinner
