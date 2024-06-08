import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
