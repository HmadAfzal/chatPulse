import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Authpage from './pages/Authpage';
import { UserProvider } from './context/userContext';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
  const [currUser, setCurrUser]=useState(null);
  useEffect(()=>{
    const user=localStorage.getItem('user');
    setCurrUser(user)
  })
  return (
<UserProvider>
    <Router>
<Routes>
<Route path='/auth' element={<Authpage/>}/>
<Route path="/" element={<ProtectedRoute Component={Home}/>} />
</Routes>
    </Router>
  </UserProvider>
    
  )
}

export default App