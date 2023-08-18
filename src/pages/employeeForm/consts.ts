import { AddressFieldType } from '../../components/AddressField/types';
import { OptionType } from '../../components/SelectField/SelectField';
import EmployeeType from '../../types/EmployeeType';

export const statusOptions: OptionType[] = [
  { text: 'Active', value: 'active' },
  { text: 'Inactive', value: 'inactive' }
];

export const addressFields: AddressFieldType[] = [
  { key: 'line1', placeholder: 'Line 1' },
  { key: 'line2', placeholder: 'Line 2' },
  { key: 'city', placeholder: 'City' },
  { key: 'state', placeholder: 'State' },
  { key: 'country', placeholder: 'Country' },
  { key: 'pincode', placeholder: 'Pincode' }
];

export const emptyEmployee: EmployeeType = {
  id: '',
  name: '',
  isActive: null,
  joiningDate: '',
  departmentId: '',
  role: '',
  experience: '',
  address: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  }
};
