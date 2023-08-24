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
import subcategoryType from '../../types/SubcategoryType';
import { useSelector } from 'react-redux';
import { AdminRoles } from './consts';
// import { useSelector } from 'react-redux';

function Request() {
  const user = useSelector((state: any) => state.auth.user);

  const { id } = useParams();
  const [requestData, setRequestData] = useState<RequestType>();
  const [updatedData, setUpdatedData] = useState<RequestType>();

  const [getRequestById, { data, isSuccess }] = useLazyGetRequestByIdQuery();
  const [resolveRequest, { isSuccess: resolveSucccess }] = useResolveRequestMutation();

  const [rejectRequest, { isSuccess: rejectSuccess }] = useUpdateRequestMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) getRequestById(id);
  }, [id]);

  useEffect(() => {
    if (data && isSuccess) {
      setRequestData(data.data as RequestType);
      setUpdatedData(data.data as RequestType);
    }
  }, [data, isSuccess]);

  const handleResolveClick = () => {
    resolveRequest(Number(id));
  };

  useEffect(() => {
    if (resolveSucccess) navigate('/requests');
  }, [resolveSucccess]);

  const handleRejectClick = () => {
    // setUpdatedData((prevData) => ({ ...prevData, [status]: 'Rejected' }));
    rejectRequest({ ...requestData, ['status']: 'Rejected' });
    console.log(updatedData);
  };

  useEffect(() => {
    if (rejectSuccess) navigate('/requests');
  }, [rejectSuccess]);

  const detailsExchangeColumns = [
    requestExchangeDetailColumns.slice(0, 4),
    requestExchangeDetailColumns.slice(4, 8)
  ];

  const detailsNewColumns = [requestNewDetailColumns];

  const requestListColumns = [
    { key: 'subcategory', label: 'Subcategory', adapter: (value: subcategoryType) => value.name },
    ...requestedListColumns
  ];

  return (
    <div>
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
          {requestData.requestItem.length !== 0 && (
            <div>
              <div className='table-heading'> Requested items</div>
              <Table
                columns={requestListColumns}
                dataset={requestData.requestItem}
                onClick={() => {}}
                emptyMessage='No data'
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Request;
