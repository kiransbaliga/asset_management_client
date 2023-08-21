import { Route, Routes } from 'react-router-dom';
import AssetForm from './AssetForm';
import AssetList from './AssetList';
import UploadExcel from './AssetUpload';

function AssetManagement() {
  return (
    <Routes>
      <Route index element={<AssetList />} />
      <Route path='/create' element={<AssetForm />} />
      <Route path='/create/upload' element={<UploadExcel />} />
      <Route path='/edit/:id' element={<AssetForm />} />
    </Routes>
  );
}

export default AssetManagement;
