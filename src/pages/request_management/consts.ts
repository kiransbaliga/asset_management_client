import { OptionType } from '../../types/OptionType';
import RequestFilterType from '../../types/RequestFilterType';
import RequestType from '../../types/RequestType';

export const requestTypeOptions: OptionType[] = [
  { text: 'New', value: 'new' },
  { text: 'Exchange', value: 'exchange' }
];

export const emptyRequest: RequestType = {
  assetId: null,
  reason: '',
  employeeId: Number(localStorage.getItem('employeeId')),
  requestItem: []
};
export const emptyAdminRequest: RequestType = {
  assetId: null,
  reason: '',
  employeeId: null,
  requestItem: []
};
export const REQUEST_API_TAGS = {
  GET_LIST: 'get list'
};

export const requestStatusOptions: OptionType[] = [
  { text: 'Pending', value: 'Pending' },
  { text: 'Resolved', value: 'Resolved' },
  { text: 'Rejected', value: 'Rejected' }
];

export const empltyRequestFilter: RequestFilterType = {
  status: ''
};
