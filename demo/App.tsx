import React, { useState } from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';
import OneCol from './OneCol';
import OneColWithDynamicControl from './OneColWithDynamicControl';
import MultipleCols from './MultipleCols';
import SpaceLayout from './SpaceLayout';
import './App.less';

const { TabPane } = Tabs;

const StyledContainer = styled.div`
  padding: 20px;
`;

const App = () => {
  const [key, setKey] = useState('1');

  return (
    <StyledContainer>
      <Tabs defaultActiveKey="1" activeKey={key} onChange={setKey}>
        <TabPane tab="一行一列" key="1">
          <OneCol />
        </TabPane>
        <TabPane tab="表单联动" key="2">
          <OneColWithDynamicControl />
        </TabPane>
        <TabPane tab="一行多列" key="3">
          <MultipleCols />
        </TabPane>
        <TabPane tab="等间距排列" key="4">
          <SpaceLayout />
        </TabPane>
      </Tabs>
    </StyledContainer>
  );
};

export default App;
