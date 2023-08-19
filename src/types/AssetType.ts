interface AssetType {
  id?: number;
  serial_no: string;
  name: string;
  status: string;
  subcategoryId: number;
  employeeId?: number;
}

export default AssetType;
