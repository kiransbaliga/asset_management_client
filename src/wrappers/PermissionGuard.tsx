import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AdminRoles } from '../pages/request_management/consts';

interface PermissionGuardProps {
  children: ReactElement | null;
  redirect?: string;
  userRoles: string[];
}

const PermissionGuard: FC<PermissionGuardProps> = ({
  children,
  redirect,
  userRoles = AdminRoles
}) => {
  const user = useSelector((state: any) => state.auth.user);

  if (user && userRoles.includes(user.role)) return children;
  else if (redirect) return <Navigate to={redirect} />;
};

export default PermissionGuard;
