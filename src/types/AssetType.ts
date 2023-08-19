interface AssetType {
  id?: number;
  serial_no: string;
  name: string;
  subcategory: number;
  status: string;
  employee?: number;
}

export default AssetType;
