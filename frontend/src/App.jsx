import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Authpage from './pages/Authpage';
import { UserProvider } from './context/userContext';
import ProtectedRoute from './components/ProtectedRoute';
import { io } from 'socket.io-client';

const App = () => {
  const [currUser, setCurrUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrUser(user?.user);
    if (user?.user) {
      const newSocket = io('http://localhost:5000', {
        query: { userId: user.user._id }
      });
      setSocket(newSocket);
      newSocket.on('getOnlineUsers', (onlineUsers) => {
        setOnlineUsers(onlineUsers);
      });
      return () => newSocket.close();
    }
  }, []);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/auth' element={<Authpage />} />
          <Route path="/" element={<ProtectedRoute Component={Home} socket={socket} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
