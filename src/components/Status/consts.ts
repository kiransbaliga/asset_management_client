export enum StatusEnum {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  PROBATION = 'Probation'
}

export const statusToClassName = {
  [StatusEnum.ACTIVE]: 'success',
  [StatusEnum.INACTIVE]: 'danger',
  [StatusEnum.PROBATION]: 'warning'
};
