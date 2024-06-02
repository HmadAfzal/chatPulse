import React, { useEffect} from "react"
import {useNavigate} from 'react-router-dom'
const ProtectedRoute = ({Component}) => {
    const navigate=useNavigate();

useEffect(()=>{
    let user=localStorage.getItem('user')
    if (!user) {
        navigate('/auth')}
},[])

    
  return (
   <>
   <Component/>
   </>
  )
}

export default ProtectedRoute