import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.css';
import AssetManagement from '../../pages/asset_management';
import Employees from '../../pages/employees';

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
                <Route path='/employees/*' element={<Employees />} />
                <Route path='/assets/*' element={<AssetManagement />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
