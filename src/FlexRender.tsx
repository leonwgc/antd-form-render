import React from 'react';
import { Flex } from 'antd';
import type { FlexProps } from 'antd';
import { FlexRenderProps } from './Types';
import ItemRender from './ItemRender';

/**
 * Flex布局
 *
 * @param {FlexRenderProps} props - The properties for the FlexRender component.
 * @param {Item[]} props.layout - The layout data, an array of items to be rendered in the flex layout.
 * @param {FlexProps} [props.flexProps] - Additional properties to be passed to the inner Flex component.
 * @returns {React.ReactElement} The rendered flex layout.
 */
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
