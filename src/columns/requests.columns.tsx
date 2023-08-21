import Status from '../components/Status/Status';
import { requestStatusToClassName } from './consts';

export const status = (value: string) => (
  <Status value={value} className={requestStatusToClassName[value]} />
);

export const requestColumns = [
  { key: 'employee', label: 'Employee', adapter: (value: any) => value.name },
  { key: 'reason', label: 'Reason' },
  { key: 'status', label: 'Status', adapter: status }
];
