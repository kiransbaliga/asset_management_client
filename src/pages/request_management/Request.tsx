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
import { requestDetailColumns } from '../../columns/requests.columns';

function Request() {
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

  const detailsColumns = [requestDetailColumns.slice(0, 5), requestDetailColumns.slice(5)];

  return (
    <div>
      <TitleBar title='Request Details'>
        {requestData && requestData.status === 'Pending' && (
          <div className='flex-row'>
            <IconButton
              text='Resolve'
              icon='/assets/icons/resolve.svg'
              onClick={handleResolveClick}
            />
            <IconButton text='Reject' icon='/assets/icons/reject.svg' onClick={handleRejectClick} />
          </div>
        )}
      </TitleBar>
      <DetailsViewer rows={detailsColumns} data={requestData} />
    </div>
  );
}

export default Request;
