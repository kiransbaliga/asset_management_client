import Status from '../components/Status/Status';
import { assetStatusToClassName } from './consts';

export const status = (value: string) => (
  <Status value={value} className={assetStatusToClassName[value]} />
);

export const assetColumns = [
  { key: 'serial_no', label: 'Serial No' },
  { key: 'name', label: 'Asset Name' },
  {
    key: 'subcategory',
    label: 'Subcategory',
    adapter: (subcategory) => (subcategory ? subcategory.name : '')
  },
  { key: 'status', label: 'Status', adapter: status }
];
export const perishableAssetsColumns = [
  { key: 'name', label: 'Subcategory' },
  { key: 'count', label: 'Count' }
];
