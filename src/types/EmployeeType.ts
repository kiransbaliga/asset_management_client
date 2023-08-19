import AddressType from './AddressType';

interface EmployeeType {
  id?: string;
  name: string;
  status: string;
  joiningDate: string;
  departmentId: string;
  role: string;
  experience: string;
  address: AddressType;
}

export default EmployeeType;
