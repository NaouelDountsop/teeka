// context/AuthContext.tsx
import React, { createContext, useContext } from 'react';

export const AuthContext = createContext({
  user: { id: 1, name: 'Jean Dupont' },
});
