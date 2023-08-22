import { FC, ReactNode, useState } from 'react';
import { classNames } from '../../utils/funcs';
import './style.css';

interface DropdownProps {
  className? : string;
  children: ReactNode;
  toggler: ReactNode;
  style?: object;
}

const Dropdown: FC<DropdownProps> = ({ className, children, toggler, style }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className={classNames('dropdown', className)}>
      <div className='dropdown-toggler' onClick={handleClick}>
        {toggler}
      </div>
      <div className={classNames('card dropdown-content', show ? 'show' : 'hide')} style={style}>
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
