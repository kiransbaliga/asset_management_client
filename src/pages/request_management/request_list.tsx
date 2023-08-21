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
import { useGetRequestListQuery } from './api';

function RequestList() {
  //   const [currentCategory, setCurrentCategory] = useState();
  const { data: request } = useGetRequestListQuery();
  const requests = request?.data;
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/requests/create/');
  };

  const handleTableClick = (data) => {
    navigate(`/requests/details/${data.id}`);
  };

  return (
    <div className='flex-column'>
      <TitleBar title='Request List'>
        <Filter label='Status' options={[]} />
        <IconButton icon='/assets/icons/plus.png' text='Create Request' onClick={handleCreate} />
      </TitleBar>
      <div className='grow-scroll'>
        <Table columns={requestColumns} dataset={requests} onClick={handleTableClick} />
      </div>
    </div>
  );
}

export default RequestList;
