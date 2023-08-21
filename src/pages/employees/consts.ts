import { AddressFieldType } from '../../components/AddressField/types';
import EmployeeType from '../../types/EmployeeType';
import { OptionType } from '../../types/OptionType';

export const statusOptions: OptionType[] = [
  { text: 'Active', value: 'Active' },
  { text: 'Inactive', value: 'Inactive' },
  { text: 'Probation', value: 'Probation' }
];

export const addressFields: AddressFieldType[] = [
  { key: 'address_line_1', placeholder: 'Line 1' },
  { key: 'address_line_2', placeholder: 'Line 2' },
  { key: 'city', placeholder: 'City' },
  { key: 'state', placeholder: 'State' },
  { key: 'country', placeholder: 'Country' },
  { key: 'pincode', placeholder: 'Pincode' }
];

export const emptyEmployee: EmployeeType = {
  id: '',
  name: '',
  username: '',
  password: '',
  status: 'Active',
  joining_date: '',
  departmentId: '',
  role: '',
  experience: '',
  address: {
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  }
};

export const EMPLOYEE_API_TAGS = {
  ON_EMPLOYEE_DELETE: 'onEmployeeDelete'
};
