import AddressType from './AddressType';

interface EmployeeType {
  id?: string;
  username: string;
  password: string;
  name: string;
  status: string;
  joining_date: string;
  departmentId: number | string;
  role: string;
  experience: string;
  address: AddressType;
}

export default EmployeeType;
