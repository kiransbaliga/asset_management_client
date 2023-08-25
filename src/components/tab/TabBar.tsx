import { FC, ReactNode, useState, useEffect } from 'react';
import { classNames } from '../../utils/funcs';

export interface TabProps {
  tab: string;
  props: object;
}

interface TabBarProps {
  adapter: (isSelected: boolean, props: object) => ReactNode;
  tabs: TabProps[];
  className?: string;
  tabClassName?: string;
  tab?: string;
  onChange?: (tab: string) => void;
}

const TabBar: FC<TabBarProps> = ({
  className,
  tabClassName,
  tabs,
  adapter = () => null,
  tab,
  onChange = () => {}
}) => {
  const [curTab, setCurTab] = useState<string>();

  function setTab(tab: string) {
    setCurTab(tab);
    onChange(tab);
  }

  useEffect(() => {
    if (curTab !== tab) setCurTab(tab);
  }, [tab]);

  return (
    <div className={classNames('tab-bar', className)}>
      {tabs.map(({ tab, props }, i) => {
        const isSelected = curTab === tab;

        return (
          <div key={i} className={classNames('tab', tabClassName)} onClick={() => setTab(tab)}>
            {adapter(isSelected, props)}
          </div>
        );
      })}
    </div>
  );
};

export default TabBar;
