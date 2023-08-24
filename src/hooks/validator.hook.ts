import { useState } from 'react';
import { createListIfNot, createListOrPush } from '../utils/funcs';

const generateInitialErrors = (validatorsObj: object, initialErrors: object | undefined) => {
  const errors = initialErrors ? { ...initialErrors } : {};

  for (let key in validatorsObj) {
    const validators = validatorsObj[key];

    if (Array.isArray(validators)) createListIfNot(errors, key);
    else errors[key] = generateInitialErrors(validators, initialErrors[key]);
  }

  return errors;
};

const validateValues = (validatorsObj: object, values: any, initialErrors: object) => {
  const errors = generateInitialErrors(validatorsObj, initialErrors);

  let isValid = true;

  for (let key in validatorsObj) {
    const validators = validatorsObj[key];
    const value = values[key];

    if (Array.isArray(validators)) {
      validators.map((validator) => {
        const error = validator(value);

        if (error && errors[key]) {
          createListOrPush(errors, key, error);

          isValid = false;
        }
      });
    } else {
      const [newErrors, isNewValid] = validateValues(validators, value, initialErrors[key]);

      isValid = isValid && isNewValid;
      errors[key] = newErrors;
    }
  }

  return [errors, isValid];
};

const useValidator = <RT, VT>(
  validatorsObj: object,
  values: VT,
  initialErrors: object
): [() => boolean, RT] => {
  const [errors, setErrors] = useState<RT>(
    generateInitialErrors(validatorsObj, initialErrors) as RT
  );

  const validate = () => {
    const [errors, isValid] = validateValues(validatorsObj, values, initialErrors);

    setErrors(errors);

    return isValid;
  };

  return [validate, errors];
};

export default useValidator;
