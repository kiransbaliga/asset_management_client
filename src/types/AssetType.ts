interface AssetType {
  id?: number;
  serial_no: string;
  name: string;
  subcategoryId: number;
  subcategory?: string;
  status: string;
  employeeId?: number;
}

export default AssetType;
