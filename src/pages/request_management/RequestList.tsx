import { useNavigate } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import IconButton from '../../components/IconButton/IconButton';
import Table from '../../components/Table/Table';
import './styles.css';
// import { assetColumns } from '../../columns/assets.columns';
import Filter from '../../components/filter';
import { requestColumns } from '../../columns/requests.columns';
import {
  useDeleteRequestMutation,
  useLazyGetRequestsListQuery,
  useLazyGetRequestsOfEmployeeQuery
} from './api';
import Actions from '../../components/Actions/inedx';
import { useEffect, useState } from 'react';
import Dialog, { DialogStateType } from '../../components/Dialog/Dialog';
import { AdminRoles, requestStatusOptions } from './consts';
import AssetFilterType from '../../types/AssetFilterType';
import { empltyAssetFilter } from '../asset_management/consts';
import RequestType from '../../types/RequestType';
import { useSelector } from 'react-redux';
import PermissionGuard from '../../wrappers/PermissionGuard';

function RequestList() {
  const [deleteDialogState, setDeleteDialogState] = useState<DialogStateType>({
    show: false,
    params: {}
  });
  const user = useSelector((state: any) => state.auth.user);
  const [getRequests, { data: allrequestDataset, isSuccess: allrequestsSuccess }] =
    useLazyGetRequestsListQuery();
  const [
    getEmployeeRequests,
    { data: requestEmployeeDataset, isSuccess: employeerequestsSuccess }
  ] = useLazyGetRequestsOfEmployeeQuery();

  const [filterData, setFilterData] = useState<AssetFilterType>(empltyAssetFilter);
  const navigate = useNavigate();

  const [deleteRequest, { isSuccess: isDeleted }] = useDeleteRequestMutation();

  const handleCreate = () => {
    navigate('/requests/create');
  };
  const handleAllocate = () => {
    navigate('/requests/create/admin');
  };

  const action = (id: string) => {
    return (
      <Actions
        onDelete={() => {
          setDeleteDialogState({ show: true, params: { id } });
        }}
      />
    );
  };

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
    if (user && AdminRoles.includes(user.role)) getRequests(filterData);
    else if (user) getEmployeeRequests(user.id);
  }, [filterData, user]);

  const requestDataset = allrequestsSuccess
    ? allrequestDataset
    : employeerequestsSuccess
    ? requestEmployeeDataset
    : null;

  const requests = requestDataset
    ? requestDataset.data.map((request: RequestType) => {
        const newRequest = {
          ...request
        };

        return newRequest;
      })
    : [];

  let requestsColumn;

  if (allrequestsSuccess)
    requestsColumn = [...requestColumns, { key: 'id', label: 'Action', adapter: action }];
  else if (employeerequestsSuccess)
    requestsColumn = [...requestColumns.slice(0, 1), ...requestColumns.slice(2)];
  else requestsColumn = [];

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
      <div className='flex-column height-full'>
        <TitleBar title='Request List'>
          <PermissionGuard>
            <Filter
              label='Status'
              options={requestStatusOptions}
              value={filterData.status}
              onSelect={(value) => handleFilterSelect('status', value)}
            />
          </PermissionGuard>

          <IconButton icon='/assets/icons/plus.png' text='Create Request' onClick={handleCreate} />
          <PermissionGuard>
            <IconButton
              icon='/assets/icons/plus.png'
              text='Allocate items'
              onClick={handleAllocate}
            />
          </PermissionGuard>
        </TitleBar>
        <div className='grow-scroll'>
          <Table
            className='height-full'
            columns={requestsColumn}
            dataset={requests}
            onClick={handleTableClick}
            emptyMessage='No requests found'
            onPaginate={(offset) => {
              handleFilterSelect('offset', offset);
            }}
            total={requestDataset?.meta.tot}
          />
        </div>
      </div>
    </>
  );
}

export default RequestList;
