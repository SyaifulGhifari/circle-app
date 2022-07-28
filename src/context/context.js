import React, { createContext } from 'react';

const userContext = createContext();

const UserProvider = ({ children }) => {
  const user = {};
  return <userContext></userContext>;
};
