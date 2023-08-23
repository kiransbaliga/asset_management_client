import { useEffect, useState } from 'react';
import { assetColumns } from '../../columns/assets.columns';
import DetailsViewer from '../../components/DetailsViewer/DetailsViewer';
import TitleBar from '../../components/TitleBar/TitleBar';
import AssetType from '../../types/AssetType';
import { useLazyGetAssetByIdQuery, useLazyGetHistoryByAssetIdQuery } from './api';
import { useParams } from 'react-router-dom';
import Table from '../../components/Table/Table';
import HistoryType from '../../types/HistoryType';
import { historyColumns } from '../../columns/history.columns';

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
    if (HistoryResponseData && isHistorySuccess) setHistoryData(HistoryResponseData.data as HistoryType[]);
  }, [HistoryResponseData, isHistorySuccess]);

  return (
    <div>
      <TitleBar title='Asset Details' />
      <DetailsViewer rows={assetDetailsRow} data={assetData} />
      <Table columns={historyColumns} dataset={historyData} onClick={() => {}} />
    </div>
  );
}
export default AssetDetails;
