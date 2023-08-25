import { FC, useEffect, useState } from 'react';
import { classNames } from '../../utils/funcs';
import './SelectField.css';
import { OptionType } from '../../types/OptionType';

interface SelectFieldProps {
  id: string;
  label: string;
  options: OptionType[];
  value: any;
  onChange?: (value: any) => void;
  errors?: string[];
  placeholder?: string;
}

const SelectField: FC<SelectFieldProps> = ({
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

export default SelectField;
// import { FC } from 'react';
// import { classNames } from '../../utils/funcs';
// import './SelectField.css';
// import { OptionType } from '../../types/OptionType';
// import Select from 'react-select';
// interface SelectFieldProps {
//   id: string;
//   label: string;
//   options: OptionType[];
//   value: any;
//   onChange?: (value: any) => void;
//   errors?: string[];
//   placeholder?: string;
// }
// const SelectField: FC<SelectFieldProps> = ({
//   id,
//   label,
//   value,
//   onChange,
//   errors,
//   options,
//   placeholder
// }) => {
//   const handleChange = (e: any) => {
//     onChange(e.target.value);
//   };
//   const optionText = [{}];

//   options.map((option) => {
//     optionText.push({ label: option.text, value: option.value });
//   });
//   console.log(optionText);

//   return (
//     <>
//       <div className={classNames('select-field-wrapper', errors?.length ? 'error' : '')}>
//         <div className='select-field'>
//           <label htmlFor={id}>{label}</label>
//           {/* <select onChange={handleChange} {...{ id, value }}>
//             {placeholder && (
//               <option value='' disabled selected>
//                 {placeholder}
//               </option>
//             )}
//             {options.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.text}
//               </option>
//             ))}
//           </select> */}
//           <Select
//             options={optionText}
//             value={value}
//             isSearchable={true}
//             placeholder={placeholder}
//             onChange={handleChange}
//           />
//         </div>
//         {errors?.map((error, i) => <p key={i}>{error}</p>)}
//       </div>
//     </>
//   );
// };

// export default SelectField;
