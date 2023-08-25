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
import { TOAST_TIMOUT, TOAST_TYPE } from '../../components/toast/consts';
import { useUI } from '../../contexts/UIContexts';
import Dialog from '../../components/Dialog/Dialog';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

function Request() {
  const user = useSelector((state: any) => state.auth.user);
  const { createToast } = useUI();

  const { id } = useParams();
  const [requestData, setRequestData] = useState<RequestType>();

  const [getRequestById, { data, isSuccess }] = useLazyGetRequestByIdQuery();
  const [
    resolveRequest,
    { isSuccess: resolveSucccess, error: resolveErrors, isError: isResolveError }
  ] = useResolveRequestMutation();

  const [rejectRequest, { isSuccess: rejectSuccess, isError: isRejectError, error: rejectErrors }] =
    useUpdateRequestMutation();

  const navigate = useNavigate();
  const [resolveErrorDialog, setResolveErrorDialog] = useState({ show: false });

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
    if (resolveSucccess) {
      createToast(TOAST_TYPE.SUCCESS, 'Resolved successfully', 'Request resolved successfully');
      navigate('/requests');
    }
  }, [resolveSucccess]);

  useEffect(() => {
    if (isResolveError && resolveErrors) {
      if (resolveErrors['data'].error) setResolveErrorDialog({ show: true });
      createToast(TOAST_TYPE.ERROR, 'Rresolved failed', 'Somthing went wrong', TOAST_TIMOUT.WAIT);
    }
  }, [isResolveError]);

  useEffect(() => {
    if (isRejectError && rejectErrors)
      createToast(TOAST_TYPE.SUCCESS, 'Rejected successfully', 'Request reject successfully');
    navigate('/requests');

    // createToast(TOAST_TYPE.ERROR, 'Rreject failed', 'Somthing went wrong', TOAST_TIMOUT.WAIT);
  }, [isRejectError]);

  const handleRejectClick = () => {
    rejectRequest({ ...requestData, ['status']: 'Rejected' });
  };

  useEffect(() => {
    if (rejectSuccess) {
      navigate('/requests');
      createToast(TOAST_TYPE.SUCCESS, 'Rejected successfully', 'Request reject successfully');
    }
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
    <>
      <Dialog
        title='Could not resolve!'
        state={resolveErrorDialog}
        setState={setResolveErrorDialog}
        successLabel='Back to List'
        onSuccess={() => navigate('/requests')}
      >
        <p>{resolveErrors ? resolveErrors['data'].error : ''}</p>
      </Dialog>
      <div className='height-full flex-column'>
        <TitleBar title='Request Details'>
          {user &&
            AdminRoles.includes(user.role) &&
            requestData &&
            requestData.status === 'Pending' && (
              <div className='flex-row'>
                <IconButton text='Resolve' icon={faCheck} onClick={handleResolveClick} />
                <IconButton text='Reject' icon={faX} onClick={handleRejectClick} />
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
    </>
  );
}

export default Request;
