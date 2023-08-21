import RequestItemType from './RequestItemType';

interface RequestType {
  assetId?: number;
  reason: string;
  employeeId: number;
  requestItem: RequestItemType[];
}
export default RequestType;
