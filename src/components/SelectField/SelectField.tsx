import { FC, useEffect, useState } from 'react';
import { classNames } from '../../utils/funcs';
import './SelectField.css';
import { OptionType } from '../../types/OptionType';

interface SelectFiedProps {
  id: string;
  label: string;
  options: OptionType[];
  value: any;
  onChange?: (value: any) => void;
  errors?: string[];
  placeholder?: string;
}

const SelectFied: FC<SelectFiedProps> = ({
  id,
  label,
  value,
  onChange,
  errors,
  options,
  placeholder
}) => {
  const [_errors, setErrors] = useState<string[]>();

  const handleChange = (e: any) => {

    setErrors([]);

    onChange(e.target.value);
  };

  useEffect(() => {
    setErrors(errors);
  }, [errors]);

  return (
    <>
      <div className={classNames('select-field-wrapper', _errors?.length ? 'error' : '')}>
        <div className='select-field'>
          <label htmlFor={id}>{label}</label>
          <select onChange={handleChange} {...{ id, value }}>
            {placeholder && (
              <option value='' disabled selected>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        {_errors?.map((error, i) => <p key={i}>{error}</p>)}
      </div>
    </>
  );
};

export default SelectFied;
