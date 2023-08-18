import { FC } from 'react';
import './TitleBar.css';

interface TitleBarProps {
  title: string;
}

const TitleBar: FC<TitleBarProps> = ({ title, children }) => {
  return (
    <>
      <div className='card title-bar'>
        <h2>{title}</h2>
        {children}
      </div>
    </>
  );
};

export default TitleBar;
