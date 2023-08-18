import { FC } from 'react';
import { classNames } from '../../utils/funcs';
import './Status.css';

interface StatusProps {
  isActive: boolean;
}

const Status: FC<StatusProps> = ({ isActive }) => {
  return (
    <>
      <div className={classNames('chip status', isActive ? 'active' : 'in-active')}>
        {isActive ? 'Active' : 'Inactive'}
      </div>
    </>
  );
};

export default Status;
