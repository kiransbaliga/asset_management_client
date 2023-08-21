import { OptionType } from '../../types/OptionType';
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
