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
export enum IsDoneStatus {
  RESOLVED = 'true',
  PENDING = 'false'
}
export const isDoneToClassName = {
  [IsDoneStatus.RESOLVED]: 'success',
  [IsDoneStatus.PENDING]: 'warning'
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

export enum RequestStatusEnum {
  ALLOCATED = 'Resolved',
  UNALLOCATED = 'Pending',
  DAMAGED = 'Rejected'
}

export const requestStatusToClassName = {
  [RequestStatusEnum.ALLOCATED]: 'success',
  [RequestStatusEnum.UNALLOCATED]: 'warning',
  [RequestStatusEnum.DAMAGED]: 'danger'
};
