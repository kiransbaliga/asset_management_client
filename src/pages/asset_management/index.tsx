import { Route, Routes } from 'react-router-dom';
import AssetForm from './AssetForm';
import AssetList from './AssetList';
import UploadExcel from './AssetUpload';
import AssetDetails from './AssetDetails';
import CategoryForm from './CategoryForm';
import SubcategoryForm from './SubcategoryForm';
import { AdminRoles } from '../request_management/consts';
import PermissionGuard from '../../wrappers/PermissionGuard';

function AssetManagement() {
  return (
    <Routes>
      <Route index element={<AssetList />} />
      <Route
        path='/create'
        element={
          <PermissionGuard userRoles={AdminRoles} redirect='/forbidden'>
            <AssetForm />
          </PermissionGuard>
        }
      />
      <Route
        path='/create/upload'
        element={
          <PermissionGuard userRoles={AdminRoles} redirect='/forbidden'>
            <UploadExcel />
          </PermissionGuard>
        }
      />
      <Route
        path='/edit/:id'
        element={
          <PermissionGuard userRoles={AdminRoles} redirect='/forbidden'>
            <AssetForm />
          </PermissionGuard>
        }
      />
      <Route
        path='/details/:id'
        element={
          <PermissionGuard userRoles={AdminRoles} redirect='/forbidden'>
            <AssetDetails />
          </PermissionGuard>
        }
      />
      <Route
        path='/category/create'
        element={
          // <PermissionGuard userRoles={AdminRoles} redirect='/forbidden'>
          <CategoryForm />
          // {/* </PermissionGuard> */}
        }
      />
      <Route
        path='/subcategory/create'
        element={
          // <PermissionGuard userRoles={AdminRoles} redirect='/forbidden'>
          <SubcategoryForm />
          // </PermissionGuard>
        }
      />
      <Route
        path='/subcategory/edit/:id'
        element={
          // <PermissionGuard userRoles={AdminRoles} redirect='/forbidden'>
          <SubcategoryForm />
          // </PermissionGuard>
        }
      />
    </Routes>
  );
}

export default AssetManagement;
