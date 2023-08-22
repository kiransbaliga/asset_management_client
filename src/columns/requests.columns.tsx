import Status from '../components/Status/Status';
import { requestStatusToClassName } from './consts';
// import { requestList } from './requestList.columns';

export const status = (value: string) => (
  <Status value={value} className={requestStatusToClassName[value]} />
);

export const requestColumns = [
  { key: 'employee', label: 'Employee', adapter: (value: any) => value.name },
  { key: 'reason', label: 'Reason' },
  { key: 'status', label: 'Status', adapter: status }
];

export const requestDetailColumns = [
  { key: 'id', label: 'Request ID' },
  { key: 'reason', label: 'Reason' },
  { key: 'employeeId', label: 'Requested employee ID' },
  { key: 'assetId', label: 'ID of asset(exchange)' },
  { key: 'status', label: 'Status', adapter: status }
];
