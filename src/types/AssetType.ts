interface AssetType {
  id: number;
  serialNumber: string;
  name: string;
  status: string;
  subcategory: number;
  employeeId?: number;
}

export default AssetType;
