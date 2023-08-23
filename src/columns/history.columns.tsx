const date = (date) => date.split('T')[0];

export const historyColumns = [
  { key: 'employee', label: 'Employee Name', adapter: (employee) => employee.name },
  { key: 'assetId', label: 'Asset Id' },
  { key: 'createdAt', label: 'Start Date', adapter: date },
  { key: 'updatedAt', label: 'End Date', adapter: date }
];
