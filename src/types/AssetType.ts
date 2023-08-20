interface AssetType {
  id?: number;
  serial_no: string;
  name: string;
  status: string;
  subcategoryId: number;
  subcategory?: string;
  employeeId?: number;
}

export default AssetType;
