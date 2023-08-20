import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.css';
import Employees from '../../pages/employees';
import Employee from '../../pages/employee';
import EmployeeForm from '../../pages/employeeForm';
import AssetForm from '../../pages/asset_management/assetForm';
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
                <Route path='/' element={<Employees />} />
                <Route path='/details/:id' element={<Employee />} />
                <Route path='/create' element={<EmployeeForm />} />
                <Route path='/edit/:id' element={<EmployeeForm />} />
                <Route path='/assets/create' element={<AssetForm />} />
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
