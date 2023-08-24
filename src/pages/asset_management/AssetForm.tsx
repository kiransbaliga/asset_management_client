import { useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import InputField from '../../components/InputField/InputField';
import { useEffect, useState } from 'react';
import SelectField from '../../components/SelectField/SelectField';
import { emptyAsset, statusOptions } from './consts';
import './styles.css';
import AssetType from '../../types/AssetType';
import IconButton from '../../components/IconButton/IconButton';
import {
  useCreateAssetMutation,
  useGetCategoryListQuery,
  useLazyGetAssetByIdQuery,
  useLazyGetSubcategoryListQuery,
  useUpdateAssetMutation,
  useUploadFileMutation
} from './api';
import CategoryType from '../../types/CategoryType';
import subcategoryType from '../../types/SubcategoryType';
import Button from '../../components/button';
import { Link } from 'react-router-dom';

function AssetForm() {
  const [assetData, setAssetData] = useState<AssetType>(emptyAsset);
  const [currentCategory, setCurrentCategory] = useState<any>(null); // Initialize with null
  const { id } = useParams();
  const navigate = useNavigate();
  const [getSubCategories, { data: subcategoriesDateset }] = useLazyGetSubcategoryListQuery();
  const subcategories = subcategoriesDateset?.data as subcategoryType[];
  const [hide, setHide] = useState('hidenow');
  const [createAsset, { isSuccess: isCreateSuccess }] = useCreateAssetMutation();
  const [updateAsset, { isSuccess: isUpdateSuccess }] = useUpdateAssetMutation();
  const [getAssetById, { data: getAssetData }] = useLazyGetAssetByIdQuery();
  const { data: categoriesDateset } = useGetCategoryListQuery();
  const categories = categoriesDateset?.data as CategoryType[];

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
    // navigate('/assets/create/upload');
    setHide('suku');
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadFile] = useUploadFileMutation();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append('file', selectedFile);

    try {
      await uploadFile(formData);
      console.log(selectedFile);
      console.log('File uploaded successfully');
      setHide('hidenow');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <div className={'blur ' + hide}>
        <div className={'upload-card  card flex-column upload '}>
          <button onClick={() => setHide('hidenow')}>X close</button>
          <input type='file' onChange={handleFileChange} />
          <button className='btn btn-primary' onClick={handleUpload}>
            Upload
          </button>
          <a href='.public/assets/filetemplate.csv' download='filetemplate.csv'>
            Download template
          </a>
        </div>
      </div>
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
              <div className='select-with-button'>
                <SelectField
                  id='categoryField'
                  label='Category'
                  placeholder='Choose a category'
                  options={categoryOptions}
                  value={currentCategory}
                  onChange={setCurrentCategory}
                />
                <Link to='/assets/category/create'>
                  <Button className='btn btn-primary' text='+' />
                </Link>
              </div>
            </div>
            {!currentCategory && !id && <div className='column'> </div>}
            {currentCategory && (
              <div className='column'>
                <div className='select-with-button'>
                  <SelectField
                    id='subCategoryField'
                    label='Sub-category'
                    placeholder='Choose a sub-category'
                    options={subcategoryOptions}
                    value={assetData.subcategoryId}
                    onChange={(value) => handleChange('subcategoryId', Number(value))}
                  />
                  <Link to='/assets/subcategory/create'>
                    <Button className='btn btn-primary' text='+' />
                  </Link>
                </div>
              </div>
            )}

            {id && (
              <div className='column'>
                <SelectField
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
            {!currentCategory && id && <div className='column'> </div>}
            {!currentCategory && id && <div className='column'> </div>}
            {currentCategory && id && <div className='column'> </div>}
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
    </>
  );
}

export default AssetForm;
