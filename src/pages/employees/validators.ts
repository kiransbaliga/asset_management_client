import { requiredValidator } from '../../utils/validators.utils';

export const employeeValidators = {
  username: [requiredValidator()],
  password: [requiredValidator()],
  name: [requiredValidator()],
  status: [requiredValidator()],
  joining_date: [requiredValidator()],
  departmentId: [requiredValidator()],
  role: [requiredValidator()],
  experience: [requiredValidator()],
  address: {
    address_line_1: [requiredValidator()],
    address_line_2: [requiredValidator()],
    city: [requiredValidator()],
    state: [requiredValidator()],
    country: [requiredValidator()],
    pincode: [requiredValidator()]
  }
};
