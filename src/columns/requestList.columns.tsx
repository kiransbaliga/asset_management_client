import RequestItemType from '../types/RequestItemType';

export const requestedItemColumns = [
  { key: 'subcategoryName', label: 'Subcategory Name' },
  { key: 'count', label: 'Count' }
];
export const requestList = (obj: RequestItemType[]) => (
  <>
    {obj &&
      obj.forEach((requestItem) => {
        <div>
          <div>{requestItem.count}</div>
          <div>{requestItem.subcategoryId}</div>
          <div>{requestItem.subcategoryName}</div>
        </div>;
      })}
  </>
);
