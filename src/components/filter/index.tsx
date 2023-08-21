import { FC } from 'react';
import './style.css';
import { OptionType } from '../../types/OptionType';

interface FilterProps {
  label: string;
  options: OptionType[];
  value: any;
  onSelect?: (value: any) => void;
}

const Filter: FC<FilterProps> = ({ label, options, onSelect, value }) => {
  const handleChange = (e) => {
    onSelect(e.target.value);
  };

  return (
    <div className='filter'>
      <label>{label}</label>
      <select className='chip' onChange={handleChange} value={value}>
        <option value='' selected>
          select
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
