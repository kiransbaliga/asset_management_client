import { Route, Routes } from 'react-router-dom';
import AssetForm from './AssetForm';
import AssetList from './AssetList';
import UploadExcel from './assetUpload';

function AssetManagement() {
  return (
    <Routes>
      <Route index element={<AssetList />} />
      <Route path='/create' element={<AssetForm />} />
      <Route path='/create/upload' element={<UploadExcel />} />
    </Routes>
  );
}

export default AssetManagement;
