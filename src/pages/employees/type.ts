export interface addressErrorsType {
  address_line_1: string[];
  address_line_2: string[];
  city: string[];
  state: string[];
  country: string[];
  pincode: string[];
}

export interface employeeErrorsType {
  username: string[];
  password: string[];
  name: string[];
  status: string[];
  joining_date: string[];
  departmentId: string[];
  role: string[];
  experience: string[];
  address: addressErrorsType;
}
