import React, { useState } from 'react';
import { Tabs } from 'antd';
import GridOneColumn from './GridOneColumn';
import DynamicRender from './DynamicRender';
import GridNColumns from './GridNColumns';
import SpaceLayout from './SpaceLayout';
import DynamicAdd from './DynamicAdd';
import './App.less';
import FlexLayout from './FlexLayout';

const { TabPane } = Tabs;

const App = () => {
  const [key, setKey] = useState('1');

  return (
    <div>
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        activeKey={key}
        onChange={setKey}
        style={{ padding: 32 }}
      >
        <TabPane tab="Grid 一列" key="1">
          <GridOneColumn />
        </TabPane>
        <TabPane tab="Grid 1到4列" key="2">
          <GridNColumns />
        </TabPane>
        <TabPane tab="Space 布局" key="3">
          <SpaceLayout />
        </TabPane>
        <TabPane tab="Flex 布局" key="7">
          <FlexLayout />
        </TabPane>
        <TabPane tab="表单联动" key="5">
          <DynamicRender />
        </TabPane>
        {/* <TabPane tab="动态增删" key="6">
          <DynamicAdd />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default App;
