import { Route, Routes } from 'react-router-dom';
import Employee from './Employee';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import { AdminRoles } from '../request_management/consts';
import PermissionGuard from '../../wrappers/PermissionGuard';

function Employees() {
  return (
    <Routes>
      <Route path='/' element={<EmployeeList />} />
      <Route path='/details/:id' element={<Employee />} />
      <Route
        path='/create'
        element={
          <PermissionGuard userRoles={AdminRoles} redirect='/'>
            <EmployeeForm />
          </PermissionGuard>
        }
      />
      <Route
        path='/edit/:id'
        element={
          <PermissionGuard userRoles={AdminRoles} redirect='/'>
            <EmployeeForm />
          </PermissionGuard>
        }
      />
    </Routes>
  );
}

export default Employees;
