import EmployeeType from './EmployeeType';

interface HistoryType {
  id: number;
  employee: EmployeeType;
  assetId: number;
  employeeID: number;

  createdAt: string;
  updatedAt: string;
}

export default HistoryType;
