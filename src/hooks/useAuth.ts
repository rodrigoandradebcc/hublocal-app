import {useContext} from 'react';

import {AuthContext, AuthContextValues} from '../contexts/auth';


export const useAuth = (): AuthContextValues => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
