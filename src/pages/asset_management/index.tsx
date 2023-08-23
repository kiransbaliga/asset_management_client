import { Route, Routes } from 'react-router-dom';
import AssetForm from './AssetForm';
import AssetList from './AssetList';
import UploadExcel from './AssetUpload';
import AssetDetails from './AssetDetails';
import CategoryForm from './CategoryForm';
import SubcategoryForm from './SubcategoryForm';

function AssetManagement() {
  return (
    <Routes>
      <Route index element={<AssetList />} />
      <Route path='/create' element={<AssetForm />} />
      <Route path='/create/upload' element={<UploadExcel />} />
      <Route path='/edit/:id' element={<AssetForm />} />
      <Route path='/details/:id' element={<AssetDetails />} />
      <Route path='/category/create' element={<CategoryForm />} />
      <Route path='/subcategory/create' element={<SubcategoryForm />} />
    </Routes>
  );
}

export default AssetManagement;
