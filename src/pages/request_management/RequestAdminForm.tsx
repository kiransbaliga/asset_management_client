import TitleBar from '../../components/TitleBar/TitleBar';
import InputField from '../../components/InputField/InputField';
import { useEffect, useState } from 'react';
import SelectField from '../../components/SelectField/SelectField';
import { emptyAdminRequest, emptyRequest, requestTypeOptions } from './consts';
import './styles.css';
import RequestType from '../../types/RequestType';
import Table from '../../components/Table/Table';
import { requestedItemColumns } from '../../columns/requestList.columns';
import RequestItemType from '../../types/RequestItemType';
import {
  useCreateRequestMutation,
  useGetCategoryListQuery,
  useLazyGetOwnedAssetListQuery,
  useLazyGetSubcategoryListQuery,
  useResolveRequestMutation
} from './api';
import CategoryType from '../../types/CategoryType';
import subcategoryType from '../../types/SubcategoryType';
import AssetType from '../../types/AssetType';
import { useNavigate } from 'react-router';
import { useGetEmployeeListQuery } from '../employees/api';
import EmployeeType from '../../types/EmployeeType';
import Actions from '../../components/Actions/inedx';

function RequestAdminForm() {
  const [requestData, setRequestData] = useState<RequestType>(emptyAdminRequest);
  const [listId, setListId] = useState(2);
  const [newItem, setNewItem] = useState<RequestItemType>({
    count: 0,
    subcategoryId: 0,
    subcategoryName: '',
    id: 1
  });
  const [requestType, setRequestType] = useState('new');
  const [category, setCategory] = useState(null);
  const [getSubCategories, { data: subcategoriesDateset }] = useLazyGetSubcategoryListQuery();
  const [getOwnedAssets, { data: OwnedAssetsDateset }] = useLazyGetOwnedAssetListQuery();
  const [createRequest, { data, isSuccess }] = useCreateRequestMutation();
  const [resolveRequest, { isSuccess: resolveSucccess }] = useResolveRequestMutation();
  const { data: categoriesDateset } = useGetCategoryListQuery();
  const { data: employeeDataset } = useGetEmployeeListQuery();
  const categories = categoriesDateset?.data as CategoryType[];
  const subcategories = subcategoriesDateset?.data as subcategoryType[];
  const employees = employeeDataset?.data as EmployeeType[];
  const ownedAssets = OwnedAssetsDateset?.data as AssetType[];
  const navigate = useNavigate();

  const categoryOptions = categories
    ? categories.map((category) => ({ value: category.id, text: category.name }))
    : [];

  const subcategoryOptions = subcategories
    ? subcategories
        .filter((subcategory) => subcategory.categoryId == category)
        .map((subcategory) => ({
          value: subcategory.id,
          text: subcategory.name
        }))
    : [];

  const employeeOptions = employees
    ? employees.map((employee) => ({ value: employee.id, text: employee.name }))
    : [];

  const ownedAssetOptions = ownedAssets
    ? ownedAssets.map((ownedAsset) => ({
        value: ownedAsset.id,
        text: ownedAsset.name
      }))
    : [];

  const findSubcategoryName = (id: number) => {
    const subcategory = subcategories.find((subcategory) => {
      return Number(subcategory.id) === Number(id);
    });

    return subcategory.name;
  };

  const handleChange = (field: string, value?: any, subfield?: string) => {
    if (field === 'requestItem' && subfield !== undefined) {
      setNewItem((prevItem) => {
        const updatedNewItem = { ...prevItem };

        updatedNewItem[subfield] = Number(value);
        console.log(value);
        if (subfield === 'subcategoryId')
          updatedNewItem['subcategoryName'] = findSubcategoryName(Number(value));

        return updatedNewItem;
      });
    } else if (field === 'requestType') {
      setRequestData((prevData) => {
        setRequestType(value);
        const employeeId = localStorage.getItem('employeeId');

        if (value === 'exchange') getOwnedAssets(Number(employeeId));
        console.log(requestType);

        return { ...prevData, requestItem: [] };
      });
    } else if (field === 'employeeId') {
      getOwnedAssets(Number(value));
      setRequestData((prevData) => ({ ...prevData, [field]: value }));
    } else if (field === 'category') {
      setCategory(value);
      getSubCategories();
      console.log(requestType);
    } else if (field === 'addRequestItem') {
      setCategory(null);
      setRequestData((prevData) => {
        const updatedRequestItem = [...prevData.requestItem];

        if (newItem.count !== 0 && newItem.subcategoryId !== 0) updatedRequestItem.push(newItem);
        setListId(listId + 1);
        setNewItem({ count: 0, subcategoryId: 0, subcategoryName: '', id: listId });

        return { ...prevData, requestItem: updatedRequestItem };
      });
    } else {
      setRequestData((prevData) => ({ ...prevData, [field]: value }));
    }
    console.log(newItem);
    console.log(requestData);
  };

  const handleSubmit = () => {
    createRequest(requestData);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data.data.id);
      resolveRequest(data.data.id);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (resolveSucccess) navigate('/requests');
  }, [resolveSucccess]);

  const handleReset = () => {
    console.log('submitted');
    setRequestData(emptyRequest);
  };

  const handleRowClick = (rowData) => {
    console.log('Row clicked:', rowData);
  };

  const action = (id: number) => {
    return (
      <Actions
        onDelete={() => {
          const updatedRequestItem = requestData.requestItem.filter((item) => item.id !== id);

          setRequestData((prevData) => ({
            ...prevData,
            requestItem: updatedRequestItem
          }));
        }}
      />
    );
  };

  const requestItemColumns = [
    ...requestedItemColumns,
    { key: 'id', label: 'Action', adapter: action }
  ];

  return (
    <div className='request-form '>
      <TitleBar title={'Allocate Assets'}></TitleBar>
      <div className='flex-column'>
        <div className='card'>
          <div className='flex-row center'>
            <div className='column'>
              <InputField
                id='requestReason'
                type='text'
                label='Reason'
                placeholder='Reason'
                value={requestData.reason}
                onChange={(value) => handleChange('reason', value)}
              />
            </div>
            <div className='column'>
              <SelectField
                id='employeeId'
                label='Employee Name'
                placeholder='Employee name'
                options={employeeOptions}
                value={requestData.employeeId}
                onChange={(value) => handleChange('employeeId', value)}
              />
            </div>
            <div className='column'>
              <SelectField
                id='requestType'
                label='Request Type'
                placeholder='Request Type'
                options={requestTypeOptions}
                value={requestType}
                onChange={(value) => handleChange('requestType', value)}
              />
            </div>
            <div className=' requestadmin-btn '>
              <div className='btn-group'>
                <button className='btn btn-primary' onClick={handleSubmit}>
                  {'Allocate'}
                </button>
                <button className='btn btn-secondary' onClick={handleReset}>
                  Reset{' '}
                </button>
              </div>
            </div>
          </div>
        </div>
        {requestType === 'new' && (
          <div className='card'>
            <div className='flex-row center'>
              <div className='flex-row column'>
                <div className='column'>
                  <SelectField
                    id='categoryId'
                    label='Category'
                    placeholder='Choose a category'
                    options={categoryOptions}
                    value={category === null ? '' : category}
                    onChange={(value) => handleChange('category', value)}
                  />
                </div>
                {category && (
                  <div className='column'>
                    <SelectField
                      id='subcategoryField'
                      label='Subcategory'
                      placeholder='Choose a subcategory'
                      options={subcategoryOptions}
                      value={newItem.subcategoryId === 0 ? '' : newItem.subcategoryId}
                      onChange={(value) => handleChange('requestItem', value, 'subcategoryId')}
                    />
                  </div>
                )}

                <div className='column'>
                  <InputField
                    id='countField'
                    type='number'
                    label='Count'
                    placeholder='Enter the count'
                    value={newItem.count === 0 ? '' : newItem.count}
                    onChange={(value) => handleChange('requestItem', value, 'count')}
                  />
                </div>
              </div>
              <div className=''>
                <div className='request-btn'>
                  <button
                    className='btn btn-primary'
                    onClick={() => handleChange('addRequestItem')}
                  >
                    Add new item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {requestType === 'new' &&
          requestData.requestItem.length > 0 &&
          JSON.stringify(requestData.requestItem) && (
            <div className=' '>
              <h2>Currently requested items</h2>
              <Table
                columns={requestItemColumns}
                dataset={requestData.requestItem}
                onClick={handleRowClick}
              />
            </div>
          )}
        {requestType === 'exchange' && (
          <div className='card'>
            <div className='flex-row'>
              <div className='column'>
                <SelectField
                  id='ownedAssetsField'
                  label='Choose the asset'
                  placeholder='Choose the asset'
                  options={ownedAssetOptions}
                  value={requestData.assetId === 0 ? '' : requestData.assetId}
                  onChange={(value) => handleChange('assetId', Number(value))}
                />
              </div>
              <div className='column'></div>
              <div className='column'></div>
            </div>
          </div>
        )}

        <div className='column'></div>

        <div className='blank'></div>
      </div>
    </div>
  );
}

export default RequestAdminForm;
