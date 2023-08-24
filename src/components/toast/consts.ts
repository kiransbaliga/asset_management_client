import {
  faCircleCheck,
  faCircleExclamation,
  faInfoCircle,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

export enum TOAST_TIMOUT {
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long',
  WAIT = 'wait'
}

export const timoutToSecondsMap = {
  [TOAST_TIMOUT.SHORT]: 2000,
  [TOAST_TIMOUT.MEDIUM]: 3500,
  [TOAST_TIMOUT.LONG]: 5000
};

export enum TOAST_TYPE {
  ERROR = 'danger',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info'
}

export const typeToIconMap = {
  [TOAST_TYPE.ERROR]: faCircleExclamation,
  [TOAST_TYPE.WARNING]: faTriangleExclamation,
  [TOAST_TYPE.SUCCESS]: faCircleCheck,
  [TOAST_TYPE.INFO]: faInfoCircle
};
