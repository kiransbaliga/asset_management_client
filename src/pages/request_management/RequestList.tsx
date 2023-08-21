import { useNavigate } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import IconButton from '../../components/IconButton/IconButton';
import Table from '../../components/Table/Table';
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
import { useGetRequestsListQuery } from './api';
import Actions from '../../components/Actions/inedx';
import { useState } from 'react';
import Dialog from '../../components/Dialog/Dialog';

function RequestList() {
  //   const [currentCategory, setCurrentCategory] = useState();
  const [deleteDialogState, setDeleteDialogState] = useState({ show: false, params: {} });
  const { data: request } = useGetRequestsListQuery();
  const requests = request?.data;
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/requests/create/');
  };
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
  const requestsColumn = [...requestColumns, { key: 'id', label: 'Action', adapter: action }];

  const handleTableClick = (data) => {
    navigate(`/requests/details/${data.id}`);
  };

  return (
    <>
      <Dialog
        title='Are you sure?'
        onSuccess={() => {}}
        successLabel='Confirm'
        isLoading={true}
        state={deleteDialogState}
        setState={() => {}}
      >
        <p>Do you really want to delete asset ?</p>
      </Dialog>
      <div className='flex-column'>
        <TitleBar title='Request List'>
          <Filter label='Status' options={[]} value='Pending' />
          <IconButton icon='/assets/icons/plus.png' text='Create Request' onClick={handleCreate} />
        </TitleBar>
        <div className='grow-scroll'>
          <Table columns={requestsColumn} dataset={requests} onClick={handleTableClick} />
        </div>
      </div>
    </>
  );
}

export default RequestList;
