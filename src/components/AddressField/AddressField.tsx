import { FC, useEffect, useState } from 'react';
import './AddressField.css';
import { AddressFieldType } from './types';
import AddressType from '../../types/AddressType';

interface AddressFieldProps {
  label: string;
  fields: AddressFieldType[];
  values: object;
  onChange?: (address: AddressType) => void;
  errors?: object;
}

const AddressField: FC<AddressFieldProps> = ({ label, fields, values, onChange, errors = {} }) => {
  const [_errors, setErrors] = useState(errors);
  const [address, setAddress] = useState<AddressType>();

  const handleChange = (field: string, value: string) => {
    setAddress((prevAddress) => ({ ...prevAddress, [field]: value }));
    setErrors((prevErrors) => {
      prevErrors[field] = [];

      return prevErrors;
    });
  };

  useEffect(() => {
    if (address) onChange(address);
  }, [address]);

  useEffect(() => {
    setErrors(errors);
  }, [errors]);

  return (
    <div className='address-fields-wrapper'>
      <div className='address-fields'>
        <label>{label}</label>
        {fields.map((field) => (
          <div key={field.key}>
            <input
              className={errors[field.key]?.length ? 'error' : ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              value={values[field.key] || ''}
            />
            {_errors[field.key]?.map((error, i) => <p key={i}>{error}</p>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressField;
