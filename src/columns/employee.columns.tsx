import Status from '../components/Status/Status';
import AddressType from '../types/AddressType';

export const status = (value: boolean) => <Status isActive={value} />;

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
  { key: 'joiningDate', label: 'Joining Date' },
  { key: 'role', label: 'Role' },
  { key: 'isActive', label: 'Status', adapter: status },
  { key: 'experience', label: 'Experience', adapter: experiance }
];
