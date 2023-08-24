import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/token';
import { useGetCurrentUserQuery } from '../services/auth/api';

interface DoNotAuthProps {
  children: ReactElement | null;
}

const DoNotAuth: FC<DoNotAuthProps> = ({ children }) => {
  const token = getToken();

  const { data: user } = useGetCurrentUserQuery();

  return token && user ? <Navigate to='/employees' /> : children;
};

export default DoNotAuth;
