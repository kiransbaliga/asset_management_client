import Status from '../components/Status/Status';
import RequestItemType from '../types/RequestItemType';
import { requestStatusToClassName } from './consts';

export const status = (value: string) => (
  <Status value={value} className={requestStatusToClassName[value]} />
);

export const requestColumns = [
  { key: 'employee', label: 'Employee', adapter: (value: any) => value.name },
  { key: 'reason', label: 'Reason' },
  { key: 'status', label: 'Status', adapter: status }
];

export const requestList = (obj: RequestItemType[]) => {
  return (
    <>
      {obj && obj.length === 0 && (
        <div className='flex-row center'>Asset of same category for exchange</div>
      )}

      {obj && obj.length !== 0 && (
        <>
          <div className='flex-row center'>
            <div className='column'>SubcategoryId</div>
            <div className='column'>Count</div>
          </div>
          {obj.map((requestItem) => {
            console.log(requestItem);

            return (
              <div key={requestItem.subcategoryId} className='flex-row center'>
                <div className='column '>{requestItem.subcategoryId}</div>
                <div className='column '>{requestItem.count}</div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export const requestDetailColumns = [
  { key: 'id', label: 'Request ID' },
  { key: 'reason', label: 'Reason' },
  { key: 'employeeId', label: 'Requested employee ID' },
  { key: 'assetId', label: 'ID of asset(exchange)' },
  { key: 'status', label: 'Status', adapter: status },
  { key: 'requestItem', label: 'Requested Items', adapter: requestList }
];
