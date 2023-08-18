export const requiredValidator = (
  message: string = 'Required field',
  nullValue: any = '',
  getState = (states: any[]) => states[0]
) => {
  return (states: any) => {
    if (getState(states) === nullValue) return [message];
  };
};

export const includeBackendValidators = (func: (states: any[]) => any) => {
  return (states: any[]) => {
    try {
      const errors = func(states);

      return errors;
    } catch {
      return [];
    }
  };
};
