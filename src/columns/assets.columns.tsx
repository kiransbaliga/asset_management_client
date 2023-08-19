import Status from '../components/Status/Status';
import { assetStatusToClassName } from './consts';

export const status = (value: string) => (
  <Status value={value} className={assetStatusToClassName[value]} />
);


export const assetColumns = [
  { key: 'serial_no', label: 'Serial No' },
  { key: 'name', label: 'Asset Name' },
  { key: 'subcategory', label: 'Subcategory' },
  { key: 'status', label: 'Status', adapter: status }
];
