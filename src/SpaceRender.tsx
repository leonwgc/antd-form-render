import React from 'react';
import { Space } from 'antd';
import type { SpaceProps } from 'antd';
import { SpaceRenderProps } from './Types';
import ItemRender from './ItemRender';

/**
 * Space 布局
 *
 * @param {SpaceRenderProps} props - The properties for the SpaceRender component.
 * @param {Item[]} props.layout - The layout data, an array of items to be rendered in the space.
 * @returns {React.ReactElement} The rendered space layout.
 */
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
