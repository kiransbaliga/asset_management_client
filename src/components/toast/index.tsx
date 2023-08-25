import { FC, useState, useEffect } from 'react';
import { TOAST_TIMOUT, timoutToSecondsMap, typeToIconMap } from './consts';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Transition from '../transition';
import Icon from '../icon';
import './style.css';
import { classNames } from '../../utils/funcs';

interface ToastProps {
  type: string;
  title: string;
  message: string;
  timeout?: TOAST_TIMOUT;
  bottom?: number;
  onHide?: () => void;
}

const Toast: FC<ToastProps> = ({
  type,
  title,
  message,
  timeout = TOAST_TIMOUT.MEDIUM,
  onHide = () => {},
  bottom = 0
}) => {
  const [show, setShow] = useState(null);
  const icon = typeToIconMap[type];

  const handleHide = () => {
    setShow(false);
  };

  useEffect(() => {
    setShow(true);
    let duration = timoutToSecondsMap[timeout];

    if (duration) setTimeout(handleHide, duration);
  }, []);

  return (
    <Transition
      show={show === true}
      className='toast'
      style={{ bottom: bottom + 'px' }}
      afterEnd={onHide}
      duration={250}
    >
      <div className={classNames('card', type)}>
        <div className='toast-header'>
          <Icon icon={icon} />
          <div className='toast-title'>{title}</div>
          {timeout === TOAST_TIMOUT.WAIT && (
            <div className='toast-close-btn'>
              <Icon icon={faCircleXmark} size='sm' onClick={handleHide} />
            </div>
          )}
        </div>
        {message && <div className='toast-message'>{message}</div>}
      </div>
    </Transition>
  );
};

export default Toast;
