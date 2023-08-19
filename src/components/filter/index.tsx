import { FC } from 'react';
import './style.css';

interface FilterProps {
  label: string;
  options: string[];
  onSelect?: (value: string) => void;
}

const Filter: FC<FilterProps> = ({ label, options, onSelect }) => {
  const handleChange = () => {
    onSelect('');
  };

  return (
    <div className='filter'>
      <label>{label}</label>
      <select className='chip' onChange={handleChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
