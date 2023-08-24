import { FC, useEffect, useState } from 'react';
import './LoginInputField.css';
import { classNames } from '../../utils/funcs';

interface LoginInputFieldProps {
  id: string;
  label: string;
  type: 'text' | 'password';
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
}

const LoginInputField: FC<LoginInputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  errors
}) => {
  const [_errors, setErrors] = useState<string[]>();

  const handleChange = (e: any) => {
    let value = e.target.value;

    setErrors([]);

    onChange(value);
  };

  useEffect(() => {
    setErrors(errors);
  }, [errors]);

  return (
    <>
      <div className={classNames('login-input-field-wrapper', _errors?.length ? 'error' : '')}>
        <div className='login-input-field'>
          <input
            onChange={handleChange}
            onBlur={handleChange}
            placeholder=''
            {...{ id, type, value }}
          />
          <label htmlFor={id}>{label}</label>
        </div>
        {_errors?.map((error, i) => <p key={i}>{error}</p>)}
      </div>
    </>
  );
};

export default LoginInputField;
