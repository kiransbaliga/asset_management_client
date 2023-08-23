import { OptionType } from '../../types/OptionType';
import RequestType from '../../types/RequestType';

export const requestTypeOptions: OptionType[] = [
  { text: 'New', value: 'new' },
  { text: 'Exchange', value: 'exchange' }
];

export const emptyRequest: RequestType = {
  assetId: null,
  reason: '',
  employeeId: null,
  requestItem: []
};
export const emptyAdminRequest: RequestType = {
  assetId: null,
  reason: '',
  employeeId: null,
  requestItem: []
};
export const REQUEST_API_TAGS = {
  GET_LIST: 'get list',
  GET_LIST_EMPLOYEE: 'get list associated with employee'
};

export const requestStatusOptions: OptionType[] = [
  { text: 'Pending', value: 'Pending' },
  { text: 'Resolved', value: 'Resolved' },
  { text: 'Rejected', value: 'Rejected' }
];
