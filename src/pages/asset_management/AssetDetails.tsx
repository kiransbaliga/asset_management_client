import { useEffect, useState } from 'react';
import { assetColumns } from '../../columns/assets.columns';
import DetailsViewer from '../../components/DetailsViewer/DetailsViewer';
import TitleBar from '../../components/TitleBar/TitleBar';
import AssetType from '../../types/AssetType';
import { useLazyGetAssetByIdQuery } from './api';
import { useParams } from 'react-router-dom';
import Table from '../../components/Table/Table';

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
  const { id } = useParams();

  const [getAssetById, { data, isSuccess }] = useLazyGetAssetByIdQuery();

  useEffect(() => {
    if (id) getAssetById(id);
  }, [id]);

  useEffect(() => {
    if (data && isSuccess) setAssetData(data.data as AssetType);
  }, [data, isSuccess]);

  return (
    <div>
      <TitleBar title='Asset Details' />
      <DetailsViewer rows={assetDetailsRow} data={assetData} />
      <Table columns={[]} dataset={[]} onClick={() => {}} />
    </div>
  );
}
export default AssetDetails;
