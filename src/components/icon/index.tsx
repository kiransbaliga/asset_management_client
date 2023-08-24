import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import './style.css';
import { classNames } from '../../utils/funcs';

interface IconProps {
  icon: IconDefinition;
  className?: string;
  innerClassName?: string;
  boxSize?: string;
  disabled?: boolean;
  tootlip?: string;
  size?: SizeProp;
  onClick?: () => void;
}

const Icon: FC<IconProps> = ({
  className,
  icon,
  innerClassName = '',
  size = 'lg',
  disabled,
  onClick,
  ...props
}) => {
  return (
    <div
      className={classNames(
        'icon center',
        disabled ? 'disabled' : '',
        onClick && !disabled ? 'clickable' : '',
        className
      )}
      onClick={() => {
        if (onClick && !disabled) onClick();
      }}
      {...props}
    >
      <div className={innerClassName}>
        <FontAwesomeIcon icon={icon} size={size} fixedWidth />
      </div>
    </div>
  );
};

export default Icon;
