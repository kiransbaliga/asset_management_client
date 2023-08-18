import { FC } from 'react';
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
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <>
      <div className={classNames('login-input-field-wrapper', errors?.length ? 'error' : '')}>
        <div className='login-input-field'>
          <input
            onChange={handleChange}
            onBlur={handleChange}
            placeholder=''
            {...{ id, type, value }}
          />
          <label htmlFor={id}>{label}</label>
        </div>
        {errors?.map((error, i) => <p key={i}>{error}</p>)}
      </div>
    </>
  );
};

export default LoginInputField;
