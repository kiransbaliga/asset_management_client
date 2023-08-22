export const assetColumns = [
  { key: 'employeeId', label: 'Employee Id' },
  { key: 'assetId', label: 'Asset Id' },
  { key: 'createdAt', label: 'Subcategory', adapter: (subcategory) => subcategory.name },
  { key: 'updatedAt', label: 'Status', adapter: status }
];
