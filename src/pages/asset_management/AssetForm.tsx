import { useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import InputField from '../../components/InputField/InputField';
import { useEffect, useState } from 'react';
import SelectFied from '../../components/SelectField/SelectField';
import { emptyAsset, statusOptions } from './consts';
import './styles.css';
import AssetType from '../../types/AssetType';
import IconButton from '../../components/IconButton/IconButton';
import {
  useCreateAssetMutation,
  useGetCategoryListQuery,
  useLazyGetAssetByIdQuery,
  useLazyGetSubcategoryListQuery,
  useUpdateAssetMutation
} from './api';
import CategoryType from '../../types/CategoryType';
import subcategoryType from '../../types/SubcategoryType';

function AssetForm() {
  const [assetData, setAssetData] = useState<AssetType>(emptyAsset);
  const [currentCategory, setCurrentCategory] = useState<any>(null); // Initialize with null
  const { id } = useParams();
  const navigate = useNavigate();
  const [getSubCategories, { data: subcategoriesDateset }] = useLazyGetSubcategoryListQuery();
  const { data: categoriesDateset } = useGetCategoryListQuery();
  const [createAsset, { isSuccess: isCreateSuccess }] = useCreateAssetMutation();
  const [updateAsset, { isSuccess: isUpdateSuccess }] = useUpdateAssetMutation();
  const [getAssetById, { data: getAssetData }] = useLazyGetAssetByIdQuery();
  const categories = categoriesDateset?.data as CategoryType[];
  const subcategories = subcategoriesDateset?.data as subcategoryType[];

  const categoryOptions = categories
    ? categories.map((category) => ({ value: category.id, text: category.name }))
    : [];
  const subcategoryOptions = subcategories
    ? subcategories
        .filter((subcategory) => subcategory.categoryId == currentCategory)
        .map((subcategory) => ({
          value: subcategory.id,
          text: subcategory.name
        }))
    : [];

  const handleEditClick = () => {
    navigate('/assets/create/upload');
  };

  const handleChange = (field: string, value: any) => {
    setAssetData((prevData) => ({ ...prevData, [field]: value }));
    console.log(assetData);
  };

  const handleSubmit = () => {
    if (id) updateAsset(assetData);
    else createAsset(assetData);
  };

  useEffect(() => {
    if (id) getAssetById(id);
  }, [id]);
  useEffect(() => {
    if (isCreateSuccess) navigate('/assets/');
  }, [isCreateSuccess]);

  useEffect(() => {
    if (getAssetData?.data) {
      const assetData = getAssetData.data as AssetType;

      setAssetData(assetData);
    }
  }, [getAssetData]);

  useEffect(() => {
    if (isUpdateSuccess) navigate('/assets/');
  }, [isUpdateSuccess]);

  useEffect(() => {
    getSubCategories();
    handleChange('subcategoryId', '');
  }, [currentCategory]);

  return (
    <div className='asset-form'>
      <TitleBar title={id ? 'Edit Asset' : 'Create Asset'}>
        {id === undefined && (
          <IconButton
            text='Upload via Excel'
            icon='/assets/icons/upload.png'
            onClick={handleEditClick}
          />
        )}
      </TitleBar>
      <div className='card'>
        <div className='flex-row'>
          <div className='column'>
            <InputField
              id='serialNumberField'
              type='text'
              label='Serial Number'
              placeholder='Serial  Number'
              value={assetData.serial_no}
              onChange={(value) => handleChange('serial_no', value)}
            />
          </div>
          <div className='column'>
            <InputField
              id='assetNameField'
              label='Name'
              placeholder='Asset name'
              value={assetData.name}
              onChange={(value) => handleChange('name', value)}
            />
          </div>
          <div className='column'>
            <SelectFied
              id='categoryField'
              label='Category'
              placeholder='Choose a category'
              options={categoryOptions}
              value={currentCategory}
              onChange={setCurrentCategory}
            />
          </div>
          {!currentCategory && <div className='column'> </div>}
          {currentCategory && (
            <div className='column'>
              <SelectFied
                id='subCategoryField'
                label='Sub-category'
                placeholder='Choose a sub-category'
                options={subcategoryOptions}
                value={assetData.subcategoryId}
                onChange={(value) => handleChange('subcategoryId', Number(value))}
              />
            </div>
          )}

          {id && (
            <div className='column'>
              <SelectFied
                id='statusField'
                label='Status'
                placeholder='Choose a status'
                options={statusOptions}
                value={assetData.status}
                onChange={(value) => handleChange('status', value)}
              />
            </div>
          )}
          {id && (
            <div className='column'>
              {assetData.status === 'Allocated' && (
                <InputField
                  id='EmployeeIdField'
                  label='Allocated Employee ID'
                  placeholder='Allocated Employee ID'
                  value={assetData.employeeId === 0 ? '' : assetData.employeeId}
                  onChange={(value) => handleChange('employeeId', Number(value))}
                />
              )}
            </div>
          )}
          <div className='column'></div>
          <div className='column request-btn'>
            <div className='btn-group'>
              <button className='btn btn-primary' onClick={handleSubmit}>
                {id ? 'Edit' : 'Create'}
              </button>
              <button className='btn btn-secondary'>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetForm;
