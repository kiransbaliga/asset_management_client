import Status from '../components/Status/Status';
import AddressType from '../types/AddressType';
import { employeeStatusToClassName } from './consts';

export const status = (value: string) => (
  <Status value={value} className={employeeStatusToClassName[value]} />
);

export const experiance = (value: number) => (
  <>
    {value} Year{value > 1 ? 's' : ''}
  </>
);

export const address = ({ line1, line2, state, country, pincode, city }: AddressType) => (
  <>
    <div>{line1}</div>
    <div>{line2}</div>
    <div>{city}</div>
    <div>{state}</div>
    <div>{country}</div>
    <div>{pincode}</div>
  </>
);

export const employeeColumns = [
  { key: 'name', label: 'Employee Name' },
  { key: 'id', label: 'Employee ID' },
  { key: 'joining_date', label: 'Joining Date', adapter: (value) => value.split(' ')[0] },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', adapter: status },
  { key: 'experience', label: 'Experience', adapter: experiance }
];
