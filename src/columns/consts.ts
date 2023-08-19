export enum EmployeeStatusEnum {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  PROBATION = 'Probation'
}

export const employeeStatusToClassName = {
  [EmployeeStatusEnum.ACTIVE]: 'success',
  [EmployeeStatusEnum.PROBATION]: 'warning',
  [EmployeeStatusEnum.INACTIVE]: 'danger'
};

export enum AssetsStatusEnum {
  ALLOCATED = 'Allocated',
  UNALLOCATED = 'Unallocated',
  DAMAGED = 'Damaged'
}

export const assetStatusToClassName = {
  [AssetsStatusEnum.ALLOCATED]: 'success',
  [AssetsStatusEnum.UNALLOCATED]: 'warning',
  [AssetsStatusEnum.DAMAGED]: 'danger'
};
