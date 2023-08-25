import { Route, Routes } from 'react-router-dom';
import Employee from './Employee';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';

function Employees() {
  return (
    <Routes>
      <Route path='/' element={<EmployeeList />} />
      <Route path='/details/:id' element={<Employee />} />
      <Route path='/create' element={<EmployeeForm />} />
      <Route path='/edit/:id' element={<EmployeeForm />} />
    </Routes>
  );
}

export default Employees;
