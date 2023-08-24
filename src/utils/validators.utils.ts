export const requiredValidator = (message: string = 'Required field', nullValue: any = '') => {
  return (states: any) => {
    if (states === nullValue) return message;
  };
};

// export const includeBackendValidators = (func: (states: any[]) => any) => {
//   return (states: any[]) => {
//     try {
//       const errors = func(states);

//       return errors;
//     } catch {
//       return [];
//     }
//   };
// };
