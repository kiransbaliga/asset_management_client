import { useState } from 'react';
import TabBar from '../../../../components/tab/TabBar';
import { iconTabAdapter } from '../../../../components/tab/adapters';
import { ASSET_TABS } from './consts';
import TabView from '../../../../components/tab/TabView';
// import AssetsTabView from './AssetsTabView';

function AssetListTabs() {
  const [currentTab, setCurrentTab] = useState('assets');

  return (
    <div>
      <TabBar
        className='flex-row'
        tabs={ASSET_TABS}
        tab={currentTab}
        onChange={setCurrentTab}
        adapter={iconTabAdapter}
      />
      <div>
        <TabView tab={currentTab} name={'assets'}>
          {/* <AssetsTabView/> */}
        </TabView>
      </div>
    </div>
  );
}

export default AssetListTabs;
