import { useNavigate } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import IconButton from '../../components/IconButton/IconButton';
import Table from '../../components/Table/Table';
import './styles.css';
// import { assetColumns } from '../../columns/assets.columns';
import Filter from '../../components/filter';
// import {
//   useGetCategoryListQuery,
//   useLazyGetAssetListQuery,``
//   useLazyGetSubcategoryListQuery
// } from './api';
// import { useEffect, useState } from 'react';
// import CategoryType from '../../types/CategoryType';
// import subcategoryType from '../../types/SubcategoryType';
// import AssetType from '../../types/AssetType';
import { requestColumns } from '../../columns/requests.columns';
import { useDeleteRequestMutation, useLazyGetRequestsListQuery } from './api';
import Actions from '../../components/Actions/inedx';
import { useEffect, useState } from 'react';
import Dialog, { DialogStateType } from '../../components/Dialog/Dialog';
import { requestStatusOptions } from './consts';
import AssetFilterType from '../../types/AssetFilterType';
import { empltyAssetFilter } from '../asset_management/consts';
import RequestType from '../../types/RequestType';

function RequestList() {
  //   const [currentCategory, setCurrentCategory] = useState();
  const [deleteDialogState, setDeleteDialogState] = useState<DialogStateType>({
    show: false,
    params: {}
  });
  const [getRequests, { data: requestDataset }] = useLazyGetRequestsListQuery();

  const [filterData, setFilterData] = useState<AssetFilterType>(empltyAssetFilter);
  // const { data: request } = useGetRequestsListQuery();
  // const requests = request?.data;
  const navigate = useNavigate();

  const [deleteRequest, { isSuccess: isDeleted }] = useDeleteRequestMutation();

  const handleCreate = () => {
    navigate('/requests/create/');
  };

  const requests = requestDataset
    ? requestDataset.data.map((request: RequestType) => {
        const newRequest = {
          ...request
        };

        return newRequest;
      })
    : [];
  const action = (id: string) => {
    return (
      <Actions
        onDelete={() => {
          setDeleteDialogState({ show: true, params: { id } });
        }}
      />
    );
  };
  const requestsColumn = [...requestColumns, { key: 'id', label: 'Action', adapter: action }];

  const handleFilterSelect = (field: string, value: any) => {
    setFilterData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleTableClick = (data) => {
    navigate(`/requests/details/${data.id}`);
  };
  const handleDelete = (params) => {
    deleteRequest(params.id);
  };

  useEffect(() => {
    if (isDeleted) setDeleteDialogState({ show: false, params: {} });
  }, [isDeleted]);
  useEffect(() => {
    getRequests(filterData);
  }, [filterData]);

  return (
    <>
      <Dialog
        title='Are you sure?'
        onSuccess={handleDelete}
        successLabel='Confirm'
        state={deleteDialogState}
        setState={setDeleteDialogState}
      >
        <p>Do you really want to delete this request ?</p>
      </Dialog>
      <div className='flex-column'>
        <TitleBar title='Request List'>
          <Filter
            label='Status'
            options={requestStatusOptions}
            value={filterData.status}
            onSelect={(value) => handleFilterSelect('status', value)}
          />
          <IconButton icon='/assets/icons/plus.png' text='Create Request' onClick={handleCreate} />
        </TitleBar>
        <div className='grow-scroll'>
          <Table
            columns={requestsColumn}
            dataset={requests}
            onClick={handleTableClick}
            emptyMessage='No items requested'
          />
        </div>
      </div>
    </>
  );
}

export default RequestList;
