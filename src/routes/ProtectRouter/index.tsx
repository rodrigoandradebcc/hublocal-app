import { Navigate } from 'react-router-dom';
import { UserData } from '../../interfaces/UserData';

interface ProtectRouterProps {
  user: UserData;
  children: JSX.Element;
}

export const ProtectRouter = ({ user, children }: ProtectRouterProps) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};