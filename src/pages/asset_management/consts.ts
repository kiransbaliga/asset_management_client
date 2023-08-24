import AssetFilterType from '../../types/AssetFilterType';
import AssetType from '../../types/AssetType';
import CategoryType from '../../types/CategoryType';
import { OptionType } from '../../types/OptionType';
import SubcategoryType from '../../types/SubcategoryType';

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

export const perishableTypeOptions: OptionType[] = [
  { text: 'Yes', value: 1 },
  { text: 'No', value: 0 }
];

export const emptyCategory: CategoryType = {
  name: ''
};

export const emptySubcategory: SubcategoryType = {
  name: '',
  categoryId: null,
  perishable: null,
  count: null
};
