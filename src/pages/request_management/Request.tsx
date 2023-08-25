import { useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import IconButton from '../../components/IconButton/IconButton';
import DetailsViewer from '../../components/DetailsViewer/DetailsViewer';
import { useEffect, useState } from 'react';
import {
  useLazyGetRequestByIdQuery,
  useResolveRequestMutation,
  useUpdateRequestMutation
} from './api';
import RequestType from '../../types/RequestType';
import {
  requestExchangeDetailColumns,
  requestNewDetailColumns
} from '../../columns/requests.columns';
import Table from '../../components/Table/Table';
import { requestedListColumns } from '../../columns/requestList.columns';
import { useSelector } from 'react-redux';
import { AdminRoles } from './consts';

function Request() {
  const user = useSelector((state: any) => state.auth.user);

  const { id } = useParams();
  const [requestData, setRequestData] = useState<RequestType>();

  const [getRequestById, { data, isSuccess }] = useLazyGetRequestByIdQuery();
  const [resolveRequest, { isSuccess: resolveSucccess }] = useResolveRequestMutation();

  const [rejectRequest, { isSuccess: rejectSuccess }] = useUpdateRequestMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) getRequestById(id);
  }, [id]);

  useEffect(() => {
    if (data && isSuccess) setRequestData(data.data as RequestType);
  }, [data, isSuccess]);

  const handleResolveClick = () => {
    resolveRequest(Number(id));
  };

  useEffect(() => {
    if (resolveSucccess) navigate('/requests');
  }, [resolveSucccess]);

  const handleRejectClick = () => {
    rejectRequest({ ...requestData, ['status']: 'Rejected' });
  };

  useEffect(() => {
    if (rejectSuccess) navigate('/requests');
  }, [rejectSuccess]);

  const detailsExchangeColumns = [
    requestExchangeDetailColumns.slice(0, 4),
    requestExchangeDetailColumns.slice(4, 8)
  ];

  const detailsNewColumns = [requestNewDetailColumns];

  let requestListColumns = [];

  if (requestData && requestData.status === 'Pending')
    requestListColumns = [...requestedListColumns];
  else requestListColumns = [...requestedListColumns.slice(0, 2)];

  return (
    <div className='height-full flex-column'>
      <TitleBar title='Request Details'>
        {user &&
          AdminRoles.includes(user.role) &&
          requestData &&
          requestData.status === 'Pending' && (
            <div className='flex-row'>
              <IconButton
                text='Resolve'
                icon='/assets/icons/resolve.svg'
                onClick={handleResolveClick}
              />
              <IconButton
                text='Reject'
                icon='/assets/icons/reject.svg'
                onClick={handleRejectClick}
              />
            </div>
          )}
      </TitleBar>
      {requestData && (
        <>
          <DetailsViewer
            rows={requestData && requestData.assetId ? detailsExchangeColumns : detailsNewColumns}
            data={requestData}
          />
          <div className='table-heading'> Requested items</div>
          <Table
            className='grow'
            columns={requestListColumns}
            dataset={requestData.requestItem}
            onClick={() => {}}
            emptyMessage='No data'
          />
        </>
      )}
    </div>
  );
}

export default Request;
