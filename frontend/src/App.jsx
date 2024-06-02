import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Authpage from './pages/Authpage';
import { UserProvider } from './context/userContext';
import ProtectedRoute from './components/ProtectedRoute';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const App = () => {
  const socket = io('http://localhost:5000');
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setCurrUser(user);
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected', socket.id);
    });
  }, [socket]);

  return (
    <UserProvider>
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route path='/auth' element={<Authpage />} />
            <Route path="/" element={<ProtectedRoute Component={Home} />} />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </UserProvider>
  );
};

export default App;
