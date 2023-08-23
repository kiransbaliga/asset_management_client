import Status from '../components/Status/Status';
import { requestStatusToClassName } from './consts';

export const status = (value: string) => (
  <Status value={value} className={requestStatusToClassName[value]} />
);
export const status1 = (value) => value.id;

export const requestColumns = [
  { key: 'employee', label: 'Employee', adapter: (value: any) => value.name },
  { key: 'reason', label: 'Reason' },
  { key: 'status', label: 'Status', adapter: status }
];

export const requestExchangeDetailColumns = [
  { key: 'id', label: 'Request ID' },
  { key: 'reason', label: 'Reason' },
  { key: 'employee', label: 'Requested employee ', adapter: (value) => value.name },
  { key: 'status', label: 'Status', adapter: status },
  {
    key: 'asset',
    label: 'ID of asset(exchange)',
    adapter: (value) => {
      console.log(value);
      if (value) return value.id;
    }
  },
  {
    key: 'asset',
    label: 'Asset to be exchaged',
    adapter: (value) => {
      console.log(value);
      if (value) return value.name;
    }
  },
  {
    key: 'asset',
    label: 'Subcategory of asset',
    adapter: (value) => {
      console.log(value);
      if (value) return value.subcategory.name;
    }
  }
];
export const requestNewDetailColumns = [
  { key: 'id', label: 'Request ID' },
  { key: 'reason', label: 'Reason' },
  { key: 'employee', label: 'Requested employee ', adapter: (value) => value.name },
  { key: 'status', label: 'Status', adapter: status }
];
