import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/token';
import { useGetCurrentUserQuery } from '../services/auth/api';

interface AuthRequiredProps {
  children: ReactElement | null;
}

const AuthRequired: FC<AuthRequiredProps> = ({ children }) => {
  const token = getToken();
  const { data: user } = useGetCurrentUserQuery();

  user;

  return token ? children : <Navigate to='/login' />;
};

export default AuthRequired;
