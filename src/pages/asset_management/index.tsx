import { Route, Routes } from 'react-router-dom';
import AssetForm from './AssetForm';
import AssetList from './AssetList';
import UploadExcel from './AssetUpload';
import AssetDetails from './AssetDetails';

function AssetManagement() {
  return (
    <Routes>
      <Route index element={<AssetList />} />
      <Route path='/create' element={<AssetForm />} />
      <Route path='/create/upload' element={<UploadExcel />} />
      <Route path='/edit/:id' element={<AssetForm />} />
      <Route path='/details/:id' element={<AssetDetails />} />
    </Routes>
  );
}

export default AssetManagement;
