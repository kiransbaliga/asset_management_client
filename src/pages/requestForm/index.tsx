import { useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import InputField from '../../components/InputField/InputField';
import { useState } from 'react';
import SelectFied from '../../components/SelectField/SelectField';
import { emptyAsset, statusOptions } from './consts';
import './styles.css';
import AssetType from '../../types/AssetType';
import IconButton from '../../components/IconButton/IconButton';

function AssetForm() {
  const [assetData, setAssetData] = useState<AssetType>(emptyAsset);

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
    console.log('details');
  };

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
              value={assetData.serialNumber}
              onChange={(value) => handleChange('serialNumber', value)}
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
                value={assetData.employeeId}
                onChange={(value) => handleChange('employeeId', value)}
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
