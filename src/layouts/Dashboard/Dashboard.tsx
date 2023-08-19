import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.css';
import Employees from '../../pages/employees';
import Employee from '../../pages/employee';
import EmployeeForm from '../../pages/employeeForm';
import AssetList from '../../pages/asset_management/AssetList';

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
                <Route path='/employees' element={<Employees />} />
                <Route path='/employees/details/:id' element={<Employee />} />
                <Route path='/employees/create' element={<EmployeeForm />} />
                <Route path='/employees/edit/:id' element={<EmployeeForm />} />
                <Route path='/assets' element={<AssetList />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
