import AssetType from '../../types/AssetType';
import { OptionType } from '../../types/OptionType';

export const statusOptions: OptionType[] = [
  { text: 'Unallocated', value: 'unallocated' },
  { text: 'Damaged', value: 'damaged' },
  { text: 'Allocated', value: 'allocated' }
];

export const emptyAsset: AssetType = {
  serial_no: '',
  name: '',
  status: '',
  employeeId: 0,
  subcategoryId: 0
};
