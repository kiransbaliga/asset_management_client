import { FC } from 'react';
import './IconButton.css';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Icon from '../icon';

export interface IconButtonProps {
  icon?: IconDefinition;
  text: string;
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({ icon, text, onClick }) => {
  return (
    <>
      <div className='icon-button' onClick={onClick} data-testid='iconButtonTestId'>
        <div className='circle'>
          <Icon icon={icon} />
        </div>
        <p data-testid='iconButtonTextTestId'>{text}</p>
      </div>
    </>
  );
};

export default IconButton;
