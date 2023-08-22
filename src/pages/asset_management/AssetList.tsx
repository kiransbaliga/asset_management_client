import { useNavigate } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import IconButton from '../../components/IconButton/IconButton';
import Table from '../../components/Table/Table';
import { assetColumns } from '../../columns/assets.columns';
import Filter from '../../components/filter';
import {
  useDeleteAssetMutation,
  useGetCategoryListQuery,
  useLazyGetAssetListQuery,
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

function AssetList() {
  const [filterData, setFilterData] = useState<AssetFilterType>(empltyAssetFilter);
  const [deleteDialogState, setDeleteDialogState] = useState<DialogStateType>({ show: false });

  const navigate = useNavigate();
  const [getAssets, { data: assetDataset }] = useLazyGetAssetListQuery();
  const [getSubCategories, { data: subcategoriesDateset }] = useLazyGetSubcategoryListQuery();
  const [deleteAsset, { isSuccess: isDeleted, isLoading: isDeleteLoading }] =
    useDeleteAssetMutation();
  const { data: categoriesDateset } = useGetCategoryListQuery();

  const assets = assetDataset.data as AssetType[];

  const categories = categoriesDateset?.data as CategoryType[];
  const subcategories = subcategoriesDateset?.data as subcategoryType[];

  const subcategoryOptions = subcategories
    ? subcategories
        .filter((subcategory) => subcategory.categoryId == Number(filterData.category))
        .map((subcategory) => ({
          value: subcategory.id,
          text: subcategory.name
        }))
    : [];

  const categoriesOptions = categories
    ? categories.map((category) => ({ value: category.id, text: category.name }))
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

  const assetTableColumns = [...assetColumns, { key: 'id', label: 'Action', adapter: action }];

  const handleCreate = () => {
    navigate('/assets/create/');
  };

  const handleDelete = (params) => {
    deleteAsset(params.id);
  };

  const handleTableClick = (data) => {
    navigate(`/assets/details/${data.id}`);
  };

  const handleFilterSelect = (field: string, value: any) => {
    setFilterData((prevData) => ({ ...prevData, [field]: value }));
  };

  useEffect(() => {
    getSubCategories();
    handleFilterSelect('subcategoryId', '');
  }, [filterData.category]);

  useEffect(() => {
    getAssets(filterData);
  }, [filterData]);

  useEffect(() => {
    if (isDeleted) setDeleteDialogState({ show: false, params: {} });
  }, [isDeleted]);

  console.log(assets.filter((asset) => asset.status === 'Allocated'));

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
      <div className='flex-column'>
        <TitleBar title='Asset List'>
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
          <IconButton icon='/assets/icons/plus.png' text='Create asset' onClick={handleCreate} />
        </TitleBar>
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

        <div className='grow-scroll'>
          <Table
            columns={assetTableColumns}
            dataset={assetDataset?.data}
            onClick={handleTableClick}
          />
        </div>
      </div>
    </>
  );
}

export default AssetList;
