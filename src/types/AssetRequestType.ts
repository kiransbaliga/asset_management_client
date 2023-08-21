interface AssetRequestType {
  assetId: null | number;
  reason: string;
  employeeId: number;
  items: AssetItemType[];
}

interface AssetItemType {
  subcategory: string;
  count: number;
}
export default AssetRequestType;
