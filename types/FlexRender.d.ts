import React from 'react';
import { FlexRenderProps } from './Types';
/**
 * Flex布局
 *
 * @param {FlexRenderProps} props - The properties for the FlexRender component.
 * @param {Item[]} props.layout - The layout data, an array of items to be rendered in the flex layout.
 * @param {FlexProps} [props.flexProps] - Additional properties to be passed to the inner Flex component.
 * @returns {React.ReactElement} The rendered flex layout.
 */
declare const FlexRender: React.FC<FlexRenderProps>;
export default FlexRender;
