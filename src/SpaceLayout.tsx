import React from 'react';
import { Space } from 'antd';
import { SpaceLayoutProps, Item } from './Types';
import ItemRender from './ItemRender';

// 一维数组
export default function SpaceLayout({
  layoutData,
  ...props
}: SpaceLayoutProps): React.ReactElement {
  return (
    <Space {...props}>
      {(layoutData as Item[]).map((item, idx) => (
        <ItemRender item={item} key={idx} layoutType="space" />
      ))}
    </Space>
  );
}
