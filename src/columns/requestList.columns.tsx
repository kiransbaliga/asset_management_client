import Status from '../components/Status/Status';
import SubcategoryType from '../types/SubcategoryType';
import { isDoneToClassName } from './consts';

export const status = (value: string) => (
  <Status value={value === 'true' ? 'Resolved' : 'Pending'} className={isDoneToClassName[value]} />
);

export const requestedItemColumns = [
  { key: 'subcategoryName', label: 'Subcategory Name' },
  { key: 'count', label: 'Count' }
];

export const requestedListColumns = [
  { key: 'subcategory', label: 'Subcategory', adapter: (value: SubcategoryType) => value.name },
  { key: 'count', label: 'Count' },
  { key: 'isDone', label: 'Status', adapter: status }
];
