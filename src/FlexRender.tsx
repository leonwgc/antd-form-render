import React from 'react';
import { Flex } from 'antd';
import type { FlexProps } from 'antd';
import { FlexRenderProps } from './Types';
import ItemRender from './ItemRender';

const FlexRender: React.FC<FlexRenderProps> = ({ layout, ...props }) => {
  return (
    <Flex {...(props as FlexProps)}>
      {layout.map((item, idx) => (
        <ItemRender item={item} key={idx} layoutType="flex" />
      ))}
    </Flex>
  );
};

export default FlexRender;