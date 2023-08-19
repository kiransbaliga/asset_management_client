import { OptionType } from '../../components/SelectField/SelectField';
import AssetType from '../../types/AssetType';

export const statusOptions: OptionType[] = [
  { text: 'Unallocated', value: 'unallocated' },
  { text: 'Damaged', value: 'damaged' },
  { text: 'Allocated', value: 'allocated' }
];

export const emptyAsset: AssetType = {
  id: '',
  serialNumber: '',
  name: '',
  status: '',
  employeeId: ''
};
