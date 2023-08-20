import { FC } from 'react';
import { classNames } from '../../utils/funcs';
import './Status.css';

interface StatusProps {
  value: string;
  className?: string;
}

const Status: FC<StatusProps> = ({ value, className }) => {
  return (
    <>
      <div className={classNames('chip status', className)}>{value}</div>
    </>
  );
};

export default Status;
