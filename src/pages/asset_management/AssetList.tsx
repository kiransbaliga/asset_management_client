import { useNavigate } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import IconButton from '../../components/IconButton/IconButton';
import Table from '../../components/Table/Table';
import {
  assetColumns,
  perishableAssetsColumns,
  perishableAssetsofEmployeeColumns
} from '../../columns/assets.columns';
import Filter from '../../components/filter';
import {
  useDeleteAssetMutation,
  useGetCategoryListQuery,
  useLazyGetAssetListQuery,
  useLazyGetAssetsOfEmployeeQuery,
  useLazyGetPerishableAssetsOfEmployeeQuery,
  useLazyGetSubcategoryListQuery
} from './api';
import { useEffect, useState } from 'react';
import CategoryType from '../../types/CategoryType';
import subcategoryType from '../../types/SubcategoryType';
import AssetFilterType from '../../types/AssetFilterType';
import { empltyAssetFilter, statusOptions } from './consts';
import Dialog, { DialogStateType } from '../../components/Dialog/Dialog';
import Actions from '../../components/Actions/inedx';
import AssetType from '../../types/AssetType';
import { useSelector } from 'react-redux';
import { AdminRoles } from '../request_management/consts';
import PermissionGuard from '../../wrappers/PermissionGuard';
import TabBar from '../../components/tab/TabBar';
import { iconTabAdapter } from '../../components/tab/adapters';
import { faAdd, faList } from '@fortawesome/free-solid-svg-icons';
import TabView from '../../components/tab/TabView';
import { TOAST_TIMOUT, TOAST_TYPE } from '../../components/toast/consts';
import { useUI } from '../../contexts/UIContexts';

const TABS = [
  {
    tab: 'assets',
    props: {
      label: 'Assets',
      icon: faList
    }
  },
  {
    tab: 'consumables',
    props: {
      label: 'Consumables',
      icon: faList
    }
  }
];

function AssetList() {
  const [currentTab, setCurrentTab] = useState('assets');
  const [filterData, setFilterData] = useState<AssetFilterType>(empltyAssetFilter);
  const [deleteDialogState, setDeleteDialogState] = useState<DialogStateType>({ show: false });
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();
  const [getAllAssets, { data: allAssetsDataset, isSuccess: allAssetsSuccess }] =
    useLazyGetAssetListQuery();
  const [getAssetsEmployee, { data: employeeAssetsDataset, isSuccess: employeeAssetsSuccess }] =
    useLazyGetAssetsOfEmployeeQuery();
  const [getSubCategories, { data: subcategoriesDateset }] = useLazyGetSubcategoryListQuery();
  const [getPerishableAssetsOfEmployee, { data: perishableSubcategoriesDataset }] =
    useLazyGetPerishableAssetsOfEmployeeQuery();
  const [
    deleteAsset,
    {
      isSuccess: isDeleted,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      error: deleteErrors
    }
  ] = useDeleteAssetMutation();
  const { data: categoriesDateset } = useGetCategoryListQuery();

  const { createToast } = useUI();

  const categories = categoriesDateset?.data as CategoryType[];
  const subcategories = subcategoriesDateset?.data as subcategoryType[];
  const perishableSubcategories = perishableSubcategoriesDataset?.data as subcategoryType[];

  useEffect(() => {
    if (user && AdminRoles.includes(user.role)) getAllAssets(filterData);
    else if (user) getAssetsEmployee(user.id);
  }, [filterData, user]);
  useEffect(() => {
    if (user && !AdminRoles.includes(user.role)) getPerishableAssetsOfEmployee(user.id);
  }, [user]);

  const assetDataset = allAssetsSuccess
    ? allAssetsDataset
    : employeeAssetsSuccess
    ? employeeAssetsDataset
    : null;

  const assets = assetDataset
    ? assetDataset.data.map((asset: AssetType) => {
        const newAsset = {
          ...asset
        };

        return newAsset;
      })
    : [];

  const action = (id: string) => {
    return (
      <Actions
        onDelete={() => {
          setDeleteDialogState({ show: true, params: { id } });
        }}
        onEdit={() => {
          navigate(`/assets/edit/${id}`);
        }}
      />
    );
  };

  let assetsColumn;

  if (allAssetsSuccess)
    assetsColumn = [...assetColumns, { key: 'id', label: 'Action', adapter: action }];
  else if (employeeAssetsSuccess) assetsColumn = [...assetColumns.slice(0, 3)];
  else assetsColumn = [];

  const subcategoryOptions = subcategories
    ? subcategories
        .filter((subcategory) => subcategory.categoryId == Number(filterData.category))
        .map((subcategory) => ({
          value: subcategory.id,
          text: subcategory.name
        }))
    : [];
  const allPerishableSubcategories = subcategories
    ? subcategories.filter((subcategory) => subcategory.perishable === true)
    : [];
  const perishableSubcategoriesOfEmployee = perishableSubcategories;
  const categoriesOptions = categories
    ? categories.map((category) => ({ value: category.id, text: category.name }))
    : [];

  const handleCreate = () => {
    navigate('/assets/create/');
  };

  const handleDelete = (params) => {
    deleteAsset(params.id);
  };

  const handleTableClick = (data) => {
    if (user && AdminRoles.includes(user.role)) navigate(`/assets/details/${data.id}`);
  };

  const handleFilterSelect = (field: string, value: any) => {
    setFilterData((prevData) => ({ ...prevData, [field]: value }));
  };

  useEffect(() => {
    getSubCategories();
    handleFilterSelect('subcategory', '');
  }, [filterData.category]);

  useEffect(() => {
    if (isDeleted) {
      setDeleteDialogState({ show: false, params: {} });
      createToast(TOAST_TYPE.SUCCESS, 'Delete successfully', 'Employee deleted');
    }
  }, [isDeleted]);

  useEffect(() => {
    if (isDeleteError && deleteErrors)
      createToast(TOAST_TYPE.ERROR, 'Delete failed', 'Somthing went wrong', TOAST_TIMOUT.WAIT);
  }, [isDeleteError]);

  const actionPerishable = (id) => {
    return <Actions onEdit={() => navigate(`/assets/subcategory/edit/${id}`)} />;
  };

  const perishableColumns = [
    ...perishableAssetsColumns,
    { key: 'id', label: 'Action', adapter: actionPerishable }
  ];

  return (
    <>
      <Dialog
        title='Are you sure?'
        onSuccess={handleDelete}
        successLabel='Confirm'
        isLoading={isDeleteLoading}
        state={deleteDialogState}
        setState={setDeleteDialogState}
      >
        <p>Do you really want to delete asset ?</p>
      </Dialog>
      <div className='flex-column height-full'>
        <TitleBar title='Asset List'>
          <PermissionGuard userRoles={AdminRoles}>
            <>
              <Filter
                label='Category'
                options={categoriesOptions}
                value={filterData.category}
                onSelect={(value) => handleFilterSelect('category', value)}
              />
              <Filter
                label='Sub category'
                options={subcategoryOptions}
                value={filterData.subcategory}
                onSelect={(value) => handleFilterSelect('subcategory', value)}
              />
              <Filter
                label='Status'
                options={statusOptions}
                value={filterData.status}
                onSelect={(value) => handleFilterSelect('status', value)}
              />
              <IconButton icon={faAdd} text='Create asset' onClick={handleCreate} />
            </>
          </PermissionGuard>
        </TitleBar>
        <PermissionGuard userRoles={AdminRoles}>
          <div className='card-group'>
            <div className='card count-card'>
              <div className='text-muted'>Total Assets</div>
              <div className='count-value'>{assetDataset?.meta.tot}</div>
            </div>
            <div className='card count-card'>
              <div className='text-muted'>Allocated Assets</div>
              <div className='count-value'>
                {assets.filter((asset) => asset.status === 'Allocated').length}
              </div>
            </div>
            <div className='card count-card'>
              <div className='text-muted'>Unallocated Assets</div>
              <div className='count-value'>
                {assets.filter((asset) => asset.status === 'Unallocated').length}
              </div>
            </div>
            <div className='card count-card'>
              <div className='text-muted'>Damaged Assets</div>
              <div className='count-value '>
                {' '}
                {assets.filter((asset) => asset.status === 'Damaged').length}
              </div>
            </div>
          </div>
        </PermissionGuard>

        <div className='grow flex-column margin-top-1'>
          <TabBar
            className='flex-row'
            tabs={TABS}
            tab={currentTab}
            onChange={setCurrentTab}
            adapter={iconTabAdapter}
          />
          <TabView className='grow margin-top-1' tab={currentTab} name='assets'>
            <div className='height-full padding-top'>
              <Table
                className='height-full'
                columns={assetsColumn}
                dataset={assetDataset?.data}
                onClick={handleTableClick}
                onPaginate={(offset) => {
                  handleFilterSelect('offset', offset);
                }}
                total={assetDataset?.meta.tot}
                emptyMessage='No assets found'
              />
            </div>
          </TabView>

          <TabView className='grow margin-top-1' tab={currentTab} name='consumables'>
            <PermissionGuard>
              <div className='height-full padding-top'>
                <Table
                  className='height-full'
                  columns={perishableColumns}
                  dataset={allPerishableSubcategories ? allPerishableSubcategories : []}
                  emptyMessage='No perishable assets found'
                />
              </div>
            </PermissionGuard>
            {user && !AdminRoles.includes(user.role) && (
              <div className='height-full'>
                <h2>Perishable assets of employee</h2>
                <Table
                  columns={perishableAssetsofEmployeeColumns}
                  dataset={
                    perishableSubcategoriesOfEmployee ? perishableSubcategoriesOfEmployee : []
                  }
                  emptyMessage='No perishable assets found'
                  onClick={() => {}}
                />
              </div>
            )}
          </TabView>
        </div>
      </div>
    </>
  );
}

export default AssetList;
