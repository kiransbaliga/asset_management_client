import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './style.css';
import AssetManagement from '../../pages/asset_management';
import Employees from '../../pages/employees';
import RequestList from '../../pages/request_management/RequestList';
import RequestForm from '../../pages/request_management/RequestForm';
import RequestAdminForm from '../../pages/request_management/RequestAdminForm';
import Request from '../../pages/request_management/Request';

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
                <Route path='/requests/' element={<RequestList />} />
                <Route path='/requests/create' element={<RequestForm />} />
                <Route path='/requests/create/admin' element={<RequestAdminForm />} />
                <Route path='/requests/details/:id' element={<Request />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
