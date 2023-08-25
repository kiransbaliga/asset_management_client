import TitleBar from '../../components/TitleBar/TitleBar';
import InputField from '../../components/InputField/InputField';
import { useEffect, useState } from 'react';
import SelectField from '../../components/SelectField/SelectField';
import { emptyRequest, requestTypeOptions } from './consts';
import './styles.css';
import RequestType from '../../types/RequestType';
import Table from '../../components/Table/Table';
import { requestedItemColumns } from '../../columns/requestList.columns';
import RequestItemType from '../../types/RequestItemType';
import {
  useCreateRequestMutation,
  useGetCategoryListQuery,
  useLazyGetOwnedAssetListQuery,
  useLazyGetSubcategoryListQuery
} from './api';
import CategoryType from '../../types/CategoryType';
import subcategoryType from '../../types/SubcategoryType';
import AssetType from '../../types/AssetType';
import { useNavigate } from 'react-router';
import Actions from '../../components/Actions/inedx';
import { useSelector } from 'react-redux';
import { TOAST_TIMOUT, TOAST_TYPE } from '../../components/toast/consts';
import { useUI } from '../../contexts/UIContexts';

function RequestForm() {
  const [requestData, setRequestData] = useState<RequestType>(emptyRequest);

  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    setRequestData((prevData) => ({ ...prevData, ['employeeId']: user.id }));
  }, [user]);
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
  const [createRequest, { isSuccess, isError, error }] = useCreateRequestMutation();
  const { data: categoriesDateset } = useGetCategoryListQuery();
  const categories = categoriesDateset?.data as CategoryType[];
  const subcategories = subcategoriesDateset?.data as subcategoryType[];
  const ownedAssets = OwnedAssetsDateset?.data as AssetType[];

  const navigate = useNavigate();
  const { createToast } = useUI();

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
        if (subfield === 'subcategoryId')
          updatedNewItem['subcategoryName'] = findSubcategoryName(Number(value));

        return updatedNewItem;
      });
    } else if (field === 'requestType') {
      setRequestData((prevData) => {
        setRequestType(value);

        if (value === 'exchange') getOwnedAssets(user.id);

        return { ...prevData, requestItem: [] };
      });
    } else if (field === 'category') {
      setCategory(value);
      getSubCategories();
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
  };

  const handleSubmit = () => {
    createRequest(requestData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/requests/');
      createToast(TOAST_TYPE.SUCCESS, 'Created successfully', 'Request created successfully');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error)
      createToast(TOAST_TYPE.ERROR, 'Create failed', 'Somthing went wrong', TOAST_TIMOUT.WAIT);
  }, [isError]);

  const handleReset = () => {
    setRequestData(emptyRequest);
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
    <div className='flex-column height-full '>
      <TitleBar title={'Create Request'}></TitleBar>
      <div className='card'>
        <div className='flex-row'>
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
              id='requestType'
              label='Request Type'
              placeholder='Request Type'
              options={requestTypeOptions}
              value={requestType}
              onChange={(value) => handleChange('requestType', value)}
            />
          </div>

          <div className=' request-btn '>
            <div className='btn-group'>
              <button className='btn btn-primary' onClick={handleSubmit}>
                {'Create'}
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

            <div className=''>
              <div className='request-btn'>
                <button className='btn btn-primary' onClick={() => handleChange('addRequestItem')}>
                  Add new item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {requestType === 'new' && (
        <>
          <h2 className='margin-top-1'>Currently requested items</h2>
          <div className='grow'>
            <Table
              className='height-full'
              columns={requestItemColumns}
              dataset={requestData.requestItem}
              emptyMessage='No requested items'
            />
          </div>
        </>
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
    </div>
  );
}

export default RequestForm;
