import React from 'react';
import { Space } from 'antd';
import type { SpaceProps } from 'antd';
import { SpaceRenderProps } from './Types';
import ItemRender from './ItemRender';

const SpaceRender: React.FC<SpaceRenderProps> = ({ layout, ...props }) => {
  return (
    <Space {...(props as SpaceProps)}>
      {layout.map((item, idx) => (
        <ItemRender item={item} key={idx} layoutType="flex" />
      ))}
    </Space>
  );
};

export default SpaceRender;
