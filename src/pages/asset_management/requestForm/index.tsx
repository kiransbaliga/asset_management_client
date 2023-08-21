import TitleBar from '../../../components/TitleBar/TitleBar';
import InputField from '../../../components/InputField/InputField';
import { useEffect, useState } from 'react';
import SelectField from '../../../components/SelectField/SelectField';
import { OptionType } from '../../../types/OptionType';
import { emptyRequest, requestTypeOptions } from './consts';
import './styles.css';
import RequestType from '../../../types/RequestType';
import Table from '../../../components/Table/Table';
import { requestListColumns } from '../../../columns/requestList.columns';
import RequestItemType from '../../../types/RequestItemType';
// import RequestItemType from '../../../types/RequestItemType';

function RequestForm() {
  const [requestData, setRequestData] = useState<RequestType>(emptyRequest);
  const [subcategoryOptions, setSubcategoryOptions] = useState<OptionType[]>([]);
  const [ownedAssetOptions, setOwnedAssetOptions] = useState<OptionType[]>([]);
  const [newItem, setNewItem] = useState<RequestItemType>({ count: 0, subcategoryId: 0 });
  const [requestType, setRequestType] = useState('new');
  // const [requestListWithSubcategories, setRequestListWithSubcategories] = useState<
  //   RequestItemType[]
  // >([]);

  const handleChange = (field: string, value?: any, subfield?: string) => {
    if (field === 'requestItem' && subfield !== undefined)
      setNewItem((prevItem) => {
        const updatedNewItem = { ...prevItem };

        updatedNewItem[subfield] = value;

        return updatedNewItem;
      });
    else if (field === 'requestType')
      setRequestData((prevData) => {
        setRequestType(value);
        console.log(requestType);

        return { ...prevData, requestItem: [] };
      });
    else if (field === 'addRequestItem')
      setRequestData((prevData) => {
        const updatedRequestItem = [...prevData.requestItem];

        if (newItem.count !== 0 && newItem.subcategoryId !== 0) updatedRequestItem.push(newItem);
        setNewItem({ count: 0, subcategoryId: 0 });

        return { ...prevData, requestItem: updatedRequestItem };
      });
    else setRequestData((prevData) => ({ ...prevData, [field]: value }));
    console.log(newItem);
    console.log(requestData);
  };

  const handleSubmit = () => {
    handleChange('addRequestItem');
    console.log('submitted');
    console.log(requestData);
  };
  const handleReset = () => {
    console.log('submitted');
    setRequestData(emptyRequest);
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
  const ownedAssets = {
    data: [
      {
        name: 'mac-laptop 54',
        id: 1
      },
      {
        name: 'dell-laptop 754',
        id: 2
      },
      {
        name: 'thinkpad-laptop 853',
        id: 3
      },
      {
        name: 'logitech mouse 567',
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

  useEffect(() => {
    if (ownedAssets?.data)
      setOwnedAssetOptions(
        ownedAssets.data.map((ownedAsset: { name: string; id: number }) => ({
          text: ownedAsset.name,
          value: ownedAsset.id
        }))
      );
  }, []);

  const handleRowClick = (rowData) => {
    console.log('Row clicked:', rowData); // This will be the data of the clicked row
  };

  // to be looked into after api integration
  // useEffect(() => {
  //   const updatedRequestList = requestData.requestItem.map((item) => {
  //     console.log(' hereeeee ');
  //     subcategories.data.forEach((subcategory) => {
  //       if (subcategory.id === item.subcategoryId) {
  //         console.log(subcategory.id, item.subcategoryId);

  //         return { ...item, subcategoryId: subcategory.name };
  //       }
  //     });

  //     return { ...item, subcategoryId: 'unknown' };
  //   });

  //   setRequestListWithSubcategories(updatedRequestList);
  // }, [requestData.requestItem, subcategories.data]);

  return (
    <div className='request-form '>
      <TitleBar title={'Create Request'}></TitleBar>
      <div className='flex-column center'>
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
            <div className='column'></div>

            {requestType === 'new' && (
              <>
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
                <div className='column'>
                  <InputField
                    id='countField'
                    type='number'
                    label='Count'
                    value={newItem.count === 0 ? '' : newItem.count}
                    onChange={(value) => handleChange('requestItem', value, 'count')}
                  />
                </div>
                <div className='request-btn'>
                  <button
                    className='btn btn-primary'
                    onClick={() => handleChange('addRequestItem')}
                  >
                    Add new item
                  </button>
                </div>
              </>
            )}
            {requestType === 'exchange' && (
              <>
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
              </>
            )}

            <div className='column'></div>
            <div className='column'>
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
        <div className='blank'></div>
        {requestType === 'new' &&
          requestData.requestItem.length > 0 &&
          JSON.stringify(requestData.requestItem) && (
            <div className='grow-scroll card '>
              <h2>Current request items</h2>
              <Table
                columns={requestListColumns}
                dataset={requestData.requestItem}
                onClick={handleRowClick}
              />
            </div>
          )}
      </div>
    </div>
  );
}

export default RequestForm;
