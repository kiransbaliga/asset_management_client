import AssetFilterType from '../../types/AssetFilterType';
import AssetType from '../../types/AssetType';
import { OptionType } from '../../types/OptionType';

export const statusOptions: OptionType[] = [
  { text: 'Unallocated', value: 'Unallocated' },
  { text: 'Damaged', value: 'Damaged' },
  { text: 'Allocated', value: 'Allocated' }
];

export const emptyAsset: AssetType = {
  serial_no: '',
  name: '',
  status: '',
  employeeId: 0,
  subcategoryId: 0
};

export const empltyAssetFilter: AssetFilterType = {
  status: '',
  subcategory: '',
  category: ''
};

export const ASSET_API_TAGS = {
  ON_ASSET_DELETE: 'onAssetDelete'
};