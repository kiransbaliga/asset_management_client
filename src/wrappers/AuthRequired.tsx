import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/token';

interface AuthRequiredProps {
  children: ReactElement | null;
}

const AuthRequired: FC<AuthRequiredProps> = ({ children }) => {
  const token = getToken();

  return token ? children : <Navigate to='/login' />;
};

export default AuthRequired;
