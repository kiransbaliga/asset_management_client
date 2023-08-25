import { useEffect, useState } from 'react';
import { assetColumns } from '../../columns/assets.columns';
import DetailsViewer from '../../components/DetailsViewer/DetailsViewer';
import TitleBar from '../../components/TitleBar/TitleBar';
import AssetType from '../../types/AssetType';
import { useLazyGetAssetByIdQuery, useLazyGetHistoryByAssetIdQuery } from './api';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '../../components/Table/Table';
import HistoryType from '../../types/HistoryType';
import { historyColumns } from '../../columns/history.columns';
import PermissionGuard from '../../wrappers/PermissionGuard';
import IconButton from '../../components/IconButton/IconButton';

const assetDetailsRow = [
  [
    ...assetColumns,
    {
      label: 'Employee',
      key: 'employee',
      adapter: (employee) => (employee ? employee.name : 'Not allocated')
    }
  ]
];

function AssetDetails() {
  const navigate = useNavigate();
  const [assetData, setAssetData] = useState<AssetType>();
  const [historyData, setHistoryData] = useState<HistoryType[]>();
  const { id } = useParams();

  const [getAssetById, { data, isSuccess }] = useLazyGetAssetByIdQuery();
  const [getHistoryById, { data: HistoryResponseData, isSuccess: isHistorySuccess }] =
    useLazyGetHistoryByAssetIdQuery();

  useEffect(() => {
    if (id) {
      getAssetById(id);
      getHistoryById(id);
    }
  }, [id]);

  useEffect(() => {
    if (data && isSuccess) setAssetData(data.data as AssetType);
  }, [data, isSuccess]);

  useEffect(() => {
    if (HistoryResponseData && isHistorySuccess) {
      let histories = HistoryResponseData.data;

      histories = histories.map((history) => {
        const newHistory = { ...history };

        if (newHistory.createdAt === newHistory.updatedAt) newHistory.updatedAt = '-T';

        return newHistory;
      });
      setHistoryData(histories as HistoryType[]);
    }
  }, [HistoryResponseData, isHistorySuccess]);

  const handleEditClick = () => {
    navigate('/assets/edit/' + id);
  };

  return (
    <PermissionGuard>
      <div>
        <TitleBar title='Asset Details'>
          <PermissionGuard>
            <IconButton text='Edit' icon='/assets/icons/edit.svg' onClick={handleEditClick} />
          </PermissionGuard>
        </TitleBar>
        <DetailsViewer rows={assetDetailsRow} data={assetData} />

        <PermissionGuard>
          <>
            <h2 className='margin-top-bottom card'>History of the asset</h2>
            <Table
              columns={historyColumns}
              dataset={historyData}
              onClick={() => {}}
              emptyMessage='No history found'
            />
          </>
        </PermissionGuard>
      </div>
    </PermissionGuard>
  );
}
export default AssetDetails;
