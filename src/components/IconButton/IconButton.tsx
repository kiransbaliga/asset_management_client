import { FC } from 'react';
import './IconButton.css';

export interface IconButtonProps {
  icon?: string;
  text: string;
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({ icon, text, onClick }) => {
  return (
    <>
      <div className='icon-button' onClick={onClick} data-testid='iconButtonTestId'>
        <div className='circle'>
          <img src={icon} alt={text + ' icon button'} data-testid='iconButtonIconTestId' />
        </div>
        <p data-testid='iconButtonTextTestId'>{text}</p>
      </div>
    </>
  );
};

export default IconButton;
