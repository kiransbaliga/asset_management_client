import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/token';

interface DoNotAuthProps {
  children: ReactElement | null;
}

const DoNotAuth: FC<DoNotAuthProps> = ({ children }) => {
  const token = getToken();

  return token ? <Navigate to='/employees' /> : children;
};

export default DoNotAuth;
