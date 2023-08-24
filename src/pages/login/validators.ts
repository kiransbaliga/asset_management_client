import { requiredValidator } from '../../utils/validators.utils';

export const loginValidators = {
  username: [requiredValidator()],
  password: [requiredValidator()]
};
