import React from 'react';
import { Space } from 'antd';
import { SpaceLayoutProps, Item } from './Types';
import ItemRender from './ItemRender';

// 一维数组
export default function SpaceLayout({
  layoutData,
  space = 8,
}: SpaceLayoutProps): React.ReactElement {
  return (
    <div className="afr-space">
      <Space size={space as any} direction="horizontal" wrap>
        {(layoutData as Item[]).map((item, idx) => (
          <ItemRender item={item} key={idx} layoutType="space" />
        ))}
      </Space>
    </div>
  );
}
