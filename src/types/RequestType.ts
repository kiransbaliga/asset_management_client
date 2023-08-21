import RequestItemType from './RequestItemType';

interface RequestType {
  id?: number;
  assetId?: number;
  reason: string;
  employeeId: number;
  createdAt?: string;
  deletedAt?: string;
  updatedAt?: string;
  status?: string;
  requestItem?: RequestItemType[];
}
export default RequestType;
