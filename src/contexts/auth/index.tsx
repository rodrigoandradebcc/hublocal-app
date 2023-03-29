import { createContext, useState } from 'react';
import { api } from '../../config';
import { TokenData } from '../../interfaces/TokenData';
import { UserData } from '../../interfaces/UserData';
import { LoginData } from '../../interfaces/LoginData';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export interface AuthContextValues {
  user?: UserData;
  token?: TokenData;
  signIn: (credentials: LoginData) => Promise<void>;
}

interface AuthProps {
  children: JSX.Element;
}


export const AuthContext = createContext({} as AuthContextValues);

const USER_KEY = '@HUB-LOCAL-APP:user'
export const TOKEN_KEY = '@HUB-LOCAL-APP:token'

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<UserData>();
  const [token, setToken] = useState<TokenData>();
  const navigate = useNavigate();

  function goToCompanies(): void {
    navigate('/companies');
  }

  const toastSuccess = () => toast.success("Login feito com sucesso!");

  const signIn = async({ email, password }: LoginData) => {
    try{
      const response = await api.post('auth', {
        email,
        password,
      });

      const { accessToken, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;
      
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      toastSuccess();

      setUser(user);
      setToken(token);

      goToCompanies();
    } catch (error) {
      const err = error as AxiosError
      toast.error(err.message);
    }
  }

  const contextValues: AuthContextValues = {
    user,
    token,
    signIn
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
  
}

