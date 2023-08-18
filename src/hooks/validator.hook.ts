import { useEffect, useState } from 'react';

const useValidator = (validators: ((value: any) => string[])[], states: any[]) => {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    let allErrors = [];

    validators.forEach((validator) => {
      const curErrors = validator(states);

      if (curErrors) allErrors = [...allErrors, ...curErrors];
    });

    setErrors(allErrors);
  }, states);

  return errors;
};

export default useValidator;
