import { FC, ReactNode } from 'react';
import './style.css';

interface TabViewProps {
  tab: string;
  name: string;
  children: ReactNode;
  className?: string;
}

const TabView: FC<TabViewProps> = ({ className, tab, name, children }) => {
  return (
    <div className={className} style={{ display: tab === name ? 'block' : 'none' }}>
      {children}
    </div>
  );
};

export default TabView;
