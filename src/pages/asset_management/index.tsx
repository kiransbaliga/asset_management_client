import { Route, Routes } from 'react-router-dom';
import AssetForm from './AssetForm';
import AssetList from './AssetList';

function AssetManagement() {
  return (
    <Routes>
      <Route index element={<AssetList />} />
      <Route path='/create' element={<AssetForm />} />
      <Route path='/edit/:id' element={<AssetForm />} />
    </Routes>
  );
}

export default AssetManagement;
