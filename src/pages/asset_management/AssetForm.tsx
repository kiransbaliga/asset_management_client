import { useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import InputField from '../../components/InputField/InputField';
import { useEffect, useState } from 'react';
import SelectFied from '../../components/SelectField/SelectField';
import { emptyAsset, statusOptions } from './consts';
import './styles.css';
import AssetType from '../../types/AssetType';
import IconButton from '../../components/IconButton/IconButton';
import { OptionType } from '../../types/OptionType';

function AssetForm() {
  const [assetData, setAssetData] = useState<AssetType>(emptyAsset);
  const [subcategoryOptions, setSubcategoryOptions] = useState<OptionType[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/employees/assets/create/upload');
  };

  const handleChange = (field: string, value: any) => {
    setAssetData((prevData) => ({ ...prevData, [field]: value }));
    console.log(assetData);
  };

  const handleSubmit = () => {
    console.log('submitted');
    console.log(assetData);
  };
  const subcategories = {
    data: [
      {
        name: 'mac-laptop',
        id: 1
      },
      {
        name: 'dell-laptop',
        id: 2
      },
      {
        name: 'thinkpad-laptop',
        id: 3
      },
      {
        name: 'logitech mouse',
        id: 4
      }
    ]
  };

  useEffect(() => {
    if (subcategories?.data)
      setSubcategoryOptions(
        subcategories.data.map((subcategory: { name: string; id: number }) => ({
          text: subcategory.name,
          value: subcategory.id
        }))
      );
  }, []);

  return (
    <div className='asset-form'>
      <TitleBar title={id ? 'Edit Asset' : 'Create Asset'}>
        <IconButton
          text='Create via Excel'
          icon='/assets/icons/upload.png'
          onClick={handleEditClick}
        />
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
              id='subCategoryField'
              label='Sub-category'
              placeholder='Choose a sub-category'
              options={subcategoryOptions}
              value={assetData.subcategoryId === 0 ? '' : assetData.subcategoryId}
              onChange={(value) => handleChange('subcategoryId', Number(value))}
            />
          </div>
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
          <div className='column'>
            {assetData.status === 'allocated' && (
              <InputField
                id='EmployeeIdField'
                label='Allocated Employee ID'
                placeholder='Allocated Employee ID'
                value={assetData.employeeId === 0 ? '' : assetData.employeeId}
                onChange={(value) => handleChange('employeeId', Number(value))}
              />
            )}
          </div>
          <div className='column'></div>
          <div className='column'>
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
