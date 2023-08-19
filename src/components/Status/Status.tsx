import { FC } from 'react';
import { classNames } from '../../utils/funcs';
import './Status.css';
import { statusToClassName } from './consts';

interface StatusProps {
  value: string;
}

const Status: FC<StatusProps> = ({ value }) => {
  return (
    <>
      <div className={classNames('chip status', statusToClassName[value])}>{value}</div>
    </>
  );
};

export default Status;
