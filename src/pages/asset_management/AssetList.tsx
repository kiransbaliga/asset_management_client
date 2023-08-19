import { useNavigate } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import IconButton from '../../components/IconButton/IconButton';
import Table from '../../components/Table/Table';
import { assetColumns } from '../../columns/assets.columns';
import Filter from '../../components/filter';

const dataset = [
  { serial_no: 1, name: 'Lap', subcategory: 'Laptop', status: 'Allocated' },
  { serial_no: 1, name: 'Lap', subcategory: 'Laptop', status: 'Unallocated' },
  { serial_no: 1, name: 'Lap', subcategory: 'Laptop', status: 'Damaged' }
];

function AssetList() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/employees/create/');
  };

  const handleTableClick = (data) => {
    navigate(`/employees/details/${data.id}`);
  };

  return (
    <div className='flex-column'>
      <TitleBar title='Asset List'>
        <Filter label='Category' options={['Laptop', 'Water bottoll']} />
        <Filter label='Sub category' options={['Laptop', 'Water bottoll']} />
        <Filter label='Status' options={['Laptop', 'Water bottoll']} />
        <IconButton icon='/assets/icons/plus.png' text='Create employee' onClick={handleCreate} />
      </TitleBar>
      <div className='grow-scroll'>
        <Table columns={assetColumns} dataset={dataset} onClick={handleTableClick} />
      </div>
    </div>
  );
}

export default AssetList;
