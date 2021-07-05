import React from 'react';
import { Space } from 'antd';
import { SpaceLayoutProps, Item } from './Types';
import { ItemSpaceRender } from './ItemRender';

// 一维数组
export default function SpaceLayout({
  layoutData,
  space = 8,
}: SpaceLayoutProps): React.ReactElement {
  return (
    <div className="afr-space">
      <Space size={space as any} direction="horizontal" wrap>
        {(layoutData as Item[]).map((item, idx) => ItemSpaceRender(item, idx))}
      </Space>
    </div>
  );
}
