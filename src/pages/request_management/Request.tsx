import { useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import IconButton from '../../components/IconButton/IconButton';
import DetailsViewer from '../../components/DetailsViewer/DetailsViewer';
import { useEffect, useState } from 'react';
import { useLazyGetRequestByIdQuery, useResolveRequestMutation } from './api';
import RequestType from '../../types/RequestType';
import { requestDetailColumns } from '../../columns/requests.columns';

function Request() {
  const { id } = useParams();
  const [requestData, setRequestData] = useState<RequestType>();

  const [getRequestById, { data, isSuccess }] = useLazyGetRequestByIdQuery();
  const [resolveRequest, { isSuccess: resolveSucccess }] = useResolveRequestMutation();

  const navigate = useNavigate();

  const handleResolveClick = () => {
    resolveRequest(Number(id));
  };

  useEffect(() => {
    if (resolveSucccess) navigate('/requests');
  }, [resolveSucccess]);

  useEffect(() => {
    if (id) getRequestById(id);
  }, [id]);

  useEffect(() => {
    if (data && isSuccess) setRequestData(data.data as RequestType);
  }, [data, isSuccess]);

  const detailsColumns = [requestDetailColumns.slice(0, 4), [...requestDetailColumns.slice(4)]];

  return (
    <div>
      <TitleBar title='Request Details'>
        <IconButton text='Resolve' icon='/assets/icons/edit.svg' onClick={handleResolveClick} />
      </TitleBar>
      <DetailsViewer rows={detailsColumns} data={requestData} />
    </div>
  );
}

export default Request;
