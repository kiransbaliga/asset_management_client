import { FC, useEffect, useState } from 'react';
import { classNames } from '../../utils/funcs';
import './InputField.css';

interface InputFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'password' | 'date' | 'number';
  value: string | number;
  onChange?: (value: string) => void;
  errors?: string[];
  placeholder?: string;
  disabled?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  errors,
  placeholder,
  disabled
}) => {
  const [_errors, setErrors] = useState<string[]>();

  const handleChange = (e: any) => {
    let value = e.target.value;

    if (type === 'number') value = Number(value);

    setErrors([]);

    onChange(value);
  };

  useEffect(() => {
    setErrors(errors);
  }, [errors]);

  return (
    <>
      <div className={classNames('input-field-wrapper', _errors?.length ? 'error' : '')}>
        <div className='input-field'>
          <label htmlFor={id}>{label}</label>
          <input
            onChange={handleChange}
            placeholder={placeholder}
            {...{ id, type, value }}
            disabled={disabled}
          />
        </div>
        {_errors?.map((error, i) => <p key={i}>{error}</p>)}
      </div>
    </>
  );
};

export default InputField;
