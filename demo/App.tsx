import React, { useState } from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';
import OneRowOneCol from './OneRowOneCol';
import OneColWithDynamicControl from './OneColWithDynamicControl';
import OneRowNCol from './OneRowNCol';
import SpaceLayout from './SpaceLayout';
import TwoDimensionArray from './TwoDimensionArray';
import DynamicForm from './DynamicForm';
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
          <OneRowOneCol />
        </TabPane>
        <TabPane tab="一行N列" key="2">
          <OneRowNCol />
        </TabPane>
        <TabPane tab="等间距排列" key="3">
          <SpaceLayout />
        </TabPane>
        <TabPane tab="二维数组自定义布局" key="4">
          <TwoDimensionArray />
        </TabPane>
        <TabPane tab="表单联动" key="5">
          <OneColWithDynamicControl />
        </TabPane>
        <TabPane tab="动态增删" key="6">
          <DynamicForm />
        </TabPane>
      </Tabs>
    </StyledContainer>
  );
};

export default App;
