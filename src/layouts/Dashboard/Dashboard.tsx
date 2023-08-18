import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.css';
import Employees from '../../pages/employees';
import Employee from '../../pages/employee';
import EmployeeForm from '../../pages/employeeForm';

function Dashboard() {
  return (
    <>
      <div className='full-screen'>
        <div className='flex-column dashboard'>
          <Header />
          <div className='flex-row grow'>
            <Sidebar />
            <div className='dashboard-content'>
              <Routes>
                <Route path='/' element={<Employees />} />
                <Route path='/details/:id' element={<Employee />} />
                <Route path='/create' element={<EmployeeForm />} />
                <Route path='/edit/:id' element={<EmployeeForm />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
